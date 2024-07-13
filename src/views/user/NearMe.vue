<template>
    <div class="p-4">
      <PostComponent
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @like-post="handleLikePost"
      />
    </div>
  </template>
  
  <script>
import PostComponent from "@/components/NearMe/Post.vue";
  
  export default {
    components: {
      PostComponent,
    },
    data() {
      return {
        posts: [
          {
            id: 1,
            userAvatar: require('@/assets/img/team-1-800x800.jpg').default,
            username: "@Username1",
            date: "2024.04.05",
            title: "Doggy",
            description: "• Affectionate feline\n• Playful",
            images: [require('@/assets/img/sketch.jpg').default, require('@/assets/img/team-2-800x800.jpg').default, require('@/assets/img/sketch.jpg').default,  require('@/assets/img/sketch.jpg').default],
          },
          {
            id: 2,
            userAvatar: require('@/assets/img/team-1-800x800.jpg').default,
            username: "@Username1",
            date: "2024.04.05",
            title: "Mimi",
            description: "• Affectionate feline\n• Playful",
            images: [require('@/assets/img/sketch.jpg').default, require('@/assets/img/team-2-800x800.jpg').default],
          },
        ],
      };
    },
    methods: {
      handleLikePost(postId) {
        console.log(`Liked post with ID: ${postId}`);
      },
    },
  };
  </script>
  
  <style>
  /* Add any global styles here */
  </style>
  