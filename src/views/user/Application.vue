<template>
  <!-- Show loading spinner while data is being fetched -->
  <div v-if="isLoading" class="flex justify-center items-center mt-32 mb-32">
    <img src="@/assets/img/pageloading.gif" style="width: 21rem; height: 12rem; padding: 1rem;" />
  </div>

  <!-- Show "nothing here" image if no posts are available and loading is complete -->
  <div v-else-if="applications.length === 0" class="flex justify-center items-center mt-32 mb-32">
    <img src="@/assets/img/nothinghere.png" style="width: 11rem;height: 12rem;" />
  </div>

  <!-- Display posts if available -->
  <div v-else>
    <div>
      <div class="flex justify-center">
        <div v-if="alertOpen" :class="alertClass">
          <span class="text-xl inline-block mr-5 align-middle">
            <i class="fas fa-bell"></i>
          </span>
          <span class="align-middle mr-8">
            <b class="capitalize">{{ alertType }} ! </b> {{ alertMessage }}
          </span>
          <button
            class="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
            @click="closeAlert">
            <span>×</span>
          </button>
        </div>
      </div>
      <div class="p-4">
        <div v-for="application in applications" :key="application.id"
          class="border border-gray-300 p-4 mb-4 rounded-lg flex flex-col md:flex-row items-start space-x-4 cursor-pointer"
          @click="toApplicationDetails(application.id)">
          <img :src="application.image" alt="Application Image" class="md:w-4/12 xl:w-3/12 md:h-auto rounded-lg" />

          <div class="mt-6 md:mt-0 flex-1">
            <div class="flex justify-between md:flex-row flex-col">
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
                'text-yellow-500': application.status === 'APPLICATION_PENDING',
                'text-red-500': application.status === 'APPLICATION_FAILURE',
                'text-green-500': application.status === 'APPLICATION_SUCCESS',
                'text-orange-500': application.status === 'APPLICATION_CANCELLED',
              }">
                {{ application.status }}
              </span>
            </div>
          </div>
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

      alertOpen: false,
      alertType: "success",
      alertMessage: "",

      isLoading: true,
    };
  },
  computed: {
    alertClass() {
      return {
        "text-white px-6 py-4 border-0 rounded-full fixed mb-4 z-50 w-6/12 mt-8": true,
        "bg-orange-500": this.alertType === "waiting",
        "bg-emerald-500": this.alertType === "success",
        "bg-red-500": this.alertType === "error",
      };
    },
  },
  mounted() {
    this.getAllCreatedPostApi()

    // Check if there's an alert message in sessionStorage
    const alertType = sessionStorage.getItem('alertType');
    const alertMessage = sessionStorage.getItem('alertMessage');

    if (alertType && alertMessage) {
      this.alertType = alertType;
      this.alertMessage = alertMessage;
      this.alertOpen = true;

      // Set a timeout to close the alert after 3 seconds
      setTimeout(() => {
        this.alertOpen = false;
      }, 3000);

      // Remove the alert message from sessionStorage
      sessionStorage.removeItem('alertType');
      sessionStorage.removeItem('alertMessage');
    }
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
          status: this.getList[i]["adoptionStatus"],
        });
      }

      this.isLoading = false;
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