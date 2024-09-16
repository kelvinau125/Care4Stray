<template>
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
    :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']">
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-lg" :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']">
            Notification Box
          </h3>
        </div>
      </div>
    </div>
    <div class="block w-full overflow-x-auto">
      <!-- Projects table -->
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            <th v-for="(header, index) in tableHeaders" :key="index"
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]">
              {{ header.text }}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="isLoading">
            <td colspan="8" class="text-center">
              <div class="flex justify-center items-center mt-2">
                <img src="@/assets/img/pageloading.gif" style="width: 21rem; height: 12rem; padding: 1rem;" />
              </div>
            </td>
          </tr>

          <tr v-else v-for="(project, index) in projects" :key="index" class="cursor-pointer"
            @click="toRoute(project.applicationID)">
            <th
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
              <img :src="project.image" class="h-12 w-12 bg-white rounded-full border" alt="..." />
              <span class="ml-3 font-bold" :class="[
                color === 'light' ? 'text-blueGray-600' : 'text-white',
              ]">
                {{ project.name }}
              </span>
            </th>

            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <div class="flex">
                {{ project.details }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

import { getNotification } from "../../service/apiProviderNotification";

export default {
  data() {
    return {
      tableHeaders: [
        { text: 'Sender' },
        { text: 'Details' },
      ],
      projects: [
        // {
        //   date: "2024/15/2",
        //   details: "Kelvin",
        //   image: "",
        //   name: "kelvin",
        // }
      ],

      isLoading: true,
    }
  },
  props: {
    color: {
      type: String,
      default: 'light'
    },
  },
  mounted() {
    this.generateNotificationsLists()
  },
  methods: {
    toRoute(applicationID) {
      this.$router.push({
        path: '/admin/adminadoption',
        query: {
          applicationID: applicationID,
        },
      });
    },
    async generateNotificationsLists() {
      this.getList = await getNotification();
      for (let i = 0; i < this.getList.length; i++) {
        this.projects.push({
          id: this.getList[i]["notificationId"],
          image: this.getList[i]["sender"]["userAvatar"],
          name: "@ " + this.getList[i]["sender"]["firstName"] + " " + this.getList[i]["sender"]["lastName"],
          details: this.getList[i]["message"],

          applicationID: this.getList[i]['adoption'] ? this.getList[i]['adoption']['adoptionId'] : null,
        });
      }

      this.isLoading = false;
    },

    statusColor(status) {
      switch (status) {
        case 'pending':
          return 'text-orange-500';
        case 'completed':
          return 'text-emerald-500';
        case 'delayed':
          return 'text-red-500';
        case 'on schedule':
          return 'text-teal-500';
        default:
          return 'text-gray-500';
      }
    },
  },

}
</script>
