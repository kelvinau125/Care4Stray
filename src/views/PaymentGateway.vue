<template>
    <div class="container mx-auto p-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Payment Form -->
        <div class="p-6 bg-white rounded-lg shadow-lg">
          <div class="flex justify-between items-center mb-4">
            <div class="text-2xl font-bold">PayForMe</div>
          </div>
          <form @submit.prevent="handleSubmit">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2">Card Number</label>
              <div 
              class="flex items-center border-0 px-3 py-1 placeholder-gray-700 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
              <img src="@/assets/img/mastercard.svg" alt="mastercard" class="w-8 h-8 mr-2">
                <input
                  type="text"
                  v-model="cardNumber"
                  placeholder="Enter the 16-digit card number"
                  class="flex-1 outline-none border-none"
                />
                <img src="@/assets/img/verified.png" alt="verified" class="w-6 h-6 ml-2">
              </div>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2">CVV Number</label>
              <input
                type="text"
                v-model="cvv"
                placeholder="Enter the 3 or 4 digit number"
                class="border-0 px-3 py-3 placeholder-gray-700 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>
            <div class="mb-4 flex space-x-4">
              <div class="w-1/2">
                <label class="block text-gray-700 text-sm font-bold mb-2">Expiry Date</label>
                <div class="flex space-x-2">
                  <input
                    type="text"
                    v-model="expiryMonth"
                    placeholder="MM"
                    class="border-0 px-3 py-3 placeholder-gray-700 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  <input
                    type="text"
                    v-model="expiryYear"
                    placeholder="YY"
                    class="border-0 px-3 py-3 placeholder-gray-700 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                </div>
              </div>
            </div>
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-6"
            >
              Pay Now
            </button>
          </form>
        </div>
        <!-- Summary Section -->
        <div class="p-6 bg-gray-50 rounded-lg shadow-lg">
          <div class="flex justify-center items-center mb-4">
            <img src="@/assets/img/logo.png" alt="card" class="w-32 h-auto">
          </div>
          <div class="text-center">
            <div class="text-lg font-semibold">Jonathan Michael</div>
            <div class="text-gray-500 mb-2">**** 3456</div>
            <div class="text-gray-500">09/22</div>
          </div>
          <div class="mt-4">
            <div class="flex justify-between">
              <div>Company</div>
              <div class="font-semibold">Care4Stray</div>
            </div>
            <div class="flex justify-between mt-2">
              <div>Transaction Number</div>
              <div class="font-semibold">1266201</div>
            </div>
            <div class="flex justify-between mt-2">
              <div>Donation Amount</div>
              <div class="font-semibold">RM 100.00</div>
            </div>
          </div>
          <div class="mt-6 text-center">
            <div class="text-xl font-semibold">You have to Pay</div>
            <div class="text-3xl font-bold text-blue-600">RM 100.00</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cardNumber: '',
        cvv: '',
        expiryMonth: '',
        expiryYear: '',
        password: '',
      };
    },
    methods: {
      handleSubmit() {
        console.log('Payment submitted', {
          cardNumber: this.cardNumber,
          cvv: this.cvv,
          expiryMonth: this.expiryMonth,
          expiryYear: this.expiryYear,
          password: this.password,
        });
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
  </style>
  