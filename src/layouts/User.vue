<template>
  <div>
    <UpdateProfileModal :showModal="isModalVisible" :closeModal="closeModal" />
    
    <auth-navbar />
    <user-navbar v-if="!isApplicationDetailsRoute"/>
    
    <div class="flex flex-col md:flex-row">
      <!-- User Sidebar -->
      <div class="w-full md:w-60 fixed md:fixed left-0 top-0 md:h-full">
        <user-sidebar :class="[isApplicationDetailsRoute ? 'md:top-16' : 'md:top-48']" />
      </div>

      <!-- Main Content and Donation Sidebar Container -->
      <div class="flex flex-col md:flex-row flex-grow ml-0 md:ml-60" :class="[isApplicationDetailsRoute ? 'md:pt-16' : 'md:pt-48']">
        <!-- Main Content -->
        <div class="w-full">
          <user-header v-if="isApplicationDetailsRoute || isPostApplicationDetailsRoute" />
          <PostDetailsComponent v-if="isPostApplicationDetailsRoute"/>
          <div class="w-full md:flex-grow bg-white px-4 md:px-10 mx-auto md:pt-4 pt-44 relative">
            <router-view />
            <footer-admin v-if="!isNewsDetailsRoute" />
          </div>
          <div class="w-full px-12 pb-2 bg-secondaryMain" v-if="isNewsDetailsRoute">
            <NewsFooter/>
            <footer-admin />
          </div>
        </div>

        <!-- Donation Sidebar -->
        <div class="w-full md:w-60">
          <donation-sidebar />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserNavbar from "@/components/Navbars/UserNavbar.vue";
import AuthNavbar from "@/components/Navbars/AuthNavbar.vue";
import UserSidebar from "@/components/Sidebar/UserSidebar.vue";
import DonationSidebar from "@/components/Sidebar/DonationSidebar.vue";
import FooterAdmin from "@/components/Footers/FooterAdmin.vue";
import UserHeader from "@/components/Headers/UserHeader.vue";
import PostDetailsComponent from "@/components/Post/PostDetailsComponent.vue";
import NewsFooter from "@/components/News/NewsFooter.vue";

import { ref } from "vue";
import UpdateProfileModal from "@/components/Modal/UpdateProfileModal.vue";

import VueCookies from 'vue-cookies';
import { getUserInfoStatus } from "@/service/apiProviderAuth";

export default {
  name: "UserLayout",
  components: {
    UserNavbar,
    AuthNavbar,
    UserSidebar,
    DonationSidebar,
    FooterAdmin,
    UserHeader,
    PostDetailsComponent,
    NewsFooter,
    UpdateProfileModal,
  },
  computed: {
    isApplicationDetailsRoute() {
      return this.$route.path.includes('/applicationdetails') ||
      this.$route.path.includes('/editapplicationdetails')  ||
      this.$route.path.includes('/createapplication')
    },
    isPostApplicationDetailsRoute() {
      return this.$route.path.includes('/postdetails')
    },
    isNewsDetailsRoute() {
      return this.$route.path.includes('/newsdetails')
    },
  },

  data() {
    return {
      isModalVisible: ref(false),
    }
  },

  methods: {
    async getUserProfileStatus() {
      const result = await getUserInfoStatus(VueCookies.get("email"));
      
      if(!result){
        this.showModal();
      }
    },

    showModal() {
        this.isModalVisible = true;
    },
    closeModal() {
        this.isModalVisible = false;
    },
  },

  mounted() {
    this.getUserProfileStatus()
  }
};
</script>

<style scoped>
@media (min-width: 768px) {
  .md\\:fixed {
    position: fixed;
  }
}
</style>
