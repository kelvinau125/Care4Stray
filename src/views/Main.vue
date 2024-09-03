<template>
  <div>
    <navbar />
    <RegisterModal :showRegModal="isRegisterModalVisible" :closeRegModal="closeRegisterModal" />
    <main>
      <div class="flex justify-center">
        <div v-if="alertOpen" :class="alertClass">
          <span class="text-xl inline-block mr-5 align-middle">
            <i class="fas fa-bell"></i>
          </span>
          <span class="align-middle mr-8">
            <b class="capitalize">{{ alertType }} ! </b> {{ alertMessage }}
          </span>
          <button
            class="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
            @click="closeAlert">
            <span>×</span>
          </button>
        </div>
      </div>
      <div class="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
        <div class="absolute top-0 w-full h-full bg-center bg-cover"
          :style="{ backgroundImage: `url(${headerBackground})` }">
          <!-- <span
            id="blackOverlay"
            class="w-full h-full absolute opacity-75 bg-black"
          ></span> -->
        </div>
        <div class="container relative mx-auto mt-16">
          <div class="items-center flex flex-wrap">
            <div class="w-full px-4 ml-auto mr-auto text-left">
              <div class="">
                <h1 class="text-secondaryMain font-bold text-5xl" style="text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.5);">
                  Stay For Strays
                </h1>
                <p class="mt-4 lg:w-6/12 text-2xl text-secondaryMain"
                  style="text-shadow: 4px 4px 5.7px rgba(0, 0, 0, 0.5);">
                  Join us in making a difference, one paw at a time
                </p>
                <div class="sm:block flex flex-col mt-16">
                  <button @click="showRegisterModal"
                    class="get-started text-mainText font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-2 bg-secondaryMain active:bg-secondaryMain uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150">
                    Register Now
                  </button>

                  <router-link to="/contactus"
                    class="text-secondaryMain sm:ml-1 background-transparent font-bold uppercase px-8 py-3 outline-none focus:outline-none mr-1 mb-1 text-sm ease-linear transition-all duration-150">
                    Contact Us
                  </router-link>
                </div>

                <p class="mt-6 sm:mt-10 font-bold text-2xl text-secondaryMain text-right"
                  style="text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.5);">
                  - Where Every Paw Finds a Home!
                </p>

              </div>
            </div>
          </div>
        </div>
        <div class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          style="transform: translateZ(0);">
          <svg class="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
            version="1.1" viewBox="0 0 2560 100" x="0" y="0">
            <polygon class="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>
      </div>

      <section class="relative py-20">
        <div class="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
          style="transform: translateZ(0);">
          <svg class="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
            version="1.1" viewBox="0 0 2560 100" x="0" y="0">
            <polygon class="text-white fill-current" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>

        <div class="container mx-auto px-4 ">
          <div class="flex flex-wrap md:flex-nowrap items-start">
            <!-- Left Side Column -->
            <div class="w-full md:w-6/12 flex flex-col space-y-4">
              <!-- First Div -->
              <div class="px-4 bg-secondaryMain border-mainTheme border-2 rounded-2xl mb-5">
                <div class="flex-auto px-4 lg:px-10 py-10 pt-10" v-if="isLogin">
                  <div class="flex items-center justify-center pb-2 flex-col">
                    <img :src="userAvatar" alt="user avatar" class="w-44 h-44 rounded-full" />
                    <div class="font-bold text-lg text-mainText mt-4">@ {{ username }}</div>
                  </div>

                  <div class="text-center mt-4">
                    <button
                      class="bg-mainButton text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      @click="toDashboard()">
                      Go to Dashboard
                    </button>
                  </div>

                </div>
                <div class="flex-auto px-4 lg:px-10 py-10 pt-10" v-if="!isLogin">
                  <form @submit.prevent="signIn">
                    <div class="relative w-full mb-3">
                      <label class="block uppercase text-blueGray-600 text-sm font-bold mb-2" htmlFor="grid-password">
                        Email
                      </label>
                      <input type="email"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Email" v-model="email" />
                    </div>

                    <div class="relative w-full mb-3">
                      <label class="block uppercase text-blueGray-600 text-sm font-bold mb-2" htmlFor="grid-password">
                        Password
                      </label>
                      <input type="password"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-lg shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Password" v-model="password" />
                    </div>

                    <div class="text-center mt-6">
                      <button
                        class="bg-mainButton text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="submit">
                        Sign In
                      </button>
                    </div>
                  </form>

                  <div class="text-center text-lg mt-6">
                    <p>Don’t have an account?
                      <span>
                        <button @click="showRegisterModal"
                          class='ml-1 background-transparent font-bold outline-none focus:outline-none ease-linear transition-all duration-150 underline'>
                          Sign Up
                        </button>
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <!-- Second Div -->
              <div class="px-4 border-2 border-mainTheme rounded-2xl mt-4 pb-4 flex-auto flex flex-col justify-between">
                <div>
                  <div class="text-center text-2xl font-bold text-mainText mt-4 mb-6">
                    <div class="flex ml-2">
                      <img :src="takeMeHome" alt="take me home" class="w-8 h-8 mr-2">
                      Take Me Home
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div v-for="(pet, index) in pets" :key="index"
                      class="border p-4 rounded-lg shadow-lg flex flex-col bg-secondaryMain cursor-pointer"
                      style="height: 429px; width: auto;" @click="goToPostDetails(pet.id)">
                      <div class="items-center flex justify-center">
                        <img :src="pet.image" alt="Pet Image" class="w-full takemehomeimg h-auto mb-4 rounded-lg">
                      </div>
                      <div class="flex flex-row items-end">
                        <h2 class="text-xl font-bold mb-2 mr-2">{{ pet.name }}</h2>
                        <p class="text-gray-600 mb-2">{{ pet.age }} years old</p>
                      </div>
                      <ul class="text-left list-disc list-inside mb-4">
                        <li v-for="(trait, tIndex) in pet.traits" :key="tIndex">{{ trait }}</li>
                      </ul>
                      <div class="flex space-x-2">
                        <span class="material-icons" v-if="pet.vaccined"><img :src="vaccine" alt="vaccine"
                            class="w-8 h-8 p-1"></span>
                        <span class="material-icons" v-if="pet.dewormed"><img :src="worm" alt="warm"
                            class="w-8 h-8 p-1"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="text-right mt-4 mr-3 text-mainText">
                  <span>
                    <button @click="goToSeeMore()"
                      class="ml-1 background-transparent font-bold outline-none focus:outline-none ease-linear transition-all duration-150">
                      Show More...
                    </button>
                  </span>
                </div>
              </div>
            </div>

            <!-- Right Side -->
            <div
              class="w-full md:w-8/12 px-4 border-2 border-mainTheme rightside rounded-2xl pb-5 md:ml-10 mt-8 md:mt-0 flex-grow">
              <div class="text-mainText font-bold text-3xl mt-4 mb-4 flex items-center ml-1">
                <img :src="animalNews" alt="animal news" class="w-10 h-10 mr-2">
                <p>Animal News</p>
              </div>
              <div>
                <div v-for="(item, index) in paginatedItems" :key="index" class="rightspace">
                  <div class="border-2 border-mainTheme p-4 rounded-lg shadow-lg flex">
                    <div class="w-full mr-5 flex items-center justify-center">
                      <img :src="item.image" alt="picture" class="h-auto rounded-md"
                        style="width: 200px; height: 200px;">
                    </div>

                    <div class="w-full flex flex-col justify-between">
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
                  <button v-for="page in totalPages" :key="page" @click="currentPage = page" :class="{
                    'px-3 py-1 border-2 border-mainTheme rounded-full': true,
                    'bg-mainTheme text-white': currentPage === page,
                    'bg-white text-mainTheme': currentPage !== page
                  }">
                    {{ page }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="pb-4 relative block bg-mainTheme">
        <div class="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
          style="transform: translateZ(0);">
          <svg class="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
            version="1.1" viewBox="0 0 2560 100" x="0" y="0">
            <polygon class="text-mainTheme fill-current" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>

        <div class="container mx-auto px-4 py-12 lg:pt-24 lg:pb-32">
          <div class="flex">
            <div class="w-full">
              <div class="flex mb-5">
                <img :src="logo" alt="logo" class="w-28 md:h-auto h-4/5 mr-10">
                <div>
                  <h2 class="md:text-4xl text-xl font-semibold text-secondaryMain">
                    Spare a Paw, Share Some Love:
                  </h2>
                  <span class="inline-block md:text-4xl text-lg font-semibold text-secondaryMain mt-2">Donate to
                    Care4Strays!</span>
                </div>
              </div>
              <p class="md:text-3xl text-base leading-relaxed mt-10 mb-4 text-secondaryMain lg:w-9/12">
                Together, we're making a meaningful difference in their lives. Thank you for believing in Care4Strays
              </p>
            </div>
          </div>

          <div class="mt-10">
            <router-link to="/donation"
              class="get-started text-mainText font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-2 bg-secondaryMain active:bg-secondaryMain uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150">
              Donate for Strays
            </router-link>
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
import VueCookies from 'vue-cookies';

// api
import { login, getUserInfo } from "@/service/apiProviderAuth.js";
import { getNewsList } from '@/service/apiProviderNews';
import { getStrayList } from "@/service/apiProviderAdoption";
import { createUser } from "@/service/apiProviderAuth.js";

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
        // {
        //   image: require('@/assets/img/team-1-800x800.jpg').default, // replace with actual path
        //   title: "Rescued dog 'trapped for several days' down well",
        //   description: "A dog rescued from a well had been trapped for several days and was 'giving up' in front of his rescuers' eyes, it has emerged.",
        //   author: "Federica Bedendo",
        //   date: "2 days ago",
        // },
        // {
        //   image: require('@/assets/img/team-2-800x800.jpg').default, // replace with actual path
        //   title: "Rescued dog 'trapped for several days' down well",
        //   description: "A dog rescued from a well had been trapped for several days and was 'giving up' in front of his rescuers' eyes, it has emerged.",
        //   author: "Federica Bedendo",
        //   date: "2 days ago",
        // },
        // {
        //   image: require('@/assets/img/team-2-800x800.jpg').default, // replace with actual path
        //   title: "Rescued dog 'trapped for several days' down well",
        //   description: "A dog rescued from a well had been trapped for several days and was 'giving up' in front of his rescuers' eyes, it has emerged.",
        //   author: "Federica Bedendo",
        //   date: "2 days ago",
        // },
      ],
      currentPage: 1,
      itemsPerPage: 5, // Adjust this number based on how many items you want per page

      pets: [
        // {
        //   image: require('@/assets/img/sketch.jpg').default, // replace with actual path
        //   name: "Mimi",
        //   age: "3 years",
        //   traits: ["Litter trained", "Food critic approved with a love of play", "Affectionate feline"],
        // },
        // {
        //   image: require('@/assets/img/sketch.jpg').default, // replace with actual path
        //   name: "Mimi",
        //   age: "3 years",
        //   traits: ["Litter trained", "Food critic approved with a love of play", "Affectionate feline"],
        // },
        // {
        //   image: require('@/assets/img/sketch.jpg').default, // replace with actual path
        //   name: "Mimi",
        //   age: "3 years",
        //   traits: ["Litter trained", "Food critic approved with a love of play", "Affectionate feline"],
        // },
        // {
        //   image: require('@/assets/img/sketch.jpg').default, // replace with actual path
        //   name: "Mimi",
        //   age: "3 years",
        //   traits: ["Litter trained", "Food critic approved with a love of play", "Affectionate feline"],
        // },
      ],

      userAvatar: "",
      username: "",

      isLogin: false,

      // login
      email: "",
      password: "",
      alertOpen: false,
      alertType: "success",
      alertMessage: "",
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
    alertClass() {
      return {
        "text-white px-6 py-4 border-0 rounded-full fixed mb-4 z-50 w-6/12 mt-8": true,
        "bg-emerald-500": this.alertType === "success",
        "bg-red-500": this.alertType === "error",
      };
    },
  },
  async mounted() {
    this.getAllStrayListApi();
    this.generateNewsLists();

    if (VueCookies.isKey('email')) {
      this.isLogin = true;
      this.getUserInfoApi();
    }

    await createUser(
      "Care4Stray", 
      "Admin", 
      "admin@gmail.com", 
      "MALE", 
      "111111",
      "ADMIN",
      "https://res.cloudinary.com/dfmnw3bin/image/upload/v1725337219/uxtqhvbkm95ect8w4kxn.gif"
    );
  },
  methods: {
    toDashboard() {
      this.$router.push('/user')
    },
    async getUserInfoApi() {
      const result = await getUserInfo(VueCookies.get('email'));

      this.userAvatar = result.userAvatar;
      this.username = result.username;
    },

    async getAllStrayListApi() {
      this.getList = await getStrayList();

      // Shuffle the getNewsList array using the Fisher-Yates algorithm
      for (let i = this.getList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.getList[i], this.getList[j]] = [this.getList[j], this.getList[i]];
      }

      for (let i = 0; i < 4; i++) {
        this.pets.push({
          id: this.getList[i]["strayId"],
          image: this.getList[i]["mainPicture"],
          name: this.getList[i]["name"],
          age: this.getList[i]["age"],
          traits: this.getList[i]["behaviour"].slice(0, 4),
          vaccined: this.getList[i]["vaccinated"],
          dewormed: this.getList[i]["dewormed"],
        });
      }
    },

    async generateNewsLists() {
      this.getNewsList = await getNewsList();
      for (let i = 0; i < this.getNewsList.length; i++) {
        this.items.push({
          id: this.getNewsList[i]["id"],
          image: this.getNewsList[i]["pic"],
          title: this.getNewsList[i]["title"],
          description: this.getNewsList[i]["content"],
          author: this.getNewsList[i]["author"],
          date: this.getNewsList[i]["duration"],
        });
      }
    },
    showRegisterModal() {
      this.isRegisterModalVisible = true;
    },
    closeRegisterModal() {
      this.isRegisterModalVisible = false;
    },
    goToPostDetails(id) {
      if (this.isLogin) {
        this.$router.push({
          path: '/user/postdetails',
          query: {
            postID: id,
          },
        });
      } else {
        this.showRegisterModal()
      }
    },
    goToSeeMore() {
      if (this.isLogin) {
      this.$router.push("/user/adoption")
      } else {
        this.showRegisterModal()
      }
    },
    async signIn() {
      const username = this.email;
      const password = this.password;

      const result = await login(username, password);

      if (result == true) {
        this.alertType = "success";
        this.alertMessage = "Login successfully!";
        this.openAlert();

        if (VueCookies.get("role") == "ADMIN") {
          this.$router.push('/admin')
        } else if (VueCookies.get("role") == "USER") {
          this.$router.push('/user')
        } else {
          this.$router.push('/')
        }

      } else {
        this.alertType = "error";
        this.alertMessage = result || "An error occurred.";
        this.openAlert();
      }
    },

    openAlert() {
      this.alertOpen = true;
      setTimeout(() => {
        this.alertOpen = false;
      }, 3000); // Close alert after 3 seconds
    },

    closeAlert() {
      this.alertOpen = false;
    },
  }
};
</script>

<style scoped>
/* Extra Large screens (1280px and above) */
.rightside {
  height: 1417px;
}

.rightspace {
  margin-bottom: 1.5rem;
}

/* Large screens (1024px - 1279px) */
@media screen and (max-width: 1279px) {
  .rightside {
    height: 1421px;
  }

  .rightspace {
    margin-bottom: 2.5rem;
  }
}

/* Medium screens (768px - 1023px) */
@media screen and (max-width: 1023px) {
  .rightside {
    height: 1556px;
  }

  .rightspace {
    margin-bottom: 1rem;
  }
}

/* Small screens (smaller than 768px) */
@media screen and (max-width: 767px) {
  .rightside {
    height: 1200px;
  }

  .rightspace {
    margin-bottom: 1rem;
  }

  .takemehomeimg {
    width: 50%;
  }
}

/* Small screens (smaller than 768px) */
@media screen and (max-width: 447px) {
  .rightside {
    height: auto;
  }

  .rightspace {
    margin-bottom: 1rem;
  }

  .takemehomeimg {
    width: 50%;
  }
}
</style>