<template>
  <!-- Show loading spinner while data is being fetched -->
  <div v-if="isLoading" class="flex justify-center items-center mt-32 mb-32">
    <img src="@/assets/img/pageloading.gif" style="width: 21rem; height: 12rem; padding: 1rem;" />
  </div>

  <!-- Show "nothing here" image if no posts are available and loading is complete -->
  <div v-else-if="posts.length === 0" class="flex justify-center items-center mt-32 mb-32">
    <img src="@/assets/img/nothinghere.png" style="width: 11rem;height: 12rem;" />
  </div>

  <!-- Display posts if available -->
  <div v-else>
    <NotificationComponent v-for="post in posts" :key="post.id" :post="post" class="cursor-pointer"
    @click="toRoute(post.id, post.notificationType, post.postID, post.applicationID)"  />
    <div class="mb-72"></div>
  </div>
</template>

<script>
import NotificationComponent from "@/components/Notification/NotificationComponent.vue";
import { getNotification } from "../../service/apiProviderNotification";

export default {
  components: {
    NotificationComponent,
  },
  data() {
    return {
      posts: [
        // {
        //   id: 1,
        //   userAvatar: require('@/assets/img/team-1-800x800.jpg').default,
        //   username: "@Username1",
        //   details: "has liked your post: [ Adoption: 21 y.o. doggy... ]"
        // },
        // {
        //   id: 2,
        //   userAvatar: require('@/assets/img/team-1-800x800.jpg').default,
        //   username: "@Username1",
        //   details: "commented on  your post: “more doggy’s info pls"
        // },
        // {
        //   id: 3,
        //   userAvatar: require('@/assets/img/team-1-800x800.jpg').default,
        //   username: "@Username1",
        //   details: "has liked your post: [ Adoption: 21 y.o. doggy... ]"
        // },
      ],

      isLoading: true,
    };
  },

  mounted() {
    this.generateNotificationsLists()
  },

  methods: {
    toRoute(id, notificationType, postID = null, applicationID = null) {
      if (notificationType === 'POST') {
        this.$router.push({
          path: '/user/postdetails',
          query: {
            postID: postID,
          },
        });
      } else if (notificationType === 'ADOPTION') {
        this.$router.push({
          path: '/user/applicationdetails',
          query: {
            applicationID: applicationID,
          },
        });
      }
    },

    async generateNotificationsLists() {
      this.getList = await getNotification();
      for (let i = 0; i < this.getList.length; i++) {
        this.posts.push({
          id: this.getList[i]["notificationId"],
          userAvatar: this.getList[i]["sender"]["userAvatar"],
          username: "@ " + this.getList[i]["sender"]["firstName"] + " " + this.getList[i]["sender"]["lastName"],
          details: this.getList[i]["message"],
          notificationType: this.getList[i]['notificationType'],

          // postID: this.getList[i]['comment']['post'] ? this.getList[i]['comment']['post']['postId'] : null,
          postID: this.getList[i]['comment']?.['post']?.['postId'] || null,
         
          // applicationID: this.getList[i]['adoption'] ? this.getList[i]['adoption']['adoptionId'] : null,
          applicationID: this.getList[i]['adoption']?.['adoptionId'] || null,

          duration: this.getList[i]['duration'],
        });
      }

      this.isLoading = false;
    },
  },
};
</script>