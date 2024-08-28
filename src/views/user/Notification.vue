<template>
  <!-- Show loading spinner while data is being fetched -->
  <div v-if="isLoading" class="flex justify-center items-center mt-32 mb-32">
    <img src="@/assets/img/pageloading.gif" style="width: 12rem;height: 12rem;" />
  </div>

  <!-- Show "nothing here" image if no posts are available and loading is complete -->
  <div v-else-if="posts.length === 0" class="flex justify-center items-center mt-32 mb-32">
    <img src="@/assets/img/nothinghere.png" style="width: 11rem;height: 12rem;" />
  </div>

  <!-- Display posts if available -->
  <div v-else>
    <NotificationComponent v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script>
import NotificationComponent from "@/components/Notification/NotificationComponent.vue";

export default {
  components: {
    NotificationComponent,
  },
  data() {
    return {
      posts: [
        {
          id: 1,
          userAvatar: require('@/assets/img/team-1-800x800.jpg').default,
          username: "@Username1",
          details: "has liked your post: [ Adoption: 21 y.o. doggy... ]"
        },
        {
          id: 2,
          userAvatar: require('@/assets/img/team-1-800x800.jpg').default,
          username: "@Username1",
          details: "commented on  your post: “more doggy’s info pls"
        },
        {
          id: 3,
          userAvatar: require('@/assets/img/team-1-800x800.jpg').default,
          username: "@Username1",
          details: "has liked your post: [ Adoption: 21 y.o. doggy... ]"
        },
      ],

      isLoading: false,
    };
  },
};
</script>

<style>
/* Add any global styles here */
</style>