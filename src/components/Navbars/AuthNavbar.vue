<template>
  <nav 
    class="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg"
    :style="navbarStyle">
    <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
      <div class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
        <button
          class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
          type="button" v-on:click="toggleNavbar">
          <i class="text-white fas fa-bars"></i>
        </button>

        <router-link
          class="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
          to="/">
          Care4Stray
        </router-link>
        
        <div class="md:mt-auto">
          <user-dropdown />
        </div>
      </div>

      <div class="lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none"
        :class="[navbarOpen ? 'block rounded shadow-lg' : 'hidden']" id="example-navbar-warning">

        <div class="flex w-full flex-wrap items-stretch px-4 pt-4"
        :class="[navbarOpen ? 'block' : 'hidden']">
          <span
            class="z-10 h-full leading-snug font-normal text-center text-blueGray-600 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
            <i class="fas fa-search"></i>
          </span>
          <input type="text" placeholder="Search post..."
            class="rounded-full border-0 px-3 py-3 placeholder-blueGray-600  text-blueGray-600 relative bg-secondTheme text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10" />
        </div>

        <!-- Divider -->
        <hr class="mx-4 mt-6" />

        <ul class="flex flex-col lg:flex-row list-none lg:ml-auto pt-2">
          <li class="flex items-center">
            <router-link 
              class="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
              to="/user/nearme" @click.native="closeNavbar">
              StraysCommunity
            </router-link>
          </li>

          <li class="flex items-center">
            <router-link 
              class="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
              to="/guestnews" @click.native="closeNavbar">
              News
            </router-link>
          </li>

          <li class="flex items-center">
            <router-link
              class="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
              to="/user/adoption" @click.native="closeNavbar">
              Take Me Home
            </router-link>
          </li>

          <li class="flex items-center">
            <router-link
              class="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
              to="/donation" @click.native="closeNavbar">
              Donation
            </router-link>
          </li>

          <!-- Divider -->
          <hr class="mx-4 my-2" />

          <li class="flex items-center" :class="[navbarOpen ? 'block' : 'hidden']">
            <router-link
              class="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
              to="/user/notification" @click.native="closeNavbar">
              Notification
            </router-link>
          </li>

          <li class="flex items-center" :class="[navbarOpen ? 'block' : 'hidden']">
            <router-link
              class="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
              to="/user/application" @click.native="closeNavbar">
              Application
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import headerBackground from "@/assets/img/header-background.png";
import UserDropdown from "@/components/Dropdowns/UserDropdown.vue";

export default {
  components: {
    UserDropdown,
  },

  data() {
    return {
      navbarOpen: false,
      headerBackground,
    };
  },

  computed: {
    navbarStyle() {
      if (this.$route.path === '/') {
        return {};
      } else if (this.$route.path.includes('/user')) {
        return {
          position: 'fixed',
          backgroundImage: `url(${this.headerBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: 'white', 
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
        };
      } else {
        return {
          backgroundImage: `url(${this.headerBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        };
      }
    },
  },

  methods: {
    toggleNavbar(event) {
      event.stopPropagation();
      this.navbarOpen = !this.navbarOpen;
    },
    closeNavbar() {
      this.navbarOpen = false;
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.closeNavbar();
      }
    },
  },

  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },

  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  },
};
</script>
