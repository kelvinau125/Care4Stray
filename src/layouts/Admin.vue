<template>
  <div>
    <sidebar />
    <div class="relative md:ml-64 bg-blueGray-100">
      <admin-navbar v-if="isDashboardRoute" />
      <div class="relative">
        <AdminHeader v-if="!isDashboardRoute" />
        <header-stats v-if="isDashboardRoute" />
        <div class="px-4 md:px-10 mx-auto w-full -m-24" :class="[isDashboardRoute ? 'md:pt-0' : 'md:pt-4']">
          <router-view />
          <footer-admin />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavbar from "@/components/Navbars/AdminNavbar.vue";
import AdminHeader from "@/components/Headers/AdminHeader.vue";
import Sidebar from "@/components/Sidebar/AdminSidebar.vue";
import HeaderStats from "@/components/Headers/HeaderStats.vue";
import FooterAdmin from "@/components/Footers/FooterAdmin.vue";

export default {
  name: "admin-layout",
  components: {
    AdminNavbar,
    Sidebar,
    HeaderStats,
    FooterAdmin,
    AdminHeader,
  },

  computed: {
    isDashboardRoute() {
      const dashboardPaths = [
        '/adoption',
        '/stray',
        '/news',
        '/users',
        '/donation',
        '/notification'
      ];

      return dashboardPaths.some(path => this.$route.path.includes(path));
    },
  },
};
</script>
