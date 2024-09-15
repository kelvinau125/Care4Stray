<template>
  <div>
    <navbar />
    <main>
      <section class="relative w-full h-full py-40 min-h-screen">
        <div class="container mx-auto px-4 h-full">
          <div class="flex flex-col lg:flex-row content-center items-center justify-center h-full">
            <img :src="contactus" alt="contact picture" class="w-full lg:w-6/12 px-4 pr-4 mb-8" />
            <div class="w-full lg:w-6/12 px-4">
              <div
                class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-secondaryMain border-mainText border-2">
                <div class="rounded-t mb-0 px-6 py-6">
                  <div class="text-center mb-3">
                    <h6 class="text-mainText text-3xl font-bold">
                      Contact Us
                    </h6>
                  </div>
                  <hr class="mt-6 border-b-1 border-blueGray-300" />
                </div>
                <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <form>
                    <div class="relative w-full mb-3">
                      <label class="block uppercase text-mainText text-xs font-bold mb-2" htmlFor="grid-password">
                        Name
                      </label>
                      <input type="name"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Name" v-model="contactName" disabled />
                    </div>

                    <div class="relative w-full mb-3">
                      <label class="block uppercase text-mainText text-xs font-bold mb-2" htmlFor="grid-password">
                        Phone Number
                      </label>
                      <input type="phonenumber"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Phone Number" v-model="phoneNo" disabled />
                    </div>

                    <div class="relative w-full mb-3">
                      <label class="block uppercase text-mainText text-xs font-bold mb-2" htmlFor="grid-password">
                        Email
                      </label>
                      <input type="email"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Email" v-model="email" disabled />
                    </div>

                    <div class="relative w-full mb-3">
                      <label class="block uppercase text-mainText text-xs font-bold mb-2" for="grid-password">
                        Message
                      </label>
                      <textarea
                        class="border-0 px-3 pt-3 pb-16 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 whitespace-normal"
                        placeholder="Message" v-model="message" disabled></textarea>
                    </div>

                    <!-- <div class="text-center mt-6">
                      <button
                        class="bg-mainText text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button">
                        Submit
                      </button>
                    </div> -->
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer-small absolute />
      </section>
    </main>
  </div>
</template>

<script>
import contactus from "@/assets/img/contact_us.png";

import Navbar from "@/components/Navbars/AuthNavbar.vue";
import FooterSmall from "@/components/Footers/FooterSmall.vue";

export default {
  components: {
    Navbar,
    FooterSmall,
  },

  data() {
    return {
      contactus,

      contactName: "Care4Stray",
      phoneNo: "+6010 293 8551",
      email: "Care4Stray@gmail.com",
      message: "Please feel free to reach out to us via email or contact us by phone. We welcome any inquiries and will be happy to assist you."
    };
  },
};
</script>
