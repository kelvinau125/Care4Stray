<template>
  <div>
    <div class="w-full px-3">
      <NewsList />
    </div>
  </div>
</template>
<script>
import NewsList from "@/components/List/NewsList.vue";

export default {
  name: "user-page",
  components: {
    NewsList,
  },
};
</script>
