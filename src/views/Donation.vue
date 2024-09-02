<template>
  <div>
    <navbar />
  
    <DonationModal :showModal="isModalVisible" :closeModal="closeModal" :showRegisterModal="showRegisterModal"/>
    <RegisterModal :showRegModal="isRegisterModalVisible" :closeRegModal="closeRegisterModal" />

    <main>
      <section class="relative w-full h-full py-40 min-h-screen">
        <div class="container mx-auto px-4 h-full">
          <div class="flex flex-col lg:flex-row content-center items-center justify-center h-full">
            <div class="w-full lg:w-6/12 px-4">
              <div
                class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-secondaryMain border-mainText border-2">
                <div class="rounded-t mb-0 px-6 py-6">
                  <div class="text-center mb-3">
                    <h6 class="text-mainText text-3xl font-bold">
                      Give Hope, Save Paws
                    </h6>
                  </div>
                  <hr class="mt-6 border-b-1 border-blueGray-300" />
                </div>

                <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <form @submit.prevent="submitDonation()">
                    <div class="relative w-full mb-3">
                      <label class="block uppercase text-mainText text-xs font-bold mb-2">
                        Name
                      </label>
                      <input type="name"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        :class="{ 'bg-gray-100': isUser !== null }" placeholder="Name" v-model="donation.username"
                        :disabled="isUser" />
                    </div>

                    <div class="relative w-full mb-3" v-show="isUser">
                      <label class="block uppercase text-mainText text-xs font-bold mb-2">
                        Phone Number
                      </label>
                      <input type="phonenumber"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        :class="{ 'bg-gray-100': isUser !== null }" placeholder="Phone Number"
                        v-model="donation.phoneNo" :disabled="isUser" />
                    </div>

                    <div class="relative w-full mb-3" v-show="isUser">
                      <label class="block uppercase text-mainText text-xs font-bold mb-2">
                        Email
                      </label>
                      <input type="email"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        :class="{ 'bg-gray-100': isUser !== null }" placeholder="Email" v-model="donation.email"
                        :disabled="isUser" />
                    </div>

                    <div class="relative w-full mb-3">
                      <label class="block uppercase text-mainText text-xs font-bold mb-2">
                        Donation Amount (MYR)
                      </label>
                      <input type="message"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Donation Amount (MYR)" v-model="donation.amount" required />
                    </div>

                    <div class="mb-3 mt-6">
                      <label class="inline-flex items-center cursor-pointer">
                        <input id="customCheckLogin" type="checkbox"
                          class="form-checkbox border-0 rounded text-mainText ml-1 w-5 h-5 ease-linear transition-all duration-150"
                          v-model="donation.annoymously" :disabled="!isUser" />
                        <span class="ml-2 text-sm font-semibold text-mainText">
                          Make donation anonymously (option)
                        </span>
                      </label>
                    </div>

                    <div class="text-center mt-6">
                      <button
                        class="bg-mainText text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="submit">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <img :src="donationPic" alt="donation picture" class="w-full lg:w-6/12 px-4 pr-4" />
          </div>
        </div>
        <footer-small absolute />
      </section>
    </main>
  </div>
</template>

<script>
import donationPic from "@/assets/img/donation.png";

import Navbar from "@/components/Navbars/AuthNavbar.vue";
import FooterSmall from "@/components/Footers/FooterSmall.vue";

import DonationModal from "@/components/Modal/DonationModal.vue";
import RegisterModal from "@/views/auth/RegisterModal.vue";

import { ref } from "vue";
// get user cookie
import VueCookies from 'vue-cookies';

// api
import { getUserInfo } from "@/service/apiProviderAuth.js";
import { createDonation } from "@/service/apiProviderDonation.js";

export default {
  components: {
    Navbar,
    FooterSmall,
    DonationModal,
    RegisterModal,
  },

  data() {
    return {
      isModalVisible: ref(false),
      isRegisterModalVisible: ref(false),
      
      isUser: VueCookies.isKey('email'),

      donation: {
        username: '',
        annoymously: false,
        phoneNo: '',
        email: '',
        amount: '',
      },

      donationPic,
    };
  },

  mounted() {
    this.donation.annoymously = !this.isUser;
    this.getUserInfoApi()

    if(!this.isUser) {
      this.showModal()
    }
  },

  methods: {
    showModal() {
        this.isModalVisible = true;
    },
    closeModal() {
        this.isModalVisible = false;
    },
    showRegisterModal() {
      this.isModalVisible = false;
      this.isRegisterModalVisible = true;
    },
    closeRegisterModal() {
      this.isRegisterModalVisible = false;
    },
    
    async getUserInfoApi() {
      if (this.isUser) {
        const result = await getUserInfo(VueCookies.get('email'));

        this.donation.username = result.firstName + " " + result.lastName;
        this.donation.phoneNo = result.phoneNumber;
        this.donation.email = result.email;
      } else {
        this.donation.username = "Anonymously";
        this.donation.phoneNo = "";
        this.donation.email = "";
      }
    },

    async submitDonation() {
      const result = await createDonation(this.donation.amount, this.donation.annoymously, this.isUser)

      if (result != null) {
        localStorage.setItem('donationAmount', result.amount);
        localStorage.setItem('transactionId', result.id);

        this.$router.push("/payment");
      }
    }
  }
};
</script>
