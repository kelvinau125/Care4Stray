<template>
  <div>
    <auth-navbar />
    <div class="flex">
      <user-sidebar />
      <div class="relative md:ml-64 bg-blueGray-100 flex-1">
        <user-navbar />
        <header-stats />
        <div class="px-4 md:px-10 mx-auto w-full -m-24">
          <router-view />
          <footer-admin />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UserNavbar from "@/components/Navbars/UserNavbar.vue";
import AuthNavbar from "@/components/Navbars/AuthNavbar.vue";
import UserSidebar from "@/components/Sidebar/UserSidebar.vue";
import HeaderStats from "@/components/Headers/HeaderStats.vue";
import FooterAdmin from "@/components/Footers/FooterAdmin.vue";

export default {
  name: "UserLayout",
  components: {
    UserNavbar,
    AuthNavbar,
    UserSidebar,
    HeaderStats,
    FooterAdmin,
  },
};
</script>
