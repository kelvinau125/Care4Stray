<template>
    <div>
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
      };
    },
  };
  </script>
  
  <style>
  /* Add any global styles here */
  </style>