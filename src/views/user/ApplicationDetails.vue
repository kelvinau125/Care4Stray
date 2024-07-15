<template>
    <div class="p-4">
      <div
        class="border border-gray-300 p-4 mb-4 rounded-lg flex items-center space-x-4"
      >
        <img :src="application.image" alt="Application Image" class="md:w-4/12 xl:w-3/12 md:h-auto rounded-lg" />
        <div class="flex-1">
          <div class="flex justify-between">
            <div class="items-center">
              <p><strong>Name:</strong> {{ application.name }}</p>
              <p><strong>Gender:</strong> {{ application.gender }}</p>
              <p><strong>Age:</strong> {{ application.age }} months</p>
              <p><strong>Behavior:</strong></p>
              <ul class="list-disc pl-10">
                <li v-for="behavior in application.behaviors" :key="behavior">{{ behavior }}</li>
              </ul>
              <p><strong>Application Date:</strong> {{ application.date }}</p>
            </div>
            <span
              :class="{
                'text-yellow-500': application.status === 'Pending',
                'text-red-500': application.status === 'Failed',
                'text-green-500': application.status === 'Approved',
              }"
            >
              {{ application.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        applications: 
          {
            id: 1,
            image: require('@/assets/img/team-1-800x800.jpg').default,
            name: 'Doggy',
            gender: 'Female',
            age: 21,
            behaviors: [
              'Affectionate feline',
              'Good with human',
              'Good for Beginner Adopter',
              'Good with other pets',
            ],
            date: '1/7/2024',
            status: 'Pending',
          },
      };
    },
  };
  </script>
  
  <style scoped>
  /* Additional scoped styles can go here if needed */
  </style>
  