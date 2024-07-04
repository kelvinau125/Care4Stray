<template>
  <footer class="relative bg-blueGray-200 pt-8 pb-6">
    <div
      class="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
      style="transform: translateZ(0);"
    >
      <svg
        class="absolute bottom-0 overflow-hidden"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        version="1.1"
        viewBox="0 0 2560 100"
        x="0"
        y="0"
      >
        <polygon
          class="text-blueGray-200 fill-current"
          points="2560 0 2560 100 0 100"
        ></polygon>
      </svg>
    </div>
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap text-center lg:text-left">
        <div class="w-full lg:w-6/12 px-4">
          <h4 class="text-3xl font-semibold">Let's keep in touch!</h4>
          <h5 class="text-lg mt-0 mb-2 text-blueGray-600">
            Feel free to find us
          </h5>
          <div class="mt-6 lg:mb-0 mb-6 flex flex-col">
            <div class="flex flex-row items-center">
              <button
                class="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-4"
                type="button"
              >
              <img :src="location" alt="location" class="p-2">
              </button>
              Lot18343, Jalan Sungai Lalang, 43500 Semenyih, Selangor.
            </div>

            <div class="flex flex-row items-center mt-3">
              <button
                class="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-4"
                type="button"
              >
              <img :src="whatsapp" alt="whatsapp" class="p-2">
              </button>
              +6010 293 8551
            </div>

            <div class="flex flex-row items-center mt-3">
              <button
                class="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-4"
                type="button"
              >
              <img :src="email" alt="email" class="p-2">
              </button>
              babe@yourheart.com
            </div>
          </div>
        </div>
        <div class="w-full lg:w-6/12 px-4">
          <div class="flex flex-wrap items-top mb-6">
            <div class="w-full lg:w-6/12 px-4 ml-auto">
              <span
                class="block uppercase text-blueGray-500 text-sm font-semibold mb-2"
              >
                Monday — Saturday
              </span>
              <span
                class="block uppercase text-blueGray-500 text-sm font-semibold mb-6"
              >
                9.00 a.m. - 6.00 p.m.
              </span>

              <span
                class="block uppercase text-blueGray-500 text-sm font-semibold mb-6"
              >
                Weekday visitation strictly by pre-booked appointment times only.
              </span>
              <span
                class="block uppercase text-blueGray-500 text-sm font-semibold mb-2"
              >
                Public visitation only on Saturday 11am-3pm.
              </span>

            </div>
          </div>
        </div>
      </div>
      <hr class="my-6 border-blueGray-300" />
      <div
        class="flex flex-wrap items-center md:justify-between justify-center"
      >
        <div class="w-full md:w-4/12 px-4 mx-auto text-center">
          <div class="text-sm text-blueGray-500 font-semibold py-1">
            Copyright © {{ date }} Care4Strays
            .
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
import location from "@/assets/img/location.png";
import whatsapp from "@/assets/img/whatsapp.png";
import email from "@/assets/img/email.png";
import vector from "@/assets/img/Vector.png";

export default {
  data() {
    return {
      location,
      whatsapp,
      email,
      vector,
      date: new Date().getFullYear(),
    };
  },
};
</script>
