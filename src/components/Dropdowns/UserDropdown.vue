<template>
  <div>
    <a class="text-blueGray-500 block" href="#pablo" ref="btnDropdownRef" v-on:click="toggleDropdown($event)">
      <div class="items-center flex justify-between">
        <div class="flex flex-row items-center justify-center gap-3">
          <span class="w-10 h-10 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img alt="..." class="w-full rounded-full align-middle border-none shadow-lg" :src="image" />
          </span>

          <div class="flex flex-col gap-1">
            <span class="text-mainText text-sm font-bold">@ {{ username }}</span>
            <span class="text-thirdText text-xs">uid: {{ user_id }}</span>
          </div>
        </div>

        <i class="fas fa-ellipsis-v text-mainText text-xl"></i>        
      </div>   
    </a>
    <div ref="popoverDropdownRef"
      class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48" v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow,
      }">
      <a href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
        is this user
      </a>
      <a href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
        Another action
      </a>
      <a href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
        Something else here
      </a>
      <div class="h-0 my-2 border border-solid border-blueGray-100" />
      <a href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
        Seprated link
      </a>
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
      username: "Username1",
      user_id: "abc@gmail.com",
    };
  },
  methods: {
    toggleDropdown: function (event) {
      event.preventDefault();
      if (this.dropdownPopoverShow) {
        this.dropdownPopoverShow = false;
      } else {
        this.dropdownPopoverShow = true;
        createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
          placement: "top-start",
        });
      }
    },
  },
};
</script>
