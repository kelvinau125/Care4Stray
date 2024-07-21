<template>
    <div class="flex flex-wrap mt-4">
      <div class="w-full mb-12 px-4">
        <DonationTable />
      </div>
    </div>
  </template>
  <script>
  import DonationTable from "@/components/Cards/DonationTable.vue";
  
  export default {
    components: {
        DonationTable,
    },
  };
  </script>
  