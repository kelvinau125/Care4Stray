<template>
  <div class="donor-list overflow-hidden h-5/6 relative mb-24">
    <transition-group name="cycle" tag="div" class="donor-container flex flex-col">
      <div v-for="donor in visibleDonors" :key="donor.id" class="donor-item py-2 text-center text-base text-mainButton">
        {{ donor.name }}
      </div>
    </transition-group>
  </div>
</template>

<script>
import { getAllDonationlist } from '@/service/apiProviderDonation';

export default {
  data() {
    return {
      donors: [
        // { id: 1, name: "1" },
        // { id: 2, name: "2" },
        // { id: 3, name: "3" },
        // { id: 4, name: "4" },
        // { id: 5, name: "5" },
        // { id: 6, name: "6" },
        // { id: 7, name: "7" },
        // { id: 8, name: "8" },
        // { id: 9, name: "9" },
        // { id: 10, name: "10" },
        // { id: 11, name: "11" },
        // { id: 12, name: "12" },
        // { id: 13, name: "13" },
        // { id: 14, name: "14" },
        // { id: 15, name: "15" },
        // { id: 16, name: "16" },
      ],
      visibleDonors: [],
      intervalId: null,
    };
  },
  created() {
    this.getAllDonationApi().then(() => {
      this.initializeVisibleDonors();
      this.startCycling();
    });
  },
  methods: {
    async getAllDonationApi() {
      this.getList = await getAllDonationlist();
      for (let i = 0; i < this.getList.length; i++) {
        this.donors.push({
          id: i + 1,
          name: this.getList[i]["firstName"] + " " + this.getList[i]["lastName"],
        });
      }
    },
    initializeVisibleDonors() {
      // Initialize the visible donors with the first few donors
      this.visibleDonors = this.donors.slice(0, 12); // Adjust the number of visible donors as needed
    },
    startCycling() {
      this.intervalId = setInterval(() => {
        this.cycleDonors();
      }, 3000); // Adjust the interval as needed
    },
    cycleDonors() {
      // Remove the first donor and add it to the end
      const firstDonor = this.donors.shift();
      this.donors.push(firstDonor);

      // Update visible donors
      this.visibleDonors = [...this.donors.slice(0, 12)]; // Adjust the number of visible donors as needed
    },
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
};
</script>

<style scoped>
@keyframes cycle-enter {
  from {
    opacity: 0;
    transform: translateY(100%);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes cycle-leave {
  from {
    opacity: 1;
    transform: translateY(0);
  }

  to {
    opacity: 0;
    transform: translateY(-100%);
  }
}

.cycle-enter-active,
.cycle-leave-active {
  transition: opacity 1s, transform 1s;
}

.cycle-enter,
.cycle-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>