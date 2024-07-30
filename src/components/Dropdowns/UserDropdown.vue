<template>
  <div>
    <!-- Avatar and Dropdown Toggle -->
    <a class="text-blueGray-500 block" href="#pablo" ref="btnDropdownRef" v-on:click="toggleDropdown($event)">
      <div class="items-center flex justify-between">
        <div class="flex flex-row items-center justify-center gap-3">
          <span
            class="w-10 h-10 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img alt="..." class="w-full rounded-full align-middle border-none shadow-lg" :src="image" />
          </span>

          <!-- Username and UID, hidden on mobile view -->
          <div class="hidden md:flex flex-col gap-1">
            <span class="text-mainText text-sm font-bold">@ {{ username }}</span>
            <span class="text-thirdText text-xs">uid: {{ user_id }}</span>
          </div>
        </div>

        <!-- Ellipsis icon, hidden on mobile view -->
        <i class="fas fa-ellipsis-v text-mainText text-xl hidden md:block"></i>
      </div>
    </a>

    <!-- Dropdown content -->
    <div ref="popoverDropdownRef"
      class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48" v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow,
      }">
      <router-link
        to="/user/profile"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
        User Profile
      </router-link>
      <router-link 
        to="/user/donationhistory"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
        Donation History
      </router-link >
      <div class="h-0 my-2 border border-solid border-blueGray-100" />
      <a href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
        Sign Out
      </a>
    </div>
  </div>
</template>

<script>
import { createPopper } from "@popperjs/core";

// api
import { getUserInfo } from "@/service/apiProviderAuth.js";

// get user cookie / set cookie
import VueCookies from 'vue-cookies';

export default {
  data() {
    return {
      dropdownPopoverShow: false,
      image: "",
      username: "",
      user_id: "",
    };
  },

  methods: {
    toggleDropdown: function (event) {
      event.preventDefault();
      if (this.dropdownPopoverShow) {
        this.hideDropdown();
      } else {
        this.showDropdown();
      }
    },

    showDropdown: function () {
      this.dropdownPopoverShow = true;
      createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
        placement: "top-start",
      });
      document.addEventListener('click', this.handleClickOutsideDropdown);
    },

    hideDropdown: function () {
      this.dropdownPopoverShow = false;
      document.removeEventListener('click', this.handleClickOutsideDropdown);
    },

    handleClickOutsideDropdown: function (event) {
      const dropdown = this.$refs.popoverDropdownRef;
      const button = this.$refs.btnDropdownRef;
      if (dropdown && !dropdown.contains(event.target) && button && !button.contains(event.target)) {
        this.hideDropdown();
      } else if (dropdown && dropdown.contains(event.target)) {
        this.hideDropdown();
      }
    },

    async getUserInfoApi() {

      const email = VueCookies.get('email');

      const result = await getUserInfo(email);

      console.log("hahahhah")
      console.log(result)
      this.image = result.userAvatar;
      this.username = result.firstName + " " + result.lastName;
      this.user_id = result.username;
    },
  },

  mounted() {
    this.getUserInfoApi();
  }
};
</script>

<style scoped>
/* Adjust styles as needed */
</style>
