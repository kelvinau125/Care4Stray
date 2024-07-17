<template>
  <div>
    <NewsContent />
    <NewsFooter />
  </div>
</template>

<script>
import NewsContent from "@/components/News/NewsContent.vue";
import NewsFooter from "@/components/News/NewsFooter.vue";

export default {
  components: {
    NewsContent,
    NewsFooter,
  },
};
</script>
