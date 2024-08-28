<template>
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
    :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']">
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-lg" :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']">
            Donation Transaction
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
                <img src="@/assets/img/pageloading.gif" style="width: 12rem; height: 12rem;" />
              </div>
            </td>
          </tr>

          <tr v-else v-for="(project, index) in projects" :key="index">
            <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <div class="flex">
                {{ project.date }}
              </div>
            </th>

            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <div class="flex">
                {{ project.name }}
              </div>
            </td>

            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              MYR
              <span>
                {{ project.amount }}
              </span>
            </td>

            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <div class="flex">
                <i :class="project.isAnonymously === 'true' ? 'fas fa-check' : 'fas fa-times'"></i>
              </div>
            </td>

            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <i :class="['fas fa-circle', statusColor(project.status), 'mr-2']"></i>
              {{ project.status }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { getAllDonationlistAdmin } from '@/service/apiProviderDonation';

export default {
  data() {
    return {
      tableHeaders: [
        { text: "Date" },
        { text: 'Name' },
        { text: 'Donation Amount' },
        { text: 'Is Anonymously' },
        { text: 'Status' },
      ],
      projects: [
        // {
        //   date: "2024/15/2",
        //   name: "Kelvin",
        //   amount: "150",
        //   isAnonymously: "yes",
        //   status: "completed",
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
    this.getAllDonationApi();
  },
  methods: {
    async getAllDonationApi() {
      this.getList = await getAllDonationlistAdmin();
      for (let i = 0; i < this.getList.length; i++) {
        this.projects.push({
          date: new Date(this.getList[i]["createdDate"]).toISOString().split('T')[0],
          name: this.getList[i]["user"]["firstName"] + " " + this.getList[i]["user"]["lastName"],
          amount: this.getList[i]["amount"],
          isAnonymously: this.getList[i]["isAnonymously"],
          status: this.getList[i]["status"],
        });
      }

      this.isLoading = false
    },
    statusColor(status) {
      switch (status) {
        case 'PENDING':
          return 'text-orange-500';
        case 'SUCCESS':
          return 'text-emerald-500';
        case 'UNSUCCESS':
          return 'text-red-500';
        // case 'on schedule':
        //   return 'text-teal-500';
        default:
          return 'text-gray-500';
      }
    },
  }
}
</script>
