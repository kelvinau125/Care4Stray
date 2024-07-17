<template>
    <div class="max-w-3xl mx-auto p-6 bg-white">
      <h1 class="text-3xl font-bold mb-4">{{ article.title }}</h1>
      <p class="text-gray-600 mb-2">{{ article.date }}</p>
      <p class="text-gray-600 mb-4">{{ article.author }}</p>
      <img :src="article.imageUrl" :alt="article.imageAlt" class="w-full h-auto mb-6 rounded-lg shadow-lg"/>
      <div v-for="paragraph in article.content" :key="paragraph" class="mb-4 text-gray-800">
        {{ paragraph }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        article: {
          title: "Rescued dog 'trapped for several days' down well",
          date: "24 April 2024",
          author: "Federica Bedendo, BBC News, North East and Cumbria",
          imageUrl: require('@/assets/img/team-2-800x800.jpg').default,
          imageAlt: "The Caucasian Shepherd fell about 15ft (4.5m) into a well at Phoenix Sidings, near Stockton",
          content: [
            "A dog rescued from a well had been trapped for several days and was 'giving up' in front of his rescuers' eyes, it has emerged.",
            "It is believed the Caucasian Shepherd 'accidentally tumbled' 15ft (4.5m) at Phoenix Sidings, Newton, near Stockton, before becoming trapped in the water, Cleveland Fire Brigade said.",
            "Initially it was thought he was a badger due to his grey and white colouring, and those looking after the dog have named him after the animal after he was safely rescued.",
            "An appeal is under way to try and find Badger's owner."
          ]
        }
      };
    }
  };
  </script>
  
  <style scoped>
  </style>
  