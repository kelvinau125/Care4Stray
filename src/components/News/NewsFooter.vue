<template>
  <div class="relative w-full flex-grow mb-4">
    <div>
      <p class="text-lg font-bold py-4">More</p>
      <div v-for="(item, index) in paginatedItems" :key="index" class="mb-4">
        <div class="border p-4 rounded-lg shadow-lg flex cursor-pointer md:flex-row flex-col" @click="toNewsDetails(item.id)">

          <div class="mr-5 flex items-center justify-center">
            <!-- <img :src="item.image" alt="picture" class="md:w-4/5 xl:w-4/5 md:h-auto rounded-md"
              style="width: 203px; height: 203px; margin: 12px;"> -->

              <video v-if="isVideo(item.image)" autoplay muted class="md:w-4/5 xl:w-4/5 md:h-auto rounded-md"
                style="width: 250px; height: 203px; margin: 12px;">
                <source :src="item.image" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <img v-else :src="item.image" alt="news" class="md:w-4/5 xl:w-4/5 md:h-auto rounded-md"
                style="width: 250px; height: 203px; margin: 12px;" />
          </div>
          
          <div class="md:w-4/5 w-full  flex flex-col justify-between">
              <div>
                <h2 class="text-xl font-bold mb-2">{{ item.title }}</h2>
                <!-- <p class="truncate-2-lines">{{ item.description }}</p> -->

                <p  v-for="(paragraph, index) in item.description.split('\n').slice(0, 2)" :key="index">
                  {{ paragraph }}
                </p>
              </div>
              <div class="flex justify-between mt-3 md:mt-0">
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
import { getNewsList } from '@/service/apiProviderNews';
import VueCookies from 'vue-cookies';

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
      itemsPerPage: 3,

      isLogin: false,
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

    if (VueCookies.isKey('email')) {
      this.isLogin = true;
    }
  },
  methods: {
    async generateNewsLists() {
      this.getNewsList = await getNewsList();

      // Shuffle the getNewsList array using the Fisher-Yates algorithm
      for (let i = this.getNewsList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.getNewsList[i], this.getNewsList[j]] = [this.getNewsList[j], this.getNewsList[i]];
      }

      // Push shuffled items to the items array
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
      this.currentPage = 1;
      this.$router.push({
        path: (this.isLogin) ? '/user/newsdetails' : '/guestnews',
        query: {
          newsID: id,
        },
      })
    },
    isVideo(url) {
      return url && url.toLowerCase().endsWith('.mp4');
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