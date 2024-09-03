<template>
  <div>
    <!-- Loading Indicator -->
    <div v-if="isProcessing" class="loading-overlay">
      <div class="loading-content flex flex-col items-center">
        <p class="text-lg font-semibold">Processing Payment...</p>
        <img src="@/assets/img/loading.gif" alt="Loading..." class="w-16 mt-6 mr-4" />
      </div>
    </div>

    <div class="container mx-auto p-8 min-h-screen flex items-center justify-center bg-main">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        <!-- Payment Form -->
        <div v-if="!isProcessing" class="p-6 bg-white rounded-lg shadow-lg">
          <div class="flex justify-between items-center mb-4">
            <div class="text-2xl font-bold">PayForMe</div>
          </div>
          <form @submit.prevent="handleSubmit">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2">Card Holder Name</label>
              <input type="text" v-model="cardHolderName" @input="validateCardHolderName"
                placeholder="Enter the card holder's name"
                class="border-0 px-3 py-3 placeholder-gray-700 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
              <p v-if="cardHolderNameError" class="text-red-500 text-xs mt-1">{{ cardHolderNameError }}</p>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2">Card Number</label>
              <div
                class="flex items-center border-0 px-3 py-1 placeholder-gray-700 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                <img src="@/assets/img/mastercard.svg" alt="mastercard" class="w-8 h-8 mr-2">
                <input type="text" v-model="cardNumber" @input="formatCardNumber"
                  placeholder="Enter the 16-digit card number" class="flex-1 outline-none border-none" />
                <img src="@/assets/img/verified.png" alt="verified" class="w-6 h-6 ml-2">
              </div>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2">CVV Number</label>
              <input type="text" v-model="cvv" @input="validateCVV" placeholder="Enter the 3 or 4 digit number"
                class="border-0 px-3 py-3 placeholder-gray-700 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
              <p v-if="cvvError" class="text-red-500 text-xs mt-1">{{ cvvError }}</p>
            </div>
            <div class="mb-4 flex space-x-4">
              <div class="w-1/2">
                <label class="block text-gray-700 text-sm font-bold mb-2">Expiry Date</label>
                <div class="flex space-x-2">
                  <input type="text" v-model="expiryMonth" @input="updateExpiryDate" placeholder="MM"
                    class="border-0 px-3 py-3 placeholder-gray-700 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                  <input type="text" v-model="expiryYear" @input="updateExpiryDate" placeholder="YY"
                    class="border-0 px-3 py-3 placeholder-gray-700 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                </div>
              </div>
            </div>
            <button type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-6">
              Pay Now
            </button>
          </form>
        </div>

        <!-- Summary Section -->
        <div v-if="!isProcessing" class="p-6 bg-gray-50 rounded-lg shadow-lg">
          <div class="flex justify-center items-center mb-4 mt-10">
            <img src="@/assets/img/logo.png" alt="card" class="w-32 h-auto">
          </div>
          <div class="text-center">
            <div class="text-lg font-semibold">{{ cardHolderName }}</div>
            <div class="text-lg font-semibold">{{ maskedCardNumber }}</div>
            <div class="text-gray-500 mb-2">{{ displayExpiryDate }}</div>
          </div>
          <div class="mt-4">
            <div class="flex justify-between">
              <div>Company</div>
              <div class="font-semibold">Care4Stray</div>
            </div>
            <div class="flex justify-between mt-2">
              <div>Transaction Number</div>
              <div class="font-semibold">{{ transactionId }}</div>
            </div>
            <div class="flex justify-between mt-2">
              <div>Donation Amount</div>
              <div class="font-semibold">RM {{ formattedAmount }}</div>
            </div>
          </div>
          <div class="mt-10 text-center">
            <div class="text-xl font-semibold">You have to Pay</div>
            <div class="text-3xl font-bold text-blue-600">RM {{ formattedAmount }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updateDonationStatus } from '@/service/apiProviderDonation';

export default {
  data() {
    return {
      cardHolderName: '',
      cardNumber: '',
      cvv: '',
      expiryMonth: '',
      expiryYear: '',
      password: '',

      amount: parseFloat(localStorage.getItem('donationAmount')) || 0,
      transactionId: "CSA 00" + localStorage.getItem('transactionId') || 'Unknown',

      cvvError: '',
      cardHolderNameError: '',
      isProcessing: false,  // New state for loading
    };
  },
  computed: {
    formattedAmount() {
      return this.amount.toFixed(2);
    },
    maskedCardNumber() {
      return this.cardNumber.replace(/\d{4}(?=.)/g, '**** ');
    },
    displayExpiryDate() {
      if (this.expiryMonth && this.expiryYear) {
        return `${this.expiryMonth}/${this.expiryYear}`;
      }
      return 'MM/YY';
    }
  },
  methods: {
    formatCardNumber() {
      let value = this.cardNumber.replace(/\D/g, '').slice(0, 16);
      value = value.replace(/(.{4})/g, '$1 ').trim();
      this.cardNumber = value;
    },
    validateCVV() {
      if (this.cvv.length < 3 || this.cvv.length > 4) {
        this.cvvError = 'CVV must be 3 or 4 digits long.';
      } else {
        this.cvvError = '';
      }
    },
    validateCardHolderName() {
      const namePattern = /^[a-zA-Z\s]+$/;
      if (!namePattern.test(this.cardHolderName)) {
        this.cardHolderNameError = 'Card holder name must only contain alphabetic characters.';
      } else {
        this.cardHolderNameError = '';
      }
    },
    updateExpiryDate() {
      // This method is invoked when expiry month or year is changed
    },
    async handleSubmit() {
      // Perform validation before proceeding
      this.validateCardHolderName();
      this.validateCVV();

      if (!this.cardHolderNameError && !this.cvvError) {
        this.isProcessing = true;

        const result = await updateDonationStatus(localStorage.getItem('transactionId'), "SUCCESS");

        if (result) {
          // Simulate payment processing delay
          setTimeout(() => {
            this.isProcessing = false;

            localStorage.setItem('donationSuccess', true);
            // Redirect to home page
            this.$router.push('/donation');

            localStorage.removeItem('donationAmount');
            localStorage.removeItem('transactionId');

         
          }, 5000); // Simulate 5 seconds delay
        }
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}

.timer {
  background-color: black;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  /* Ensure it's above all other content */
}

.loading-content {
  text-align: center;
}
</style>
