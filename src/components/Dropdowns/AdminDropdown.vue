<template>
  <div>
    <a
      class="text-blueGray-500 block"
      href="#pablo"
      ref="btnDropdownRef"
      v-on:click="toggleDropdown($event)"
    >
      <div class="items-center flex">
        <span
          class="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full"
        >
          <img
            alt="..."
            class="w-full rounded-full align-middle border-none shadow-lg"
            :src="image"
          />
        </span>
      </div>
    </a>
    <div
      ref="popoverDropdownRef"
      class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
      v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow,
      }"
    >
      <a
        href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        @click="goHomePage()"
      >
        Logout
      </a>
      <!-- <div class="h-0 my-2 border border-solid border-blueGray-100" /> -->
    </div>
  </div>
</template>

<script>
import { createPopper } from "@popperjs/core";

import image from "@/assets/img/team-1-800x800.jpg";

export default {
  data() {
    return {
      dropdownPopoverShow: false,
      image: image,
    };
  },
  methods: {
    goHomePage() {
      this.$router.push('/')
    },

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
        placement: "bottom-start",
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
    }
  },
};
</script>
