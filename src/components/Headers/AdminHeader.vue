<template>
  <!-- Header -->
  <div class="z-50 bg-mainTheme pb-32 pt-12">
    <div class="px-4 md:px-10 mx-auto w-full">
      <div class="font-bold text-white text-lg">
        <button class="cursor-pointer" @click="goBack">
          <i class="fas fa-chevron-left"></i>
        </button>
        <span class="ml-3">{{ pageTitle }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    pageTitle() {
      if (this.$route.path === '/admin/viewprofile') {
        return 'User Profile'
      }
      else if (this.$route.path === '/admin/createstrayprofile') {
        return 'Create Stray`s Application'
      }
      else if (this.$route.path === '/admin/viewstrayprofile') {
        return 'Stray`s Application'
      }
      else if (this.$route.path === '/admin/editstrayprofile') {
        return 'Edit Stray`s Application'
      }
      else {
        return 'Adoption Application'
      }
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>