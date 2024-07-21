<template>
    <div class="flex flex-wrap mt-4">
      <div class="w-full mb-12 px-4">
        <AdoptionTable />
      </div>
    </div>
  </template>
  <script>
  import AdoptionTable from "@/components/Cards/AdoptionTable.vue";
  
  export default {
    components: {
        AdoptionTable,
    },
  };
  </script>
  