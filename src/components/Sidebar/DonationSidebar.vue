<template>
  <nav class="md:right-0 md:block md:relative md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl h-full flex flex-wrap items-center justify-between relative md:w-60 py-4 px-6 md:bg-teal-100 bg-white">
    <div class="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
      <div class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow top-0 left-0 right-0 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ">
        <!-- Donor List -->
        <div class="w-full">
          <div class="flex flex-row text-base font-bold gap-2 items-center justify-center mb-4 text-emerald-700">
            <img :src="donationboard" alt="donation board icon" class="w-6 h-auto" />
            <h2>Donation Board</h2>
          </div>
          <donor-list />
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import DonorList from "@/components/List/DonorList.vue";

import donationboard from "@/assets/img/donationboard.png";

export default {
  data() {
    return {
      collapseShow: "hidden",
      donationboard,
    };
  },
  methods: {
    toggleCollapseShow: function (classes) {
      this.collapseShow = classes;
    },
  },
  components: {
    DonorList,
  },
};
</script>