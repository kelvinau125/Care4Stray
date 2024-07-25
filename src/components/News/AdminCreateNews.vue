<template>
    <div class="w-full mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">Create News Article</h2>
      
      <!-- Title -->
      <div class="mb-4">
        <label for="title" class="block text-gray-700 font-bold mb-2">Title</label>
        <input
          type="text"
          id="title"
          v-model="news.title"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter the title"
        />
      </div>
      
      <!-- Author -->
      <div class="mb-4">
        <label for="author" class="block text-gray-700 font-bold mb-2">Author</label>
        <input
          type="text"
          id="author"
          v-model="news.author"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter the author's name"
        />
      </div>
      
      <!-- Image or Video Uploader -->
      <div class="mb-4">
        <label for="media" class="block text-gray-700 font-bold mb-2">Image or Video</label>
        <input
          type="file"
          id="media"
          @change="handleFileUpload"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
  
      <!-- Preview uploaded media -->
      <div v-if="previewUrl" class="mb-4">
        <img v-if="isImage" :src="previewUrl" alt="Preview" class="w-full h-auto mb-2 rounded-lg shadow-md" />
        <video v-if="isVideo" :src="previewUrl" controls class="w-full h-auto mb-2 rounded-lg shadow-md"></video>
      </div>
      
      <!-- Details -->
      <div class="mb-4">
        <label for="details" class="block text-gray-700 font-bold mb-2">Details</label>
        <textarea
          id="details"
          v-model="news.details"
          rows="5"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter the details"
        ></textarea>
      </div>
      
      <!-- Submit Button -->
      <div class="flex justify-end">
        <button
          @click="submitNews"
          class="px-4 py-2 bg-emerald-500 text-white font-bold rounded-lg shadow-md hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create News
        </button>
      </div>
    </div>
  </template>
  
  <script>
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
        isImage: false,
        isVideo: false,
      };
    },
    methods: {
      handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
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
      submitNews() {
        // Handle news submission logic here, e.g., send the news data to a server
        console.log('News submitted:', this.news);
        // Reset form
        this.news.title = '';
        this.news.author = '';
        this.news.media = null;
        this.news.details = '';
        this.previewUrl = null;
        this.isImage = false;
        this.isVideo = false;
      },
    },
  };
  </script>
  
  