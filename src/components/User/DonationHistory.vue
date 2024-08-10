<template>
  <div class="container mx-auto px-4 sm:px-8">
    <div class="py-8">
      <div class="flex flex-row mb-1 sm:mb-0 justify-between w-full">
        <h2 class="text-2xl leading-tight">
          Donation Transactions
        </h2>
      </div>
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Donor Name
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="transaction in transactions" :key="transaction.id">
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{ transaction.donorName }}
                  </p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">
                    RM {{ transaction.amount.toFixed(2) }}
                  </p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{ new Date(transaction.date).toLocaleDateString() }}
                  </p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <span :class="statusClass(transaction.status)">
                    {{ transaction.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDonationByUserID } from '@/service/apiProviderDonation';

export default {
  data() {
    return {
      transactions: [
        // {
        //   id: 1,
        //   donorName: "John Doe",
        //   amount: 100.5,
        //   date: "2024-01-15T14:30:00",
        //   status: "Completed"
        // },
        // {
        //   id: 2,
        //   donorName: "Jane Smith",
        //   amount: 50.0,
        //   date: "2024-02-20T10:00:00",
        //   status: "Pending"
        // },
        // Add more transactions here
      ]
    };
  },
  mounted() {
    this.getAllDonationApi();
  },
  methods: {
    async getAllDonationApi() {
      this.getList = await getDonationByUserID();
      for (let i = 0; i < this.getList.length; i++) {
        this.transactions.push({
          id: this.getList[i]['id'],
          donorName: this.getList[i]["user"]["firstName"] + " " + this.getList[i]["user"]["lastName"],
          amount: this.getList[i]["amount"],
          date: new Date(this.getList[i]["createdDate"]).toISOString().split('T')[0],
          status: this.getList[i]["status"],
        });
      }
    },

    statusClass(status) {
      if (status === "SUCCESS") {
        return "text-green-500 font-semibold";
      } else if (status === "PENDING") {
        return "text-yellow-500 font-semibold";
      } else if (status === "UNSUCCESS") {
        return "text-red-500 font-semibold";
      }
      return "text-gray-500 font-semibold";
    }
  }
};
</script>