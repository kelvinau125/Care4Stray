<template>
  <div>
    <div class="flex mb-4 bg-secondTheme px-4 py-2 rounded-lg">
      <img :src="userAvatar" alt="User Avatar" class="w-12 h-12 rounded-full mr-4" />
      <input v-model="newComment" type="text" placeholder="Reply the post..."
        class="flex-grow p-2 border-none inputfield-color" @keyup.enter="addComment()" />
      <button @click="addComment" class="text-white text-2xl rounded-r-lg">
        <i class="fas fa-paper-plane"></i>
      </button>
    </div>

    <div v-for="comment in comments" :key="comment.id"
      class="flex mb-2 bg-mainTheme p-4 rounded-lg justify-between items-start">
      <div class="flex">
        <img :src="comment.avatar" alt="User Avatar" class="w-12 h-12 rounded-full mr-4" />
        <div>
          <p class="font-semibold">@{{ comment.username }}</p>
          <p>{{ comment.text }}</p>
        </div>
      </div>
      <span class="text-gray-600 text-sm ml-auto">12 min</span>
    </div>

  </div>
</template>

<script>
// get user cookie
import VueCookies from 'vue-cookies';

import { getUserInfo } from "@/service/apiProviderAuth.js";
import { getCommentList, commentPost } from '@/service/apiProviderPost';

export default {
  name: "CommentComponent",
  data() {
    return {
      username: "",
      userAvatar: "https://res.cloudinary.com/dfmnw3bin/image/upload/v1722330239/default_avatar.jpg",
      newComment: "",
      comments: [
        // { id: 1, username: "Username2", avatar: require('@/assets/img/team-1-800x800.jpg').default, text: "This cat so kewtttttttttttttt!!! Come to mommyyyyyyyy" },
        // { id: 2, username: "Username3", avatar: require('@/assets/img/team-1-800x800.jpg').default, text: "Ewww watery mouth doggy" },
        // { id: 3, username: "Username2", avatar: require('@/assets/img/team-1-800x800.jpg').default, text: "This cat so kewtttttttttttttt!!! Come to mommyyyyyyyy" },
        // { id: 4, username: "Username3", avatar: require('@/assets/img/team-1-800x800.jpg').default, text: "Ewww watery mouth doggy" },
        // { id: 5, username: "Username2", avatar: require('@/assets/img/team-1-800x800.jpg').default, text: "This cat so kewtttttttttttttt!!! Come to mommyyyyyyyy" },
        // { id: 6, username: "Username3", avatar: require('@/assets/img/team-1-800x800.jpg').default, text: "Ewww watery mouth doggy" },
      ],

      postID: this.$route.query.postID,
    };
  },
  mounted() {
    this.getUserInfoApi()
    this.getCommentApi()
  },
  methods: {
    async getUserInfoApi() {
      const result = await getUserInfo(VueCookies.get('email'));

      this.username = result.firstName + " " + result.lastName;
      this.userAvatar = result.userAvatar;
    },
    async addComment() {
      const result = await commentPost(this.postID, this.newComment);

      if (result) {
        this.comments.unshift({
          id: this.comments.length + 1,
          username: this.username,
          avatar: this.userAvatar,
          text: this.newComment
        });
        this.newComment = "";

      }
    },
    async getCommentApi() {
      this.getList = await getCommentList(this.postID);

      for (let i = 0; i < this.getList.length; i++) {
        this.comments.push({
          id: i + 1,
          username: this.getList[i]["user"]["firstName"] + " " + this.getList[i]["user"]["lastName"],
          avatar: this.getList[i]["user"]["userAvatar"],
          text: this.getList[i]["comment"],
        });
      }
    },
  }
};
</script>

<style scoped>
.inputfield-color {
  background-color: rgba(220, 226, 208, 1);
  opacity: 0.5;
}
</style>