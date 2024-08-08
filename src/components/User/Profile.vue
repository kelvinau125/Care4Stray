<template>
  <div>
    <div class="flex justify-center">
      <div v-if="alertOpen" :class="alertClass">
        <span class="text-xl inline-block mr-5 align-middle">
          <i class="fas fa-bell"></i>
        </span>
        <span class="inline-block align-middle mr-8">
          <b class="capitalize">{{ alertType }} ! </b> {{ alertMessage }}
        </span>
        <button
          class="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
          @click="closeAlert">
          <span>×</span>
        </button>
      </div>
    </div>
    <div class="border border-gray-300 mb-4 rounded-lg">
      <div class="p-4 flex flex-col min-w-0 break-words w-full mb-4">
        <div class="flex items-center justify-center pb-2">
          <img :src="adopter.userAvatar || previewImage" alt="Application Image"
            class="w-60 h-60 rounded-full cursor-pointer" @click="triggerFileInput" />
          <input type="file" ref="fileInput" class="hidden" @change="handleFileChange" />
        </div>
        <div class="rounded-t bg-white mb-0 py-6">
          <div class="text-center flex justify-between">
            <h6 class="text-blueGray-700 text-xl font-bold justify-start flex">Personal's Information</h6>
          </div>
        </div>
        <form @submit.prevent="updateProfile()">
          <div class="flex-auto py-10 pt-0">
            <hr class="border-b-1 border-blueGray-300" />
            <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">User Information</h6>
            <div class="flex flex-wrap">
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="first-name">First
                    Name</label>
                  <input type="text" id="first-name"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    v-model="adopter.firstName" required />
                  <span v-if="validationErrors.firstName" class="text-red-500 text-xs">{{ validationErrors.firstName
                    }}</span>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="last-name">Last
                    Name</label>
                  <input type="text" id="last-name"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    v-model="adopter.lastName" required />
                  <span v-if="validationErrors.lastName" class="text-red-500 text-xs">{{ validationErrors.lastName
                    }}</span>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="date-of-birth">Date of
                    Birth</label>
                  <input type="date" id="date-of-birth"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    v-model="adopter.dateOfBirth" required />
                  <span v-if="validationErrors.dateOfBirth" class="text-red-500 text-xs">{{ validationErrors.dateOfBirth
                    }}</span>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="gender">Gender</label>
                  <select id="gender"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    v-model="adopter.gender" required>
                    <option value="">Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                  <span v-if="validationErrors.gender" class="text-red-500 text-xs">{{ validationErrors.gender }}</span>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="phone-number">Phone
                    Number</label>
                  <input type="text" id="phone-number"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    v-model="adopter.phoneNumber" required />
                  <span v-if="validationErrors.phoneNumber" class="text-red-500 text-xs">{{ validationErrors.phoneNumber
                    }}</span>
                </div>
              </div>
            </div>
            <hr class="mt-6 border-b-1 border-blueGray-300" />
            <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Contact Information</h6>
            <div class="flex flex-wrap">
              <div class="w-full lg:w-12/12 px-4">
                <div class="relative w-full mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="address">Address</label>
                  <input type="text" id="address"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    v-model="adopter.address" required />
                  <span v-if="validationErrors.address" class="text-red-500 text-xs">{{ validationErrors.address
                    }}</span>
                </div>
              </div>
              <div class="w-full lg:w-4/12 px-4">
                <div class="relative w-full mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="city">City</label>
                  <input type="text" id="city"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    v-model="adopter.city" required />
                  <span v-if="validationErrors.city" class="text-red-500 text-xs">{{ validationErrors.city }}</span>
                </div>
              </div>
              <div class="w-full lg:w-4/12 px-4">
                <div class="relative w-full mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="state">State /
                    Province</label>
                  <select id="state"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    v-model="adopter.state" required>
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
                  <span v-if="validationErrors.state" class="text-red-500 text-xs">{{ validationErrors.state }}</span>
                </div>
              </div>
              <div class="w-full lg:w-4/12 px-4">
                <div class="relative w-full mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="postal-code">Postal
                    Code</label>
                  <input type="text" id="postal-code"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    v-model="adopter.postal" required />
                  <span v-if="validationErrors.postal" class="text-red-500 text-xs">{{ validationErrors.postal }}</span>
                </div>
              </div>
            </div>
            <hr class="mt-6 border-b-1 border-blueGray-300" />
            <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">About Me</h6>
            <div class="flex flex-wrap">
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="occupation">Occupation</label>
                  <select id="occupation"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    v-model="adopter.occupation" required>
                    <option value="">Select Occupation</option>
                    <option value="SELF_EMPLOYED">Self Employed</option>
                    <option value="RETIRED">Retired</option>
                    <option value="STUDENT">Student</option>
                    <option value="EMPLOYED">Employed</option>
                    <option value="UNEMPLOYED">Unemployed</option>
                    <option value="OTHER">Other</option>

                    <!-- <option value="administrativeSupport">Administrative Support</option>
                    <option value="architectureAndEngineering">Architecture and Engineering</option>
                    <option value="artsDesignEntertainmentSportsAndMedia">Arts, Design, Entertainment, Sports, and Media
                    </option>
                    <option value="buildingAndGroundsCleaningAndMaintenance">Building and Grounds Cleaning and
                      Maintenance</option>
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
                    <option value="other">Other</option> -->
                  </select>
                </div>
              </div>
            </div>

          </div>
          <div class="justify-end flex px-3">
            <button
              class="w-40 bg-secondTheme text-mainText active:bg-secondTheme font-bold uppercase text-xs px-4 py-2 rounded-xl shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadImage } from "@/service/apiProviderImage.js";

// api
import { getUserInfo } from "@/service/apiProviderAuth.js";

// get user cookie / set cookie
import VueCookies from 'vue-cookies';
import { updateUserInfo } from "@/service/apiProviderAuth";

export default {
  data() {
    return {
      adopter: {
        id: '',
        username: '',
        role: '',
        userAvatar: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        phoneNumber: '',
        address: '',
        city: '',
        state: '',
        postal: '',
        occupation: '',
      },

      previewImage: null,
      selectedFile: null,
      validationErrors: {},

      alertOpen: false,
      alertType: "success",
      alertMessage: "",
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

        this.previewImage = URL.createObjectURL(file);
        this.adopter.userAvatar = "",
        this.selectedFile = file;

      }
    },

    async updateProfile() {
      if (this.validateAndSubmit()) {
        if (this.selectedFile) {
          this.alertOpen = true;
          this.alertType = "waiting";
          this.alertMessage = "Please wait, profile is updating! ";

          const uploadedImageUrl = await uploadImage(this.selectedFile, "image");
          if (uploadedImageUrl.status === 200) {
            this.adopter.userAvatar = uploadedImageUrl.data.url;
          }
        }

        const result = await updateUserInfo(this.adopter);
        if (result) {
          // Store success message in sessionStorage before refreshing
          sessionStorage.setItem('alertType', 'success');
          sessionStorage.setItem('alertMessage', 'Account update successfully!');

          // Refresh the page
          window.location.reload();
        }
      } else {
        this.alertType = "error";
        this.alertMessage = "Please fill up all the information correctly";
        this.alertOpen = true;
        setTimeout(() => {
          this.alertOpen = false;
        }, 3000); // Close alert after 3 seconds
      }
    },


    async getUserInfoApi() {
      const result = await getUserInfo(VueCookies.get('email'));

      this.adopter = {
        id: result.id,
        username: result.username,
        role: result.role,
        userAvatar: result.userAvatar,
        firstName: result.firstName,
        lastName: result.lastName,
        dateOfBirth: result.dateOfBirth,
        gender: result.gender,
        phoneNumber: result.phoneNumber,
        address: result.address,
        city: result.city,
        state: result.state,
        postal: result.postal,
        occupation: result.occupation,
      };
    },

    validateAndSubmit() {
      this.validationErrors = {}; // Reset errors
      let isValid = true;

      // Validate first name (alphabets only)
      if (!this.adopter.firstName) {
        this.validationErrors.firstName = "First name is required.";
        isValid = false;
      } else if (!/^[A-Za-z]+$/.test(this.adopter.firstName)) {
        this.validationErrors.firstName = "First name should contain only alphabets.";
        isValid = false;
      }

      // Validate last name (alphabets only)
      if (!this.adopter.lastName) {
        this.validationErrors.lastName = "Last name is required.";
        isValid = false;
      } else if (!/^[A-Za-z]+$/.test(this.adopter.lastName)) {
        this.validationErrors.lastName = "Last name should contain only alphabets.";
        isValid = false;
      }

      // Validate phone number (10-11 digits only)
      if (!this.adopter.phoneNumber) {
        this.validationErrors.phoneNumber = "Phone number is required.";
        isValid = false;
      } else if (!/^\d{10,11}$/.test(this.adopter.phoneNumber)) {
        this.validationErrors.phoneNumber = "Phone number must be 10-11 digits.";
        isValid = false;
      }

      // Validate postal code (numbers only)
      if (!this.adopter.postal) {
        this.validationErrors.postal = "Postal code is required.";
        isValid = false;
      } else if (!/^\d+$/.test(this.adopter.postal)) {
        this.validationErrors.postal = "Postal code should contain only numbers.";
        isValid = false;
      }

      if (isValid) {
        return true
      }
    }
  },

  mounted() {
    this.getUserInfoApi();

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
  }
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>