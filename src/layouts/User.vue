<template>
  <div>
    <auth-navbar />
    <user-navbar />
    <div class="flex flex-col md:flex-row">
      <!-- User Sidebar -->
      <div class="w-full md:w-60 border-2 fixed md:fixed left-0 top-0 md:h-full">
        <user-sidebar />
      </div>

      <!-- Main Content and Donation Sidebar Container -->
      <div class="flex flex-col md:flex-row flex-grow ml-0 md:ml-60 md:pt-48">
        <!-- Main Content -->
        <div class="w-full md:flex-grow bg-white px-4 md:px-10 mx-auto md:pt-4 relative border-2">
          <router-view />
          <footer-admin />
        </div>

        <!-- Donation Sidebar -->
        <div class="w-full md:w-60 border-2">
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

export default {
  name: "UserLayout",
  components: {
    UserNavbar,
    AuthNavbar,
    UserSidebar,
    DonationSidebar,
    FooterAdmin,
  },
};
</script>

<style scoped>
@media (min-width: 768px) {
  .md\\:fixed {
    position: fixed;
  }
}
</style>
