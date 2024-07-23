<template>
    <div>
      <div class="border border-gray-300 mb-4 rounded-lg">
        <div class="p-4 flex flex-col min-w-0 break-words w-full mb-4">
          <div class="flex items-center justify-center pb-2">
            <img :src="adopter.image" alt="Application Image" class="md:w-4/12 xl:w-3/12 md:h-auto rounded-full cursor-pointer"
              @click="triggerFileInput" />
            <input type="file" ref="fileInput" class="hidden" @change="handleFileChange" />
          </div>
          <div class="rounded-t bg-white mb-0 py-6">
            <div class="text-center flex justify-between">
              <h6 class="text-blueGray-700 text-xl font-bold justify-start flex">Personal's Information</h6>
            </div>
          </div>
          <div class="flex-auto py-10 pt-0">
            <hr class="border-b-1 border-blueGray-300" />
            <form>
              <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">User Information</h6>
              <div class="flex flex-wrap">
                <div class="w-full lg:w-6/12 px-4">
                  <div class="relative w-full mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="first-name">First Name</label>
                    <input type="text" id="first-name" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      v-model="adopter.firstName" />
                  </div>
                </div>
                <div class="w-full lg:w-6/12 px-4">
                  <div class="relative w-full mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="last-name">Last Name</label>
                    <input type="text" id="last-name" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      v-model="adopter.lastName" />
                  </div>
                </div>
                <div class="w-full lg:w-6/12 px-4">
                  <div class="relative w-full mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="date-of-birth">Date of Birth</label>
                    <input type="date" id="date-of-birth" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      v-model="adopter.dateOfBirth" />
                  </div>
                </div>
                <div class="w-full lg:w-6/12 px-4">
                  <div class="relative w-full mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="gender">Gender</label>
                    <select id="gender" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      v-model="adopter.gender">
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div class="w-full lg:w-6/12 px-4">
                  <div class="relative w-full mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="phone-number">Phone Number</label>
                    <input type="text" id="phone-number" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      v-model="adopter.phoneNumber" />
                  </div>
                </div>
              </div>
              <hr class="mt-6 border-b-1 border-blueGray-300" />
              <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Contact Information</h6>
              <div class="flex flex-wrap">
                <div class="w-full lg:w-12/12 px-4">
                  <div class="relative w-full mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="address">Address</label>
                    <input type="text" id="address" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      v-model="adopter.address" />
                  </div>
                </div>
                <div class="w-full lg:w-4/12 px-4">
                  <div class="relative w-full mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="city">City</label>
                    <input type="text" id="city" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      v-model="adopter.city" />
                  </div>
                </div>
                <div class="w-full lg:w-4/12 px-4">
                  <div class="relative w-full mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="state">State / Province</label>
                    <select id="state" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      v-model="adopter.state">
                      <option value="">Select State / Province</option>
                      <option value="johor">Johor</option>
                      <option value="kedah">Kedah</option>
                      <option value="kelantan">Kelantan</option>
                      <option value="melaka">Malacca (Melaka)</option>
                      <option value="negeriSembilan">Negeri Sembilan</option>
                      <option value="pahang">Pahang</option>
                      <option value="perak">Perak</option>
                      <option value="perlis">Perlis</option>
                      <option value="pulauPinang">Penang (Pulau Pinang)</option>
                      <option value="sabah">Sabah</option>
                      <option value="sarawak">Sarawak</option>
                      <option value="selangor">Selangor</option>
                      <option value="terengganu">Terengganu</option>
                      <option value="kualaLumpur">Kuala Lumpur</option>
                      <option value="labuan">Labuan</option>
                      <option value="putrajaya">Putrajaya</option>
                    </select>
                  </div>
                </div>
                <div class="w-full lg:w-4/12 px-4">
                  <div class="relative w-full mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="postal-code">Postal Code</label>
                    <input type="text" id="postal-code" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      v-model="adopter.postalCode" />
                  </div>
                </div>
              </div>
              <hr class="mt-6 border-b-1 border-blueGray-300" />
              <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">About Me</h6>
              <div class="flex flex-wrap">
                <div class="w-full lg:w-6/12 px-4">
                  <div class="relative w-full mb-3">
                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="occupation">Occupation</label>
                    <select id="occupation" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      v-model="adopter.occupation">
                      <option value="">Select Occupation Category</option>
                      <option value="administrativeSupport">Administrative Support</option>
                      <option value="architectureAndEngineering">Architecture and Engineering</option>
                      <option value="artsDesignEntertainmentSportsAndMedia">Arts, Design, Entertainment, Sports, and Media</option>
                      <option value="buildingAndGroundsCleaningAndMaintenance">Building and Grounds Cleaning and Maintenance</option>
                      <option value="businessAndFinancialOperations">Business and Financial Operations</option>
                      <option value="communityAndSocialService">Community and Social Service</option>
                      <option value="computerAndMathematical">Computer and Mathematical</option>
                      <option value="constructionAndExtraction">Construction and Extraction</option>
                      <option value="educationTrainingAndLibrary">Education, Training, and Library</option>
                      <option value="farmingFishingAndForestry">Farming, Fishing, and Forestry</option>
                      <option value="foodPreparationAndServingRelated">Food Preparation and Serving Related</option>
                      <option value="healthcarePractitionersAndTechnical">Healthcare Practitioners and Technical</option>
                      <option value="healthcareSupport">Healthcare Support</option>
                      <option value="installationMaintenanceAndRepair">Installation, Maintenance, and Repair</option>
                      <option value="legal">Legal</option>
                      <option value="lifePhysicalAndSocialScience">Life, Physical, and Social Science</option>
                      <option value="management">Management</option>
                      <option value="militarySpecific">Military Specific</option>
                      <option value="officeAndAdministrativeSupport">Office and Administrative Support</option>
                      <option value="personalCareAndService">Personal Care and Service</option>
                      <option value="production">Production</option>
                      <option value="protectiveService">Protective Service</option>
                      <option value="salesAndRelated">Sales and Related</option>
                      <option value="transportationAndMaterialMoving">Transportation and Material Moving</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="justify-end flex px-3">
            <button class="w-40 bg-secondTheme text-mainText active:bg-secondTheme font-bold uppercase text-xs px-4 py-2 rounded-xl shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { uploadImage } from "@/service/apiProviderImage.js";

  export default {
    data() {
      return {
        adopter: {
          image: require('@/assets/img/team-1-800x800.jpg').default,
          firstName: 'Lucky',
          lastName: 'Jesse',
          dateOfBirth: '2024-01-07',
          gender: 'male',
          phoneNumber: '0123456789',
          address: 'Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09',
          city: 'New York',
          state: 'kualaLumpur',
          postalCode: '51200',
          occupation: 'other',
        }
      };
    },
    methods: {
      triggerFileInput() {
        this.$refs.fileInput.click();
      },
      async handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          if (file.size > 20 * 1024 * 1024) {
            alert("File size exceeds 20MB. Please choose a smaller file.");
            return;
          }
          const result = await uploadImage(file);

          if (result) {
            console.log(result)
          } else if (result === false) {
              console.log(result)
          } 
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .cursor-pointer {
    cursor: pointer;
  }
  </style>
  