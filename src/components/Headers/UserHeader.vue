<template>
  <!-- Header -->
  <div class="relative bg-secondTheme pb-3 pt-4">
    <div class="px-3 mx-auto w-full font-semibold text-mainText">
      <div>
        <button class="cursor-pointer" @click="goBack">
          <i class="fas fa-chevron-left"></i>
        </button>
        <span class="ml-3">Adoption Application</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
