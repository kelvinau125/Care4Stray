<template>
  <div>
    <div class="w-full px-3 bg-secondaryMain">
      <NewsList />
    </div>
  </div>
</template>
<script>
import NewsList from "@/components/News/NewsList.vue";

export default {
  name: "news-details",
  components: {
    NewsList,
  },
};
</script>
