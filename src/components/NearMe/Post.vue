<template>
    <div class="border border-gray-300 p-4 mb-4 rounded-lg">
      <div class="flex items-center mb-4">
        <img :src="post.userAvatar" alt="User Avatar" class="w-12 h-12 rounded-full mr-4" />
        <div class="text-sm">
          <p class="font-semibold">{{ post.username }}</p>
          <p class="text-gray-500">{{ post.date }}</p>
        </div>
      </div>
      <div class="mb-4">
        <h3 class="font-bold text-lg mb-2">{{ post.title }}</h3>
        <p class="text-gray-700 whitespace-pre-line">{{ post.description }}</p>
        <div class="flex flex-wrap mt-4">
          <img v-for="(image, index) in displayedImages" :key="index" :src="image" alt="Post Image" class="w-32 h-32 object-cover mr-2 mb-2" />
          <div v-if="remainingImages > 0" class="w-32 h-32 flex items-center justify-center bg-gray-200 text-gray-700">
            +{{ remainingImages }}
          </div>
        </div>
      </div>
      <div class="flex items-center">
        <button @click="likePost" class="text-blue-500 hover:text-blue-700">Like</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "PostComponent",
    props: {
      post: {
        type: Object,
        required: true,
      },
    },
    computed: {
      displayedImages() {
        return this.post.images.slice(0, 3);
      },
      remainingImages() {
        return this.post.images.length - 3;
      },
    },
    methods: {
      likePost() {
        this.$emit("like-post", this.post.id);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Additional scoped styles can go here if needed */
  </style>
  