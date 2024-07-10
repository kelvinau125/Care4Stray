<template>
  <div>
    <auth-navbar />
    <user-navbar />
    <div class="flex flex-col md:flex-row">
      <!-- User Sidebar -->
      <div class="w-full md:w-1/4">
        <user-sidebar />
      </div>
      <!-- Main Content -->
      <div class="w-full bg-white px-4 md:px-10 mx-auto md:pt-56 relative">
          <router-view />
          <footer-admin />
      </div>
      <!-- Donation Sidebar -->
      <div class="w-full md:w-1/4">
        <donation-sidebar />
      </div>
    </div>
  </div>
</template>

<script>
import UserNavbar from "@/components/Navbars/UserNavbar.vue";
import AuthNavbar from "@/components/Navbars/AuthNavbar.vue";
import UserSidebar from "@/components/Sidebar/UserSidebar.vue";
import DonationSidebar from "@/components/Sidebar/DonationSidebar.vue";
// import UserHeaderStats from "@/components/Headers/UserHeaderStats.vue";
import FooterAdmin from "@/components/Footers/FooterAdmin.vue";

export default {
  name: "UserLayout",
  components: {
    UserNavbar,
    AuthNavbar,
    UserSidebar,
    DonationSidebar,
    // UserHeaderStats,
    FooterAdmin,
  },
};
</script>
