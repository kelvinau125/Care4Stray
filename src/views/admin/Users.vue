<template>
    <div class="flex flex-wrap mt-4">
      <div class="w-full mb-12 px-4">
        <UsersTable />
      </div>
    </div>
  </template>
  <script>
  import UsersTable from "@/components/Cards/UsersTable.vue";
  
  export default {
    components: {
      UsersTable,
    },
  };
  </script>
  