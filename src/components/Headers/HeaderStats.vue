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
              :statArrow="postStatArrow"
              :statPercent="formattedPostPercent"
              :statPercentColor="postStatPercentColor"
              statDescripiron="Since last week"
              statIconName="far fa-chart-bar"
              statIconColor="bg-red-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="NEW USERS"
              :statTitle="numUser || '-'"
              :statArrow="userStatArrow"
              :statPercent="formattedUserPercent"
              :statPercentColor="userStatPercentColor"
              statDescripiron="Since last week"
              statIconName="fas fa-chart-pie"
              statIconColor="bg-orange-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="Donation Amount"
              :statTitle="'RM ' + (numDonation || '-')"
              :statArrow="donationStatArrow"
              :statPercent="formattedDonationPercent"
              :statPercentColor="donationStatPercentColor"
              statDescripiron="Since last week"
              statIconName="fas fa-users"
              statIconColor="bg-pink-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="Notification"
              :statTitle="numNoti || '-'"
              :statArrow="notiStatArrow"
              :statPercent="formattedNotiPercent"
              :statPercentColor="notiStatPercentColor"
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
import { getUserStatisstics, getDonationStatisstics, getPostStatisstics, getNotificationStatisstics } from "../../service/apiProiderStatistics";

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
  computed: {
    // Compute for Post Stats
    postStatArrow() {
      return this.percPost && this.percPost >= 0 ? 'up' : 'down';
    },
    postStatPercentColor() {
      return this.percPost && this.percPost >= 0 ? 'text-emerald-500' : 'text-red-500';
    },
    formattedPostPercent() {
      return this.percPost ? parseFloat(this.percPost).toFixed(2) : '-';
    },

    // Compute for User Stats
    userStatArrow() {
      return this.percUser && this.percUser >= 0 ? 'up' : 'down';
    },
    userStatPercentColor() {
      return this.percUser && this.percUser >= 0 ? 'text-emerald-500' : 'text-red-500';
    },
    formattedUserPercent() {
      return this.percUser ? parseFloat(this.percUser).toFixed(2) : '-';
    },

    // Compute for Donation Stats
    donationStatArrow() {
      return this.percDonation && this.percDonation >= 0 ? 'up' : 'down';
    },
    donationStatPercentColor() {
      return this.percDonation && this.percDonation >= 0 ? 'text-emerald-500' : 'text-red-500';
    },
    formattedDonationPercent() {
      return this.percDonation ? parseFloat(this.percDonation).toFixed(2) : '-';
    },

    // Compute for Notification Stats
    notiStatArrow() {
      return this.percNoti && this.percNoti >= 0 ? 'up' : 'down';
    },
    notiStatPercentColor() {
      return this.percNoti && this.percNoti >= 0 ? 'text-emerald-500' : 'text-red-500';
    },
    formattedNotiPercent() {
      return this.percNoti ? parseFloat(this.percNoti).toFixed(2) : '-';
    },
  },
  methods: {
    async getUserApi() {
      const userResult = await getUserStatisstics();
      const donationResult = await getDonationStatisstics();
      const postResult = await getPostStatisstics();
      const notificationResult = await getNotificationStatisstics();

      this.numUser = userResult.total;
      this.percUser = userResult.percentageIncrease;

      this.numDonation = donationResult.totalAmount;
      this.percDonation = donationResult.percentageIncrease;

      this.numPost = postResult.total;
      this.percPost = postResult.percentageIncrease;

      this.numNoti = notificationResult.total;
      this.percNoti = notificationResult.percentageIncrease;
    },
  }
};
</script>
