<template>
  <!-- Header -->
  <div class="relative bg-mainTheme md:pt-32 pb-32 pt-12">
    <div class="px-4 md:px-10 mx-auto w-full">
      <div>
        <!-- Card stats -->
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4 cursor-pointer">
            <card-stats
              statSubtitle="Post"
              :statTitle="numPost || '-'"
              statArrow="up"
               :statPercent="percPost || '-'"
              statPercentColor="text-emerald-500"
              statDescripiron="Since last week"
              statIconName="far fa-chart-bar"
              statIconColor="bg-red-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="NEW USERS"
              :statTitle="numUser || '-'"
              statArrow="up"
              :statPercent="percUser || '-'"
              statPercentColor="text-emerald-500"
              statDescripiron="Since last week"
              statIconName="fas fa-chart-pie"
              statIconColor="bg-orange-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="Donation Amount"
              :statTitle="'RM ' + (numDonation || '-')"
              statArrow="up"
              :statPercent="percDonation || '-'"
              statPercentColor="text-emerald-500"
              statDescripiron="Since last week"
              statIconName="fas fa-users"
              statIconColor="bg-pink-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="Notification"
              :statTitle="numNoti || '-'"
              statArrow="up"
             :statPercent="percNoti || '-'"
              statPercentColor="text-emerald-500"
              statDescripiron="Since last week"
              statIconName="fas fa-percent"
              statIconColor="bg-emerald-500"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardStats from "@/components/Cards/CardStats.vue";

import { getUserStatisstics, getDonationStatisstics, getPostStatisstics} from "../../service/apiProiderStatistics";

export default {
  components: {
    CardStats,
  },
  data() {
    return {
      numUser: null,
      percUser: null,

      numDonation: null,
      percDonation: null,

      numPost: null,
      percPost: null,

      numNoti: null,
      percNoti: null,
    };
  },
  mounted() {
    this.getUserApi();
  },
  methods: {
    async getUserApi() {
      const userResult = await getUserStatisstics();
      const donationResult = await getDonationStatisstics();
      const postResult = await getPostStatisstics();
      // const notificationResult = await getNotificationStatisstics();

      this.numUser = userResult.total;
      this.percUser = userResult.percentageIncrease;

      this.numDonation = donationResult.totalAmount;
      this.percDonation = donationResult.percentageIncrease;

      this.numPost = postResult.total;
      this.percPost = postResult.percentageIncrease;

      // this.numNoti = notificationResult.total;
      // this.percNoti = notificationResult.percentageIncrease;
    },
  }
};
</script>
