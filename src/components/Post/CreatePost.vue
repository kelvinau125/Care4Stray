<template>
  <div class="border border-gray-300 px-4 pt-4 pb-2 mb-4 rounded-lg flex flex-row bg-secondTheme">
    <div class="flex items-start justify-between">
      <img :src="avatar" alt="User Avatar" class="w-12 h-12 rounded-full mr-4" />
    </div>
    
    <div class="flex flex-col justify-between w-full">
      <textarea placeholder="Share something to the community..." class="placeholder-black h-24 border-none bg-secondTheme"></textarea>
      <div class="flex items-center justify-between mt-6">
        <label for="file-upload">
          <i class="fas fa-image text-4xl text-mainText cursor-pointer"></i>
          <input id="file-upload" type="file" accept="image/*" @change="handleFileChange" class="hidden" />
        </label>
        <div>
          <button
            class="bg-secondaryMain text-mainText active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            @click="postContent">
            Post
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      avatar: require("@/assets/img/team-1-800x800.jpg").default,
      selectedFile: null,
    };
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        if (file.size > 20 * 1024 * 1024) {
          alert("File size exceeds 20MB. Please choose a smaller file.");
          return;
        }
        // Add further validation for file type if needed
        this.selectedFile = file;
        console.log("Selected file:", this.selectedFile);
      }
    },
    postContent() {
      // Logic to post content including selected file
      console.log("Posting content with file:", this.selectedFile);
    },
  },
};
</script>

<style scoped>
/* Additional scoped styles can go here if needed */
</style>
