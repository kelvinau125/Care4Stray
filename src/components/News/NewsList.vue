<template>
  <!-- Show loading spinner while data is being fetched -->
  <div v-if="isLoading" class="flex justify-center items-center mt-32 mb-32">
    <img src="@/assets/img/pageloading.gif" style="width: 12rem;height: 12rem;" />
  </div>

  <!-- Show "nothing here" image if no posts are available and loading is complete -->
  <div v-else-if="items.length === 0" class="flex justify-center items-center mt-32 mb-32">
    <img src="@/assets/img/nothinghere.png" style="width: 11rem;height: 12rem;" />
  </div>

  <!-- Display posts if available -->
  <div v-else>
    <div class="relative w-full flex-grow mb-4">
      <div>
        <div v-for="(item, index) in paginatedItems" :key="index" class="mb-4">
          <div class="border p-4 rounded-lg shadow-lg flex" @click="toNewsDetails(item.id)">

            <div class="mr-5 flex items-center justify-center">
              <img :src="item.image" alt="picture" class="md:w-4/5 xl:w-4/5 md:h-auto rounded-md"
                style="width: 203px; height: 203px; margin: 12px;">
            </div>

            <div class="w-4/5 flex flex-col justify-between">
              <div>
                <h2 class="text-xl font-bold mb-2">{{ item.title }}</h2>
                <p class="truncate-2-lines">{{ item.description }}</p>
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
  </div>

</template>

<script>
import { getNewsList } from '@/service/apiProviderNews';

export default {
  data() {
    return {
      items: [
        // {
        //   id: 2,
        //   image: require('@/assets/img/sketch.jpg').default,
        //   title: "Rescued dog 'trapped for several days' down well",
        //   description: "A dog rescued from a well had been trapped for several days and was 'giving up' in front of his rescuers' eyes, it has emerged.",
        //   author: "Federica Bedendo",
        //   date: "2 days ago",
        // },
        // {
        //   id: 2,
        //   image: require('@/assets/img/sketch.jpg').default,
        //   title: "Rescued dog 'trapped for several days' down well",
        //   description: "A dog rescued from a well had been trapped for several days and was 'giving up' in front of his rescuers' eyes, it has emerged.",
        //   author: "Federica Bedendo",
        //   date: "2 days ago",
        // },
      ],
      currentPage: 1,
      itemsPerPage: 5,
      
      isLoading: true,
    };
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

  mounted() {
    this.generateNewsLists()
  },

  methods: {
    async generateNewsLists() {
      this.getNewsList = await getNewsList();
      for (let i = 0; i < this.getNewsList.length; i++) {
        this.items.push({
          id: this.getNewsList[i]["id"],
          image: this.getNewsList[i]["pic"],
          title: this.getNewsList[i]["title"],
          description: this.getNewsList[i]["content"],
          author: this.getNewsList[i]["author"],
          date: this.getNewsList[i]["duration"],
        });
      }

      this.isLoading = false;
    },

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
    },


  },
};
</script>

<style scoped>
.truncate-2-lines {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>