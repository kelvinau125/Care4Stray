<template>
    <div class="flex flex-wrap mt-4">
      <div class="w-full mb-12 px-4">
        <StrayAdoptionTable />
      </div>
    </div>
  </template>
  <script>
  import StrayAdoptionTable from "@/components/Cards/StrayAdoptionTable.vue";
  
  export default {
    components: {
        StrayAdoptionTable,
    },
  };
  </script>
  