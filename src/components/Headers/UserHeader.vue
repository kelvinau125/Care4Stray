<template>
  <!-- Header -->
  <div class="relative bg-secondTheme pb-3 pt-4">
    <div class="px-3 mx-auto w-full font-semibold text-mainText">
      <div>
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
  data() {
    return {
      searchKeyword: this.$route.query.keyword,
    }
  },
  computed: {
    pageTitle() {
      if (this.$route.path === '/user/editapplicationdetails') {
        return 'Edit Application'
      }
      else if (this.$route.path === '/user/postdetails') {
        return 'Post'
      }
      else if (this.$route.path === '/user/search') {
        return this.searchKeyword || 'Search';
      }
      else {
        return 'Adoption Application'
      }
    }
  },
  watch: {
    '$route.query.keyword': function(newKeyword) {
      this.searchKeyword = newKeyword;
    }
  },
  methods: {
    goBack() {
      if (this.$route.path !== '/user/search') {
        this.$router.go(-1);
      } else {
        const previousPage = sessionStorage.getItem('previousPage');
        if (previousPage) {
          this.$router.replace(previousPage);
        } else {
          this.$router.go(-1);
        }
      }
    }
  },
};
</script>