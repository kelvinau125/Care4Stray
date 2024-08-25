<template>
  <div class="p-4">
    <div v-for="application in applications" :key="application.id"
      class="border border-gray-300 p-4 mb-4 rounded-lg flex items-start space-x-4 cursor-pointer"
      @click="toApplicationDetails(application.id)">
      <img :src="application.image" alt="Application Image" class="md:w-4/12 xl:w-3/12 md:h-auto rounded-lg" />
      <div class="flex-1">
        <div class="flex justify-between">
          <div class="items-start space-y-1">
            <p><strong>Name:</strong> {{ application.name }}</p>
            <p><strong>Gender:</strong> {{ application.gender }}</p>
            <p><strong>Age:</strong> {{ application.age }} months</p>
            <p><strong>Behavior:</strong></p>
            <ul class="list-disc pl-20">
              <li v-for="behavior in application.behaviors" :key="behavior">{{ behavior }}</li>
            </ul>
            <p><strong>Application Date:</strong> {{ application.date }}</p>
          </div>
          <span :class="{
            'text-yellow-500': application.status === 'PENDING',
            'text-red-500': application.status === 'FAILED',
            'text-green-500': application.status === 'APPROVED',
          }">
            {{ application.status }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllApplicationList } from '../../service/apiProviderAdoption';

export default {
  data() {
    return {
      applications: [
        // {
        //   id: 1,
        //   image: require('@/assets/img/team-1-800x800.jpg').default,
        //   name: 'Doggy',
        //   gender: 'Female',
        //   age: 21,
        //   behaviors: [
        //     'Affectionate feline',
        //     'Good with human',
        //     'Good for Beginner Adopter',
        //     'Good with other pets',
        //   ],
        //   date: '1/7/2024',
        //   status: 'Pending',
        // },
        // {
        //   id: 2,
        //   image: require('@/assets/img/team-1-800x800.jpg').default,
        //   name: 'Doggy',
        //   gender: 'Female',
        //   age: 21,
        //   behaviors: [
        //     'Affectionate feline',
        //     'Good with human',
        //     'Good for Beginner Adopter',
        //     'Good with other pets',
        //   ],
        //   date: '1/7/2024',
        //   status: 'Failed',
        // },
        // {
        //   id: 3,
        //   image: require('@/assets/img/team-1-800x800.jpg').default,
        //   name: 'Doggy',
        //   gender: 'Female',
        //   age: 21,
        //   behaviors: [
        //     'Affectionate feline',
        //     'Good with human',
        //     'Good for Beginner Adopter',
        //     'Good with other pets',
        //   ],
        //   date: '1/7/2024',
        //   status: 'Approved',
        // },
      ],
    };
  },
  mounted() {
    this.getAllCreatedPostApi()
  },
  methods: {
    async getAllCreatedPostApi() {
      this.getList = await getAllApplicationList();

      for (let i = 0; i < this.getList.length; i++) {
        this.applications.push({
          id: this.getList[i]["adoptionId"],
          image: this.getList[i]["stray"]["mainPicture"],
          name: this.getList[i]["stray"]["name"],
          gender: this.getList[i]["stray"]["gender"],
          age: this.getList[i]["stray"]["age"],
          behaviors: this.getList[i]["stray"]["behaviour"],
          vaccined: this.getList[i]["stray"]["isVaccinated"],
          dewormed: this.getList[i]["stray"]["isDewormed"],
          date: new Date(this.getList[i]["applicationDate"]).toISOString().split('T')[0],
          status: this.getList[i]["stray"]["status"],
        });
      }
    },

    toApplicationDetails(id) {
      // Push
      this.$router.push({
        path: '/user/applicationdetails',
        query: {
          applicationID: id,
        },
      });
    },
  },
};
</script>

<style scoped>
/* Additional scoped styles can go here if needed */
</style>