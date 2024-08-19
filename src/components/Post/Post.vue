<template>
  <div ref="postContainer" class="border border-gray-300 p-4 mb-4 rounded-lg" @click="toPostDetails(post.id)">
    <div class="flex items-center mb-4 justify-between">
      <div class="flex items-center">
        <img :src="post.userAvatar" alt="User Avatar" class="w-12 h-12 rounded-full mr-4" />
        <div class="text-sm">
          <p class="font-semibold">{{ post.username }}</p>
          <p class="text-gray-500">{{ post.date }}</p>
        </div>
      </div>

      <p class="text-gray-700 whitespace-pre-line text-sm mr-2">{{ post.duration }}</p>
    </div>
    <div class="mb-4">
      <h3 class="font-bold text-lg mb-2">{{ post.title }}</h3>
      <p class="text-gray-700 whitespace-pre-line ml-2" v-if="isAdoptionRoute">
        <ul>
          <li v-for="(item, index) in post.description" :key="index">
            • {{ item }}
          </li>
        </ul>
      </p>
      <div class="flex flex-wrap mt-4">
        <div v-for="(image, index) in displayedImages" :key="index" class="relative w-32 h-32 mr-2 mb-2 ">
          <img :src="image" alt="Post Image" class="w-full h-full object-cover rounded-lg" />
          <div v-if="index === displayedImages.length - 1 && remainingImages > 0"
            class="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75 text-gray-700 rounded-lg">
            +{{ remainingImages }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between">
      <div class="flex space-x-4">
        <div @click.stop="likePost" class="flex items-center justify-center cursor-pointer">
          <i :class="['text-2xl', post.isliked ? 'fas fa-heart text-red-500' : 'far fa-heart text-mainText']"></i>
          <span class="ml-2">{{ post.likeCount }}</span>
        </div>

        <div @click="toPostDetails(post.id)" class="flex items-center justify-center cursor-pointer">
          <i class="far fa-comment text-2xl"></i>
          <span class="ml-2">{{ post.commentCount }}</span>
        </div>
      </div>

      <div class="flex space-x-2" v-if="isAdoptionRoute">
        <span class="material-icons" v-if="post.isVaccinated"><img :src="vaccine" alt="vaccine"
            class="w-8 h-8 p-1"></span>
        <span class="material-icons" v-if="post.isDewormed"><img :src="worm" alt="warm" class="w-8 h-8 p-1"></span>
      </div>
    </div>
  </div>
</template>

<script>
import vaccine from "@/assets/img/tabler_vaccine.png";
import worm from "@/assets/img/contrast_worm.png";

export default {
  name: "PostComponent",
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      vaccine,
      worm,

      containerWidth: 0,
      imageWidth: 128, // 32 (width) + 16 (margin-right)
    };
  },
  computed: {
    displayedImages() {
      const imagesPerRow = Math.floor(this.containerWidth / this.imageWidth);
      return this.post.images.slice(0, imagesPerRow);
    },
    remainingImages() {
      const imagesPerRow = Math.floor(this.containerWidth / this.imageWidth);
      return this.post.images.length - imagesPerRow;
    },

    isAdoptionRoute() {
      return this.$route.path.includes('/user/adoption');
    },
  },
  mounted() {
    this.updateContainerWidth();
    window.addEventListener('resize', this.updateContainerWidth);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateContainerWidth);
  },
  methods: {
    updateContainerWidth() {
      this.containerWidth = this.$refs.postContainer.clientWidth;
    },
    likePost() {
      this.$emit("like-post", this.post.id);
    },
    toPostDetails(id) {
      this.$router.push({
        path: '/user/postdetails',
        query: {
          postID: id,
        },
      });
    },
  },
};
</script>

<style scoped>
/* Additional scoped styles can go here if needed */
</style>
