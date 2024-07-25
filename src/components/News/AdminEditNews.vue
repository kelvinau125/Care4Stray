<template>
  <div class="w-full mx-auto p-4 bg-white rounded-lg shadow-lg">
    <div class="flex justify-between">
      <div>
        <h2 class="text-2xl font-semibold text-gray-800 mb-6 pt-2">Edit News Article</h2>
      </div>

      <div class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap pt-4">
        <i :class="['fas fa-circle', statusColor(news.status), 'mr-2']"></i>
        {{ news.status }}
      </div>
    </div>

    <!-- Date -->
    <div class="mb-4">
      <label for="date" class="block text-gray-700 font-bold mb-2">Date</label>
      <input type="text" id="date" v-model="news.date"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled />
    </div>

    <!-- Title -->
    <div class="mb-4">
      <label for="title" class="block text-gray-700 font-bold mb-2">Title</label>
      <input type="text" id="title" v-model="news.title"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter the title" />
    </div>

    <!-- Author -->
    <div class="mb-4">
      <label for="author" class="block text-gray-700 font-bold mb-2">Author</label>
      <input type="text" id="author" v-model="news.author"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter the author's name" />
    </div>

    <!-- Image or Video Uploader -->
    <div class="mb-4">
      <label for="media" class="block text-gray-700 font-bold mb-2">Image or Video</label>
      <input type="file" id="media" @change="handleFileUpload"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
        placeholder="Enter the details"></textarea>
    </div>

    <!-- Submit Button -->
    <div class="flex justify-end">
      <button @click="submitNews"
        class="px-4 py-2 bg-emerald-500 text-white font-bold rounded-lg shadow-md hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Update News
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      news: {
        date: '2024/1/15',
        title: 'Hallo',
        author: 'Hallo Kitty',
        media: null,
        details: 'Hallo Kitty Hallo Kitty Hallo Kitty Hallo Kitty Hallo Kitty Hallo Kitty Hallo Kitty Hallo Kitty',
        status: "inactive",
      },

      previewUrl: null,
      isImage: false,
      isVideo: false,
    };
  },
  methods: {
    statusColor(status) {
      switch (status) {
        case 'active':
          return 'text-emerald-500';
        case 'inactive':
          return 'text-red-500';
        default:
          return 'text-gray-500';
      }
    },

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