<template>
    <div class="flex flex-wrap mt-4">
      <div class="w-full mb-12 px-4">
        <NotificationTable />
      </div>
    </div>
  </template>
  <script>
  import NotificationTable from "@/components/Cards/NotificationTable.vue";
  
  export default {
    components: {
        NotificationTable,
    },
  };
  </script>
  