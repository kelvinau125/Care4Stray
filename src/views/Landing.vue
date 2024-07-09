<template>
  <div>
    <navbar />
    <RegisterModal
      :showRegModal="isRegisterModalVisible"
      :closeRegModal="closeRegisterModal"
    />
    <main>
      <div
        class="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75"
      >
        <div
          class="absolute top-0 w-full h-full bg-center bg-cover"
          :style="{ backgroundImage: `url(${headerBackground})` }"
        >
          <!-- <span
            id="blackOverlay"
            class="w-full h-full absolute opacity-75 bg-black"
          ></span> -->
        </div>
        <div class="container relative mx-auto mt-16">
          <div class="items-center flex flex-wrap">
            <div class="w-full px-4 ml-auto mr-auto text-left">
              <div class="">
                <h1 class="text-amber-100 font-bold text-5xl" style="text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.5);">
                  Stay For Strays
                </h1>
                <p class="mt-4 lg:w-6/12 text-2xl text-amber-100" style="text-shadow: 4px 4px 5.7px rgba(0, 0, 0, 0.5);">
                  Join us in making a difference, one paw at a time
                </p>
                <div class="sm:block flex flex-col mt-16">
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/vue/overview/notus?ref=vn-index"
                    target="_blank"
                    class="get-started text-emerald-700 font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-2 bg-amber-100 active:bg-amber-100 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                  >
                    Volunteer
                  </a>

                  <a
                    href="https://github.com/creativetimofficial/vue-notus?ref=vn-index"
                    target="_blank"
                    class="text-amber-100 sm:ml-1 background-transparent font-bold uppercase px-8 py-3 outline-none focus:outline-none mr-1 mb-1 text-sm ease-linear transition-all duration-150"
                  >
                    Contact Us
                  </a>
                </div>

                <p class="mt-6 sm:mt-10 font-bold text-2xl text-amber-100 text-right" style="text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.5);">
                  - Where Every Paw Finds a Home!
                </p>

              </div>
            </div>
          </div>
        </div>
        <div
          class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
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
      </div>

      <!-- <section class="pb-20 bg-blueGray-200 -mt-24">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap">
            <div class="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
              <div
                class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg"
              >
                <div class="px-4 py-5 flex-auto">
                  <div
                    class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400"
                  >
                    <i class="fas fa-award"></i>
                  </div>
                  <h6 class="text-xl font-semibold">Awarded Agency</h6>
                  <p class="mt-2 mb-4 text-blueGray-500">
                    Divide details about your product or agency work into parts.
                    A paragraph describing a feature will be enough.
                  </p>
                </div>
              </div>
            </div>

            <div class="w-full md:w-4/12 px-4 text-center">
              <div
                class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg"
              >
                <div class="px-4 py-5 flex-auto">
                  <div
                    class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400"
                  >
                    <i class="fas fa-retweet"></i>
                  </div>
                  <h6 class="text-xl font-semibold">Free Revisions</h6>
                  <p class="mt-2 mb-4 text-blueGray-500">
                    Keep you user engaged by providing meaningful information.
                    Remember that by this time, the user is curious.
                  </p>
                </div>
              </div>
            </div>

            <div class="pt-6 w-full md:w-4/12 px-4 text-center">
              <div
                class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg"
              >
                <div class="px-4 py-5 flex-auto">
                  <div
                    class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400"
                  >
                    <i class="fas fa-fingerprint"></i>
                  </div>
                  <h6 class="text-xl font-semibold">Verified Company</h6>
                  <p class="mt-2 mb-4 text-blueGray-500">
                    Write a few lines about each one. A paragraph describing a
                    feature will be enough. Keep you user engaged!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap items-center mt-32">
            <div class="w-full md:w-5/12 px-4 mr-auto ml-auto">
              <div
                class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white"
              >
                <i class="fas fa-user-friends text-xl"></i>
              </div>
              <h3 class="text-3xl mb-2 font-semibold leading-normal">
                Working with us is a pleasure
              </h3>
              <p
                class="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600"
              >
                Don't let your uses guess by attaching tooltips and popoves to
                any element. Just make sure you enable them first via
                JavaScript.
              </p>
              <p
                class="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600"
              >
                The kit comes with three pre-built pages to help you get started
                faster. You can change the text and images and you're good to
                go. Just make sure you enable them first via JavaScript.
              </p>
              <router-link to="/" class="font-bold text-blueGray-700 mt-8">
                Check Vue Notus!
              </router-link>
            </div>

            <div class="w-full md:w-4/12 px-4 mr-auto ml-auto">
              <div
                class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-emerald-500"
              >
                <img
                  alt="..."
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
                  class="w-full align-middle rounded-t-lg"
                />
                <blockquote class="relative p-8 mb-4">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    class="absolute left-0 w-full block h-95-px -top-94-px"
                  >
                    <polygon
                      points="-30,95 583,95 583,65"
                      class="text-emerald-500 fill-current"
                    ></polygon>
                  </svg>
                  <h4 class="text-xl font-bold text-white">
                    Top Notch Services
                  </h4>
                  <p class="text-md font-light mt-2 text-white">
                    The Arctic Ocean freezes every winter and much of the
                    sea-ice then thaws every summer, and that process will
                    continue whatever happens.
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section> -->

      <section class="relative py-20">
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
              class="text-white fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>

        <div class="container mx-auto px-4">
          <div class="flex flex-wrap md:flex-nowrap items-start">
            <!-- Left Side Column -->
            <div class="w-full md:w-6/12 flex flex-col space-y-4">
              <!-- First Div -->
              <div class="px-4 bg-amber-100 border-emerald-300 border-2 rounded-2xl mb-5">
                <div class="flex-auto px-4 lg:px-10 py-10 pt-10">
                  <form>
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                      />
                    </div>

                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-blueGray-600 text-sm font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Password"
                      />
                    </div>

                    <div class="text-center mt-6">
                      <button
                        class="bg-emerald-400 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                      >
                        Sign In
                      </button>
                    </div>
                  </form>

                  <div class="text-center text-lg mt-6">
                    <p>Don’t have an account? 
                      <span>                  
                        <button @click="this.showRegisterModal"
                        class='ml-1 background-transparent font-bold outline-none focus:outline-none ease-linear transition-all duration-150 underline'
                        >
                          Sign Up
                        </button>
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <!-- Second Div -->
              <div class="px-4 border-2 border-emerald-300 rounded-2xl mt-4 pb-4 flex-auto flex flex-col justify-between">
                <div>
                  <div class="text-center text-2xl font-bold text-emerald-700 mt-4 mb-6">
                    <div class="flex ml-2">
                      <img :src="takeMeHome" alt="take me home" class="w-8 h-8 mr-2">
                      Take Me Home
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div v-for="(pet, index) in pets" :key="index" class="border p-4 rounded-lg shadow-lg flex flex-col bg-amber-100">
                      <img :src="pet.image" alt="Pet Image" class="w-full h-auto mb-4 rounded-lg">
                      <div class="flex flex-row items-end">
                        <h2 class="text-xl font-bold mb-2 mr-2">{{ pet.name }}</h2>
                        <p class="text-gray-600 mb-2">{{ pet.age }}</p>
                      </div>
                      <ul class="text-left list-disc list-inside mb-4">
                        <li v-for="(trait, tIndex) in pet.traits" :key="tIndex">{{ trait }}</li>
                      </ul>
                      <div class="flex space-x-2">
                        <span class="material-icons"><img :src="vaccine" alt="vaccine" class="w-8 h-8 p-1"></span>
                        <span class="material-icons"><img :src="worm" alt="warm" class="w-8 h-8 p-1"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="text-right mt-4 mr-3 text-emerald-700">
                  <span>                  
                    <a
                      href="https://github.com/creativetimofficial/vue-notus?ref=vn-index"
                      target="_blank"
                      class="ml-1 background-transparent font-bold outline-none focus:outline-none ease-linear transition-all duration-150"
                    >
                      Show More...
                    </a>
                  </span>
                </div>
              </div>
            </div>

            <!-- Right Side -->
            <div class="w-full md:w-8/12 px-4 border-2 border-emerald-300 rounded-2xl pb-5 ml-10 flex-grow">
              <div class="text-emerald-700 font-bold text-3xl mt-4 mb-4 flex items-center ml-1">
                <img :src="animalNews" alt="animal news" class="w-10 h-10 mr-2">
                <p>Animal News</p>
              </div>
              <div>
                <div v-for="(item, index) in paginatedItems" :key="index" class="mb-4">
                  <div class="border-2 border-emerald-300 p-4 rounded-lg shadow-lg flex">
                    <div class="w-full mr-5 flex items-center justify-center">
                      <img :src="item.image" alt="picture" class="w-4/5 h-auto rounded-md">  
                    </div>
                    <div class="flex flex-col justify-between">
                      <div>
                        <h2 class="text-xl font-bold mb-2">{{ item.title }}</h2>
                        <p>{{ item.description }}</p>
                      </div>
                      <div class="flex justify-between">
                        <p class="text-sm text-gray-600">{{ item.author }}</p>
                        <p class="text-sm text-gray-600">{{ item.date }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="flex justify-center space-x-2 mt-6">
                  <button
                    v-for="page in totalPages"
                    :key="page"
                    @click="currentPage = page"
                    :class="{
                      'px-3 py-1 border-2 border-emerald-300 rounded-full': true,
                      'bg-emerald-300 text-white': currentPage === page,
                      'bg-white text-emerald-300': currentPage !== page
                    }"
                  >
                    {{ page }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- <section class="pt-20 pb-48">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap justify-center text-center mb-24">
            <div class="w-full lg:w-6/12 px-4">
              <h2 class="text-4xl font-semibold">Here are our heroes</h2>
              <p class="text-lg leading-relaxed m-4 text-blueGray-500">
                According to the National Oceanic and Atmospheric
                Administration, Ted, Scambos, NSIDClead scentist, puts the
                potentially record maximum.
              </p>
            </div>
          </div>
          <div class="flex flex-wrap">
            <div class="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div class="px-6">
                <img
                  alt="..."
                  :src="team1"
                  class="shadow-lg rounded-full mx-auto max-w-120-px"
                />
                <div class="pt-6 text-center">
                  <h5 class="text-xl font-bold">Ryan Tompson</h5>
                  <p
                    class="mt-1 text-sm text-blueGray-400 uppercase font-semibold"
                  >
                    Web Developer
                  </p>
                  <div class="mt-6">
                    <button
                      class="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i class="fab fa-twitter"></i>
                    </button>
                    <button
                      class="bg-lightBlue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i class="fab fa-facebook-f"></i>
                    </button>
                    <button
                      class="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i class="fab fa-dribbble"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div class="px-6">
                <img
                  alt="..."
                  :src="team2"
                  class="shadow-lg rounded-full mx-auto max-w-120-px"
                />
                <div class="pt-6 text-center">
                  <h5 class="text-xl font-bold">Romina Hadid</h5>
                  <p
                    class="mt-1 text-sm text-blueGray-400 uppercase font-semibold"
                  >
                    Marketing Specialist
                  </p>
                  <div class="mt-6">
                    <button
                      class="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i class="fab fa-google"></i>
                    </button>
                    <button
                      class="bg-lightBlue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i class="fab fa-facebook-f"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div class="px-6">
                <img
                  alt="..."
                  :src="team3"
                  class="shadow-lg rounded-full mx-auto max-w-120-px"
                />
                <div class="pt-6 text-center">
                  <h5 class="text-xl font-bold">Alexa Smith</h5>
                  <p
                    class="mt-1 text-sm text-blueGray-400 uppercase font-semibold"
                  >
                    UI/UX Designer
                  </p>
                  <div class="mt-6">
                    <button
                      class="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i class="fab fa-google"></i>
                    </button>
                    <button
                      class="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i class="fab fa-twitter"></i>
                    </button>
                    <button
                      class="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i class="fab fa-instagram"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div class="px-6">
                <img
                  alt="..."
                  :src="team4"
                  class="shadow-lg rounded-full mx-auto max-w-120-px"
                />
                <div class="pt-6 text-center">
                  <h5 class="text-xl font-bold">Jenna Kardi</h5>
                  <p
                    class="mt-1 text-sm text-blueGray-400 uppercase font-semibold"
                  >
                    Founder and CEO
                  </p>
                  <div class="mt-6">
                    <button
                      class="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i class="fab fa-dribbble"></i>
                    </button>
                    <button
                      class="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i class="fab fa-google"></i>
                    </button>
                    <button
                      class="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i class="fab fa-twitter"></i>
                    </button>
                    <button
                      class="bg-blueGray-700 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                    >
                      <i class="fab fa-instagram"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> -->

      <section class="pb-4 relative block bg-emerald-300">
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
              class="text-emerald-300 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>

        <div class="container mx-auto px-4 lg:pt-24 lg:pb-32">
          <div class="flex">
            <div class="w-full">
              <div class="flex mb-5">
                <img :src="logo" alt="logo" class="w-28 h-auto mr-10">
                <div>
                  <h2 class="text-4xl font-semibold text-amber-100">
                    Spare a Paw, Share Some Love:
                  </h2>
                  <span class="inline-block text-4xl font-semibold text-amber-100 mt-2">Donate to Care4Strays!</span>
                </div>
              </div>
              <p class="text-3xl leading-relaxed mt-10 mb-4 text-amber-100 lg:w-9/12">
                Together, we're making a meaningful difference in their lives. Thank you for believing in Care4Strays 
              </p>
            </div>
          </div>

          <div class="mt-10">
            <a
              href="https://www.creative-tim.com/learning-lab/tailwind/vue/overview/notus?ref=vn-index"
              target="_blank"
              class="get-started text-emerald-700 font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-2 bg-amber-100 active:bg-amber-100 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
            >
              Donate for Strays 
            </a>
          </div>

      
        </div>
      </section>
    </main>
    <footer-component />
  </div>
</template>
<script>
import Navbar from "@/components/Navbars/AuthNavbar.vue";
import FooterComponent from "@/components/Footers/Footer.vue";

import team1 from "@/assets/img/team-1-800x800.jpg";
import team2 from "@/assets/img/team-2-800x800.jpg";
import team3 from "@/assets/img/team-3-800x800.jpg";
import team4 from "@/assets/img/team-4-470x470.png";

import takeMeHome from "@/assets/img/takeMeHome.png";
import animalNews from "@/assets/img/animalNews.png";
import headerBackground from "@/assets/img/header-background.png";
import vaccine from "@/assets/img/tabler_vaccine.png";
import worm from "@/assets/img/contrast_worm.png";
import logo from "@/assets/img/logo.png";

import RegisterModal from "@/views/auth/RegisterModal.vue";

import { ref } from "vue";

export default {
  data() {
    return {
      team1,
      team2,
      team3,
      team4,
      takeMeHome,
      animalNews,
      headerBackground,
      vaccine,
      worm,
      logo,
      isRegisterModalVisible: ref(false),

      items: [
        {
          image: require('@/assets/img/team-1-800x800.jpg').default, // replace with actual path
          title: "Rescued dog 'trapped for several days' down well",
          description: "A dog rescued from a well had been trapped for several days and was 'giving up' in front of his rescuers' eyes, it has emerged.",
          author: "Federica Bedendo",
          date: "2 days ago",
        },
        {
          image: require('@/assets/img/team-2-800x800.jpg').default, // replace with actual path
          title: "Rescued dog 'trapped for several days' down well",
          description: "A dog rescued from a well had been trapped for several days and was 'giving up' in front of his rescuers' eyes, it has emerged.",
          author: "Federica Bedendo",
          date: "2 days ago",
        },
        {
          image: require('@/assets/img/team-4-470x470.png').default, // replace with actual path
          title: "Rescued dog 'trapped for several days' down well",
          description: "A dog rescued from a well had been trapped for several days and was 'giving up' in front of his rescuers' eyes, it has emerged.",
          author: "Federica Bedendo",
          date: "2 days ago",
        },
        {
          image: require('@/assets/img/sketch.jpg').default, // replace with actual path
          title: "Rescued dog 'trapped for several days' down well",
          description: "A dog rescued from a well had been trapped for several days and was 'giving up' in front of his rescuers' eyes, it has emerged.",
          author: "Federica Bedendo",
          date: "2 days ago",
        },
        {
          image: require('@/assets/img/sketch.jpg').default, // replace with actual path
          title: "Rescued dog 'trapped for several days' down well",
          description: "A dog rescued from a well had been trapped for several days and was 'giving up' in front of his rescuers' eyes, it has emerged.",
          author: "Federica Bedendo",
          date: "2 days ago",
        },
        {
          image: require('@/assets/img/sketch.jpg').default, // replace with actual path
          title: "Rescued dog 'trapped for several days' down well",
          description: "A dog rescued from a well had been trapped for several days and was 'giving up' in front of his rescuers' eyes, it has emerged.",
          author: "Federica Bedendo",
          date: "2 days ago",
        },
        // Repeat this object to fill the list
      ],
      currentPage: 1,
      itemsPerPage: 5, // Adjust this number based on how many items you want per page

      pets: [
        {
          image: require('@/assets/img/sketch.jpg').default, // replace with actual path
          name: "Mimi",
          age: "3 years",
          traits: ["Litter trained", "Food critic approved with a love of play", "Affectionate feline"],
        },
        {
          image: require('@/assets/img/sketch.jpg').default, // replace with actual path
          name: "Mimi",
          age: "3 years",
          traits: ["Litter trained", "Food critic approved with a love of play", "Affectionate feline"],
        },
        {
          image: require('@/assets/img/sketch.jpg').default, // replace with actual path
          name: "Mimi",
          age: "3 years",
          traits: ["Litter trained", "Food critic approved with a love of play", "Affectionate feline"],
        },
        {
          image: require('@/assets/img/sketch.jpg').default, // replace with actual path
          name: "Mimi",
          age: "3 years",
          traits: ["Litter trained", "Food critic approved with a love of play", "Affectionate feline"],
        },
        // Repeat this object to fill the list
      ],
    };
  },
  components: {
    Navbar,
    FooterComponent,
    RegisterModal
  },

  computed: {
    totalPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.items.slice(start, end);
    },
  },

  methods: {
    showRegisterModal() {
      this.isRegisterModalVisible = true;
    },
    closeRegisterModal() {
      this.isRegisterModalVisible = false;
    },
  }
};
</script>
