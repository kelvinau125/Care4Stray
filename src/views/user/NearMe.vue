<template>
  <div>
    <div>
      <CreatePostComponent />
    </div>
    <div>
      <PostComponent v-for="post in posts" :key="post.id" :post="post" @like-post="handleLikePost" />
    </div>
  </div>
</template>

<script>
import PostComponent from "@/components/Post/Post.vue";
import CreatePostComponent from "@/components/Post/CreatePost.vue";

import { getAllCreatedPost } from "@/service/apiProviderPost";

export default {
  components: {
    PostComponent,
    CreatePostComponent,
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

      getList: [] 
    };
  },
  mounted() {
    this.getAllCreatedPostApi()
  },
  methods: {
    handleLikePost(postId) {
      console.log(`Liked post with ID: ${postId}`);
    },
    async getAllCreatedPostApi() {
      this.getList = await getAllCreatedPost();

      for (let i = 0; i < this.getList.length; i++) {
        this.posts.push({
          id: this.getList[i]["postId"],
          userAvatar: this.getList[i]["author"]["userAvatar"],
          username: this.getList[i]["author"]["firstName"] + " " + this.getList[i]["author"]["lastName"],
          date: new Date(this.getList[i]["createdDate"]).toISOString().split('T')[0],
          title: this.getList[i]["content"],
          description: this.getList[i]["content"],
          images: this.getList[i]["picture"],
          isliked: this.getList[i]["isLiked"],
          likeCount: this.getList[i]["likeCount"],
          commentCount: this.getList[i]["commentCount"],
          duration: "12 min",
        });
      }
    },
  },
};
</script>

<style>
/* Add any global styles here */
</style>