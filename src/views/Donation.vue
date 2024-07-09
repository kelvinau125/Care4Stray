<template>
  <div>
    <navbar />
    <main>
      <section class="relative w-full h-full py-40 min-h-screen">
        <div class="container mx-auto px-4 h-full">
          <div class="flex content-center items-center justify-center h-full">
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-amber-100 border-emerald-700 border-2">
                <div class="rounded-t mb-0 px-6 py-6">
                  <div class="text-center mb-3">
                    <h6 class="text-emerald-700 text-3xl font-bold">
                      Give Hope, Save Paws
                    </h6>
                  </div>
                  <hr class="mt-6 border-b-1 border-blueGray-300" />
                </div>

                <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <form>
                    <div class="relative w-full mb-3">
                      <label class="block uppercase text-emerald-700 text-xs font-bold mb-2" htmlFor="grid-password">
                        Name
                      </label>
                      <input type="name"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Name" />
                    </div>

                    <div class="mb-3">
                      <label class="inline-flex items-center cursor-pointer">
                        <input
                          id="customCheckLogin"
                          type="checkbox"
                          class="form-checkbox border-0 rounded text-emerald-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                        />
                        <span class="ml-2 text-sm font-semibold text-emerald-700">
                          Make donation anonymously (option) 
                        </span>
                      </label>
                    </div>

                    <div class="relative w-full mb-3">
                      <label class="block uppercase text-emerald-700 text-xs font-bold mb-2" htmlFor="grid-password">
                        Phone Number
                      </label>
                      <input type="phonenumber"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Phone Number" />
                    </div>

                    <div class="relative w-full mb-3">
                      <label class="block uppercase text-emerald-700 text-xs font-bold mb-2" htmlFor="grid-password">
                        Email
                      </label>
                      <input type="email"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Email" />
                    </div>

                    <div class="relative w-full mb-3">
                      <label class="block uppercase text-emerald-700 text-xs font-bold mb-2" htmlFor="grid-password">
                        Donation Amount (MYR)
                      </label>
                      <input type="message"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Donation Amount (MYR)" />
                    </div>

                    <div class="text-center mt-6">
                      <button
                        class="bg-emerald-700 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <img :src="donation" alt="donation picture" class="w-full lg:w-6/12 px-4 pr-4"/>
          </div>
        </div>
        <footer-small absolute />
      </section>
    </main>
  </div>
</template>

<script>
import donation from "@/assets/img/donation.png";

import Navbar from "@/components/Navbars/AuthNavbar.vue";
import FooterSmall from "@/components/Footers/FooterSmall.vue";

export default {
  components: {
    Navbar,
    FooterSmall,
  },

  data() {
    return {
      donation,
    };
  },
};
</script>
