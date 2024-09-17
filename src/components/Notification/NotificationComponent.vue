<template>
  <div class="border border-gray-300 p-4 mb-4 rounded-lg">
    <div class="flex items-center">
      <img :src="post.userAvatar" alt="User Avatar" class="w-12 h-12 rounded-full mr-4" />

      <div class="text-sm flex-1">
        <p class="font-semibold">{{ post.username }}</p>
        <p class="text-gray-500">{{ post.details }}</p>
      </div>

      <span class="text-gray-600 text-sm self-start ml-auto">{{ post.duration }}</span>
    </div>

  </div>
</template>

<script>
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
    };
  },
};
</script>