<template>
    <div class="flex flex-wrap mt-4">
      <div class="w-full mb-12 px-4">
        <NewsTable />
      </div>
    </div>
  </template>
  <script>
  import NewsTable from "@/components/Cards/NewsTable.vue";
  
  export default {
    components: {
        NewsTable,
    },
  };
  </script>
  