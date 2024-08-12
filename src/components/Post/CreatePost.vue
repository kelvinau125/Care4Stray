<template>
  <div>
    <!-- Loading Overlay -->
    <div v-if="alertType === 'waiting'" class="loading-overlay">
    </div>

    <!-- Alert Box -->
    <div class="flex justify-center">
      <div v-if="alertOpen" :class="alertClass" style="margin-top: -100px;">
        <span class="text-xl inline-block mr-5 align-middle">
          <i v-if="alertType !== 'waiting'" class="fas fa-bell"></i>
          <i v-if="alertType === 'waiting'" class="fas fa-spinner"></i>
        </span>
        <span class="inline-block align-middle mr-8">
          <b class="capitalize">{{ alertType }} ! </b> {{ alertMessage }}
        </span>
        <button
          class="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
          @click="closeAlert">
          <span>×</span>
        </button>
      </div>
    </div>

    <div class="border border-gray-300 px-4 pt-4 pb-2 mb-4 rounded-lg flex flex-row bg-secondTheme">
      <div class="flex items-start justify-between">
        <img :src="avatar" alt="User Avatar" class="w-12 h-12 rounded-full mr-4" />
      </div>

      <div class="flex flex-col justify-between w-full">
        <textarea placeholder="Share something to the community..."
          class="placeholder-black h-24 border-none bg-secondTheme" v-model="content"></textarea>
        <div class="flex items-center justify-start pb-2 pt-4 flex-row">
          <div v-for="(image, index) in previewUrl" :key="index" class="relative group inline-block m-2">
            <img :src="image" alt="Stray Image" class="rounded-lg cursor-pointer" style="width: 8rem; height: auto;" />
            <img src="@/assets/img/close.png" @click="removeImage(index)"
              class="absolute w-8 h-8 transform translate-x-2 translate-y-2 opacity-75 group-hover:opacity-100 transition-opacity duration-200 ease-in-out cursor-pointer"
              style="top: -15px; right: -15px;" />
          </div>
          <input type="file" ref="fileInput" class="hidden" @change="handleFileChange" multiple required />
        </div>

        <div class="flex items-center justify-between mt-6">
          <label for="file-upload">
            <i class="fas fa-image text-4xl text-mainText cursor-pointer"></i>
            <input id="file-upload" type="file" accept="image/*" @change="handleFileChange" class="hidden" />
          </label>
          <div>
            <button
              class="bg-secondaryMain text-mainText active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button" @click="postContent">
              Post
            </button>
          </div>
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


      content: "",
      image: [],
      previewUrl: [],

      alertOpen: false,
      alertType: "success",
      alertMessage: "",
    };
  },
  computed: {
    alertClass() {
      return {
        "text-white px-6 py-4 border-0 rounded-full fixed mb-4 z-50 w-6/12": true,
        "bg-orange-500": this.alertType === "waiting",
        "bg-emerald-500": this.alertType === "success",
        "bg-red-500": this.alertType === "error",
      };
    },
  },
  methods: {
    handleFileChange(event) {
      const files = event.target.files;
      if (files.length) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];

          // Check if the file is an image
          if (!file.type.startsWith('image/')) {
            this.alertType = "error";
            this.alertMessage = "Please upload only image files.";
            this.alertOpen = true;
            setTimeout(() => {
              this.alertOpen = false;
            }, 3000); // Close alert after 3 seconds
            continue;
          }

          if (file.size > 20 * 1024 * 1024) {
            this.alertType = "error";
            this.alertMessage = "File size exceeds 20MB. Please choose a smaller file.";
            this.alertOpen = true;
            setTimeout(() => {
              this.alertOpen = false;
            }, 3000); // Close alert after 3 seconds
            return;
          }

          this.image.push(file);

          // Create a URL for the file and add it to the image array
          const imageUrl = URL.createObjectURL(file);
          this.previewUrl.push(imageUrl);
        }
      } else {
        this.previewUrl = [];
      }
    },
    removeImage(index) {
      this.image.splice(index, 1); // Remove the image at the specified index
      this.previewUrl.splice(index, 1); // Remove the image at the specified index
    },
    postContent() {
      // Logic to post content including selected file
      console.log("Posting content with file:", this.selectedFile);
    },
    closeAlert() {
      this.alertOpen = false;
    },
  },
};
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9;
}
</style>
