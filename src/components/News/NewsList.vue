<template>
    <div class="relative w-full flex-grow mb-4">
      <div>
        <p class="text-lg font-bold py-4" v-if="isNewsDetails">More</p>
        <div v-for="(item, index) in paginatedItems" :key="index" class="mb-4">
          <div class="border p-4 rounded-lg shadow-lg flex" 
          :class="{ 'bg-mainTheme': !isNewsDetails, '': isNewsDetails }"
          @click="toNewsDetails(item.id)">
            <div class="w-full mr-5 flex items-center justify-center">
              <img :src="item.image" alt="picture" class="md:w-4/5 xl:w-5/12 md:h-auto rounded-md">
            </div>
            <div class="flex flex-col justify-between">
              <div>
                <h2 class="text-xl font-bold mb-2">{{ item.title }}</h2>
                <p>{{ item.description }}</p>
              </div>
              <div class="flex justify-between">
                <p class="text-sm text-gray-600">{{ item.author }}</p>
                <p class="text-sm text-gray-600">{{ item.date }}</p>
              </div>
            </div>
          </div>
        </div>
  
        <div class="flex justify-center space-x-2 mt-6">
          <button v-for="page in totalPages" :key="page" @click="goToPage(page)" :class="{
            'px-3 py-1 border-2 border-mainTheme rounded-full': true,
            'bg-mainTheme text-white': currentPage === page,
            'bg-white text-mainTheme': currentPage !== page
          }">
            {{ page }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        items: [
          {
            id: 1,
            image: require('@/assets/img/team-1-800x800.jpg').default,
            title: "Rescued dog 'trapped for several days' down well",
            description: "A dog rescued from a well had been trapped for several days and was 'giving up' in front of his rescuers' eyes, it has emerged.",
            author: "Federica Bedendo",
            date: "2 days ago",
          },
          {
            id: 2,
            image: require('@/assets/img/team-2-800x800.jpg').default,
            title: "Rescued dog 'trapped for several days' down well",
            description: "A dog rescued from a well had been trapped for several days and was 'giving up' in front of his rescuers' eyes, it has emerged.",
            author: "Federica Bedendo",
            date: "2 days ago",
          },
          {
            id: 2,
            image: require('@/assets/img/team-4-470x470.png').default,
            title: "Rescued dog 'trapped for several days' down well",
            description: "A dog rescued from a well had been trapped for several days and was 'giving up' in front of his rescuers' eyes, it has emerged.",
            author: "Federica Bedendo",
            date: "2 days ago",
          },
          {
            id: 2,
            image: require('@/assets/img/sketch.jpg').default,
            title: "Rescued dog 'trapped for several days' down well",
            description: "A dog rescued from a well had been trapped for several days and was 'giving up' in front of his rescuers' eyes, it has emerged.",
            author: "Federica Bedendo",
            date: "2 days ago",
          },
          {
            id: 2,
            image: require('@/assets/img/sketch.jpg').default,
            title: "Rescued dog 'trapped for several days' down well",
            description: "A dog rescued from a well had been trapped for several days and was 'giving up' in front of his rescuers' eyes, it has emerged.",
            author: "Federica Bedendo",
            date: "2 days ago",
          },
          {
            id: 2,
            image: require('@/assets/img/sketch.jpg').default,
            title: "Rescued dog 'trapped for several days' down well",
            description: "A dog rescued from a well had been trapped for several days and was 'giving up' in front of his rescuers' eyes, it has emerged.",
            author: "Federica Bedendo",
            date: "2 days ago",
          },
          {
            id: 2,
            image: require('@/assets/img/team-1-800x800.jpg').default,
            title: "Rescued dog 'trapped for several days' down well",
            description: "A dog rescued from a well had been trapped for several days and was 'giving up' in front of his rescuers' eyes, it has emerged.",
            author: "Federica Bedendo",
            date: "2 days ago",
          },
          {
            id: 2,
            image: require('@/assets/img/team-2-800x800.jpg').default,
            title: "Rescued dog 'trapped for several days' down well",
            description: "A dog rescued from a well had been trapped for several days and was 'giving up' in front of his rescuers' eyes, it has emerged.",
            author: "Federica Bedendo",
            date: "2 days ago",
          },
          {
            id: 2,
            image: require('@/assets/img/team-4-470x470.png').default,
            title: "Rescued dog 'trapped for several days' down well",
            description: "A dog rescued from a well had been trapped for several days and was 'giving up' in front of his rescuers' eyes, it has emerged.",
            author: "Federica Bedendo",
            date: "2 days ago",
          },
          {
            id: 2,
            image: require('@/assets/img/sketch.jpg').default,
            title: "Rescued dog 'trapped for several days' down well",
            description: "A dog rescued from a well had been trapped for several days and was 'giving up' in front of his rescuers' eyes, it has emerged.",
            author: "Federica Bedendo",
            date: "2 days ago",
          },
          {
            id: 2,
            image: require('@/assets/img/sketch.jpg').default,
            title: "Rescued dog 'trapped for several days' down well",
            description: "A dog rescued from a well had been trapped for several days and was 'giving up' in front of his rescuers' eyes, it has emerged.",
            author: "Federica Bedendo",
            date: "2 days ago",
          },
          {
            id: 2,
            image: require('@/assets/img/sketch.jpg').default,
            title: "Rescued dog 'trapped for several days' down well",
            description: "A dog rescued from a well had been trapped for several days and was 'giving up' in front of his rescuers' eyes, it has emerged.",
            author: "Federica Bedendo",
            date: "2 days ago",
          },
          {
            id: 2,
            image: require('@/assets/img/team-1-800x800.jpg').default,
            title: "Rescued dog 'trapped for several days' down well",
            description: "A dog rescued from a well had been trapped for several days and was 'giving up' in front of his rescuers' eyes, it has emerged.",
            author: "Federica Bedendo",
            date: "2 days ago",
          },
          {
            id: 2,
            image: require('@/assets/img/team-2-800x800.jpg').default,
            title: "Rescued dog 'trapped for several days' down well",
            description: "A dog rescued from a well had been trapped for several days and was 'giving up' in front of his rescuers' eyes, it has emerged.",
            author: "Federica Bedendo",
            date: "2 days ago",
          },
          {
            id: 2,
            image: require('@/assets/img/team-4-470x470.png').default,
            title: "Rescued dog 'trapped for several days' down well",
            description: "A dog rescued from a well had been trapped for several days and was 'giving up' in front of his rescuers' eyes, it has emerged.",
            author: "Federica Bedendo",
            date: "2 days ago",
          },
          {
            id: 2,
            image: require('@/assets/img/sketch.jpg').default,
            title: "Rescued dog 'trapped for several days' down well",
            description: "A dog rescued from a well had been trapped for several days and was 'giving up' in front of his rescuers' eyes, it has emerged.",
            author: "Federica Bedendo",
            date: "2 days ago",
          },
          {
            id: 2,
            image: require('@/assets/img/sketch.jpg').default,
            title: "Rescued dog 'trapped for several days' down well",
            description: "A dog rescued from a well had been trapped for several days and was 'giving up' in front of his rescuers' eyes, it has emerged.",
            author: "Federica Bedendo",
            date: "2 days ago",
          },
          {
            id: 2,
            image: require('@/assets/img/sketch.jpg').default,
            title: "Rescued dog 'trapped for several days' down well",
            description: "A dog rescued from a well had been trapped for several days and was 'giving up' in front of his rescuers' eyes, it has emerged.",
            author: "Federica Bedendo",
            date: "2 days ago",
          },
        ],
        currentPage: 1,
        itemsPerPage: "",
        isNewsDetails: "",
        
      };
    },

    mounted() {
      if (this.$route.path === '/user/newsdetails') {
        this.isNewsDetails = true;
        this.itemsPerPage = 3;
      }
      else {
        this.isNewsDetails = false;
        this.itemsPerPage = 5;
      }
    },
  
    computed: {
      totalPages() {
        return Math.ceil(this.items.length / this.itemsPerPage);
      },
      paginatedItems() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.items.slice(start, end);
      }, 

    },
  
    methods: {
      goToPage(page) {
        this.currentPage = page;
        this.scrollToTop();
      },
      scrollToTop() {
        // Scroll to top without smooth animation
        window.scrollTo(0, 0);
      },
      toNewsDetails(id) {
        this.$router.push({
        path: '/user/newsdetails',
        query: {
          newsID: id,
        },
      });
      }
    },
  };
  </script>
  