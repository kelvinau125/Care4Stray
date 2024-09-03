<template>
  <div>
    <div>
      <div v-if="posts.length > 0" class="flex items-center justify-center flex-col mt-6">
        <img :src="posts[0].userAvatar" alt="User Avatar" class="w-40 h-40 rounded-full" />
        <p class="font-semibold text-mainText text-2xl mr-3 py-3 mb-2">@ {{ posts[0].username }}</p>
      </div>
    </div>
    <div>
      <!-- Show loading spinner while data is being fetched -->
      <div v-if="isLoading" class="flex justify-center items-center mt-32 mb-32">
        <img src="@/assets/img/pageloading.gif" style="width: 21rem; height: 12rem; padding: 1rem;" />
      </div>

      <!-- Show "nothing here" image if no posts are available and loading is complete -->
      <div v-else-if="posts.length === 0" class="flex justify-center items-center mt-32 mb-32">
        <img src="@/assets/img/nothinghere.png" style="width: 11rem;height: 12rem;" />
      </div>

      <div v-else>
        <PostComponent v-for="post in posts" :key="post.id" :post="post" @like-post="handleLikePost" />
      </div>
    </div>
  </div>
</template>

<script>
import PostComponent from "@/components/Post/Post.vue";

import { getAllCreatedPostByUserID, likeorUnlike } from "@/service/apiProviderPost"

export default {
  components: {
    PostComponent,
  },
  data() {
    return {
      posts: [
        // {
        //   id: 1,
        //   userAvatar: require('@/assets/img/team-1-800x800.jpg').default,
        //   username: "@Username1",
        //   date: "2024.04.05",
        //   title: "Doggy",
        //   description: "• Affectionate feline\n• Playful",
        //   images: [require('@/assets/img/sketch.jpg').default, require('@/assets/img/team-2-800x800.jpg').default, require('@/assets/img/sketch.jpg').default, require('@/assets/img/sketch.jpg').default, require('@/assets/img/sketch.jpg').default, require('@/assets/img/sketch.jpg').default],
        //   isliked: true,
        //   duration: "21 months",
        // },
        // {
        //   id: 2,
        //   userAvatar: require('@/assets/img/team-1-800x800.jpg').default,
        //   username: "@Username1",
        //   date: "2024.04.05",
        //   title: "Mimi",
        //   description: "• Affectionate feline\n• Playful",
        //   images: [require('@/assets/img/sketch.jpg').default, require('@/assets/img/team-2-800x800.jpg').default],
        //   isliked: false,
        //   duration: "12 min",
        // },
      ],

      userID: this.$route.query.postID,

      isLoading: true,
    };
  },
  mounted() {
    this.getAllCreatedPostApi()
  },
  methods: {
    async handleLikePost(postId) {
      const post = this.posts.find(p => p.id === postId);

      if (post) {
        // Optimistically update the UI
        const originalIsLiked = post.isliked;
        post.isliked = !post.isliked;
        post.likeCount += post.isliked ? 1 : -1;

        // Make the API call
        const result = await likeorUnlike(postId);

        // Revert if the API call fails
        if (!result) {
          post.isliked = originalIsLiked;
          post.likeCount += post.isliked ? 1 : -1;
        }
      }
    },
    async getAllCreatedPostApi() {
      this.getList = await getAllCreatedPostByUserID(this.userID);

      for (let i = 0; i < this.getList.length; i++) {
        this.posts.push({
          id: this.getList[i]["postId"],
          userid: this.userID,
          userAvatar: this.getList[i]["author"]["userAvatar"],
          username: this.getList[i]["author"]["firstName"] + " " + this.getList[i]["author"]["lastName"],
          date: new Date(this.getList[i]["createdDate"]).toISOString().split('T')[0],
          title: this.getList[i]["isAdoption"] ? this.getList[i]["strayPost"]["name"] : this.getList[i]["content"],
          description: this.getList[i]["isAdoption"] ? this.getList[i]["strayPost"]["behaviour"] : "",
          images: this.getList[i]["isAdoption"] ? [this.getList[i]["strayPost"]["mainPicture"]] : this.getList[i]["picture"],
          isliked: this.getList[i]["isLiked"],
          likeCount: this.getList[i]["likeCount"],
          commentCount: this.getList[i]["commentCount"],
          duration: this.getList[i]["duration"],

          isVaccinated: this.getList[i]["isAdoption"] ? this.getList[i]["strayPost"]["isVaccinated"] : "",
          isDewormed: this.getList[i]["isAdoption"] ? this.getList[i]["strayPost"]["isDewormed"] : "",
        });
      }

      console.log(this.posts)

      this.isLoading = false
    },
  },
};
</script>

<style>
/* Add any global styles here */
</style>