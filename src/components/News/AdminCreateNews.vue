<template>
  <div class="w-full mx-auto p-4 bg-white rounded-lg shadow-lg">
    <div class="flex justify-center">
      <div v-if="alertOpen" :class="alertClass" style="margin-top: -100px;">
        <span class="text-xl inline-block mr-5 align-middle">
          <i class="fas fa-bell"></i>
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

    <form @submit.prevent="submitNews()">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">Create News Article</h2>

      <!-- Title -->
      <div class="mb-4">
        <label for="title" class="block text-gray-700 font-bold mb-2">Title</label>
        <input type="text" id="title" v-model="news.title"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter the title" required />
      </div>

      <!-- Author -->
      <div class="mb-4">
        <label for="author" class="block text-gray-700 font-bold mb-2">Author</label>
        <input type="text" id="author" v-model="news.author"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter the author's name" required />
      </div>

      <!-- Image or Video Uploader -->
      <div class="mb-4">
        <label for="media" class="block text-gray-700 font-bold mb-2">Image or Video</label>
        <input type="file" id="media" @change="handleFileUpload"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required />
      </div>

      <!-- Preview uploaded media -->
      <div v-if="previewUrl" class="mb-4">
        <img v-if="isImage" :src="previewUrl" alt="Preview" class="w-full h-auto mb-2 rounded-lg shadow-md" />
        <video v-if="isVideo" :src="previewUrl" controls class="w-full h-auto mb-2 rounded-lg shadow-md"></video>
      </div>

      <!-- Details -->
      <div class="mb-4">
        <label for="details" class="block text-gray-700 font-bold mb-2">Details</label>
        <textarea id="details" v-model="news.details" rows="5"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter the details" required></textarea>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-end">
        <button
          class="px-4 py-2 bg-emerald-500 text-white font-bold rounded-lg shadow-md hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="submit">
          Create News
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { createNews } from '@/service/apiProviderNews';

import { uploadImage } from "@/service/apiProviderImage.js";

export default {
  data() {
    return {
      news: {
        title: '',
        author: '',
        media: null,
        details: '',
      },

      previewUrl: null,
      selectedFile: null,
      isImage: false,
      isVideo: false,

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
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const maxSizeInBytes = this.isImage ? 20 * 1024 * 1024 : 80 * 1024 * 1024; // 20MB for images, 80MB for videos
        if (file.size > maxSizeInBytes) {

          this.previewUrl = null;
          this.isImage = false;
          this.isVideo = false;

          this.alertType = "error";
          this.alertMessage = `File size exceeds the maximum allowed size of ${maxSizeInBytes / 1024 / 1024}MB.`;
          this.alertOpen = true;
          setTimeout(() => {
            this.alertOpen = false;
          }, 3000); // Close alert after 3 seconds
          
          return;
        }
        this.news.media = file;
        this.previewUrl = URL.createObjectURL(file);
        this.isImage = file.type.startsWith('image/');
        this.isVideo = file.type.startsWith('video/');
      } else {
        this.previewUrl = null;
        this.isImage = false;
        this.isVideo = false;
      }
    },

    async submitNews() {
      this.alertOpen = true;
      this.alertType = "waiting";
      this.alertMessage = "Please wait, news is updating! ";

      const uploadedImageUrl = await uploadImage(this.news.media, (this.isImage ?"image" :"video"));

      if (uploadedImageUrl.status === 200) {
        this.news.media = uploadedImageUrl.data.url;
        const result = await createNews(this.news);
        if (result) {
          this.alertType = "success";
          this.alertMessage = "news successful created";
          this.alertOpen = true;
          setTimeout(() => {
            this.alertOpen = false;
          }, 3000); // Close alert after 3 seconds

          // Refresh the page
          this.$router.push("/admin/news")
        }
      }
    },
  },
};
</script>