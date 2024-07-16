<template>
    <div>
      <div class="flex mb-4 bg-secondTheme px-4 py-2 rounded-lg">
        <img :src="userAvatar" alt="User Avatar" class="w-12 h-12 rounded-full mr-4" />
        <input 
          v-model="newComment" 
          type="text" 
          placeholder="Reply the post..." 
          class="flex-grow p-2 border-none inputfield-color" 
        />
        <button @click="addComment" class="text-white text-2xl rounded-r-lg">
            <i class="fas fa-paper-plane"></i>
        </button>
      </div>

      <div v-for="comment in comments" :key="comment.id" class="flex mb-2 bg-mainTheme p-4 rounded-lg">
        <img :src="comment.avatar" alt="User Avatar" class="w-12 h-12 rounded-full mr-4" />
        <div>
          <p class="font-semibold">@{{ comment.username }}</p>
          <p>{{ comment.text }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "CommentComponent",
    data() {
      return {
        userAvatar: require('@/assets/img/team-2-800x800.jpg').default,
        newComment: "",
        comments: [
          { id: 1, username: "Username2", avatar:  require('@/assets/img/team-1-800x800.jpg').default, text: "This cat so kewtttttttttttttt!!! Come to mommyyyyyyyy" },
          { id: 2, username: "Username3", avatar:  require('@/assets/img/team-1-800x800.jpg').default, text: "Ewww watery mouth doggy" },
          { id: 3, username: "Username2", avatar:  require('@/assets/img/team-1-800x800.jpg').default, text: "This cat so kewtttttttttttttt!!! Come to mommyyyyyyyy" },
          { id: 4, username: "Username3", avatar:  require('@/assets/img/team-1-800x800.jpg').default, text: "Ewww watery mouth doggy" },
          { id: 5, username: "Username2", avatar:  require('@/assets/img/team-1-800x800.jpg').default, text: "This cat so kewtttttttttttttt!!! Come to mommyyyyyyyy" },
          { id: 6, username: "Username3", avatar:  require('@/assets/img/team-1-800x800.jpg').default, text: "Ewww watery mouth doggy" },
        ]
      };
    },
    methods: {
      addComment() {
        if (this.newComment.trim() !== "") {
          this.comments.push({
            id: this.comments.length + 1,
            username: "NewUser",
            avatar: "https://placekitten.com/52/52",
            text: this.newComment
          });
          this.newComment = "";
        }
      }
    }
  };
  </script>
  
  <style scoped>
.inputfield-color {
    background-color: rgba(220, 226, 208, 1);
    opacity: 0.5;
}
  </style>
  