<template>
  <div>
    <!-- Loading Overlay -->
    <div v-if="alertType === 'waiting'" class="loading-overlay">
    </div>

    <!-- Alert Box -->
    <div class="flex justify-center">
      <div v-if="alertOpen" :class="alertClass" style="margin-top: -100px;">
        <span class="text-xl inline-block mr-5 align-middle">
          <i v-if="alertType !== 'waiting'" class="fas fa-bell"></i>
          <i v-if="alertType === 'waiting'" class="fas fa-spinner"></i>
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
    <div class="border border-gray-300 mb-4 rounded-lg bg-white">
      <div class="p-4 flex flex-col min-w-0 break-words w-full mb-4">
        <div class="flex items-center justify-center pb-2 pt-4 flex-row">
          <div v-for="(image, index) in stray.image" :key="index" class="relative group inline-block m-2">
            <img :src="image" alt="Stray Image" class="rounded-lg cursor-pointer" style="width: 17rem; height: auto;" />
            <img src="@/assets/img/close.png" @click="removeImage(index)"
              class="absolute w-8 h-8 transform translate-x-2 translate-y-2 opacity-75 group-hover:opacity-100 transition-opacity duration-200 ease-in-out cursor-pointer"
              style="top: -15px; right: -15px;" />
          </div>
          <input type="file" ref="fileInput" class="hidden" @change="handleFileChange" multiple required />
        </div>

        <div class="flex justify-center mb-4">
          <button @click="triggerFileInput"
            class="bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-opacity-90 transition duration-200">
            Upload Image
          </button>
        </div>
        <div class="rounded-t mb-0 py-6">
          <div class="text-center flex justify-between">
            <h6 class="text-blueGray-700 text-xl font-bold justify-start flex">Animal Information</h6>
          </div>
        </div>
        <div class="flex-auto pt-0">
          <hr class="border-b-1 border-blueGray-300" />
          <form @submit.prevent="editApplication()">
            <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Stray's Information</h6>
            <div class="flex flex-wrap">
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="first-name">Name</label>
                  <input type="text" id="first-name"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    v-model="stray.name" required/>
                  <span v-if="nameError" class="text-red-500 text-sm">{{ nameError }}</span>
                </div>
              </div>

              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="gender">Gender</label>
                  <select id="gender"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    v-model="stray.gender" required>
                    <option value="">Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select> 
                </div>
              </div>

              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="last-name">Age</label>
                  <input type="text" id="last-name"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    v-model="stray.age" required/>
                  <span v-if="ageError" class="text-red-500 text-sm">{{ ageError }}</span>
                </div>
              </div>
            </div>

            <hr class="mt-6 border-b-1 border-blueGray-300" />

            <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Behavior</h6>
            <div class="flex flex-wrap">

              <div class="w-full  px-4">
                <div class="relative w-full mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="date-of-birth">Behavior</label>
                  <div v-for="(behavior, index) in stray.behaviors" :key="index" class="flex items-center mb-2">
                    <input type="text" :id="'behavior-' + index"
                      class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      v-model="stray.behaviors[index]" placeholder="Enter behavior" required/>
                    <button type="button" @click="removeBehavior(index)"
                      class="ml-2 bg-red-500 text-white px-2 py-1 rounded">
                      Remove
                    </button>
                  </div>
                  <button type="button" @click="addBehavior" class="mt-2 bg-emerald-500 text-white px-3 py-1 rounded">
                    Add Behavior
                  </button>
                </div>

              </div>
            </div>

            <hr class="mt-6 border-b-1 border-blueGray-300" />
            <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Vaccinated or Deworm Information</h6>
            <div class="flex flex-wrap">

              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="vaccined">Vaccined</label>
                  <select id="vaccined"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    v-model="stray.vaccined" required>
                    <option value="" disabled>Select an option</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>

              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="dewormed">Dewormed</label>
                  <select id="dewormed"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    v-model="stray.dewormed" required>
                    <option value="" disabled>Select an option</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="justify-end flex px-3 mt-10">
              <button
                class="w-40 bg-secondTheme text-mainText active:bg-secondTheme font-bold uppercase text-xs px-4 py-2 rounded-xl shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit">
                Change
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadImage } from "@/service/apiProviderImage.js";
import { getStrayDetails, udpateStrayDetails } from "@/service/apiProviderAdoption";

export default {
  data() {
    return {
      strayID: this.$route.query.strayID,

      stray: {
        image: [],
        name: '',
        gender: '',
        age: '',
        behaviors: [],
        vaccined: "",
        dewormed: "",
      },

      newImages: [],
      addedImages: [],

      alertOpen: false,
      alertType: "success",
      alertMessage: "",
    };
  },
  mounted() {
    this.getStrayDetailsApi()
  },
  computed: {
    alertClass() {
      return {
        "text-white px-6 py-4 border-0 rounded-full fixed mb-4 z-50 w-6/12": true,
        "bg-orange-500": this.alertType === "waiting",
        "bg-emerald-500": this.alertType === "success",
        "bg-red-500": this.alertType === "error",
      };
    },
    hasErrors() {
      return this.nameError || this.ageError;
    },
  },
  methods: {
    validateName() {
      const namePattern = /^[A-Za-z\s]+$/; 
      if (!namePattern.test(this.stray.name)) {
        this.nameError = 'Name can only contain alphabetic characters.';
      } else {
        this.nameError = '';
      }
    },
    validateAge() {
      const agePattern = /^[0-9]+$/;
      if (!agePattern.test(this.stray.age)) {
        this.ageError = 'Age must be a valid number.';
      } else {
        this.ageError = '';
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    async handleFileChange(event) {
      const files = event.target.files;
      if (files.length) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];

          // Check if the file is an image
          if (!file.type.startsWith('image/')) {
            this.alertType = "error";
            this.alertMessage = "Please upload only image files.";
            this.alertOpen = true;
            setTimeout(() => {
              this.alertOpen = false;
            }, 3000); // Close alert after 3 seconds
            continue;
          }

          if (file.size > 20 * 1024 * 1024) {
            this.alertType = "error";
            this.alertMessage = "File size exceeds 20MB. Please choose a smaller file.";
            this.alertOpen = true;
            setTimeout(() => {
              this.alertOpen = false;
            }, 3000); // Close alert after 3 seconds
            return;
          }

          const reader = new FileReader();
          reader.onload = (e) => {
            this.stray.image.push(e.target.result);
            this.addedImages.push(e.target.result);
          };
          reader.readAsDataURL(file);
        
          this.newImages.push(file);
        }
      } else {
        this.newImages = [];
      }
    },
    async getStrayDetailsApi() {
      const result = await getStrayDetails(this.strayID);

      this.stray = {
        image: result.pictureUrl,
        name: result.name,
        gender: result.gender,
        age: result.age,
        behaviors: result.behaviour,
        vaccined: result.isVaccinated,
        dewormed: result.isDewormed,
      };
    },
    async editApplication() {
      // Validate fields before proceeding
      this.validateName();
      this.validateAge();

      // Minimum required images and behaviors
      if (this.stray.image.length < 1) {
        this.alertType = "error";
        this.alertMessage = "Please upload at least one image.";
        this.alertOpen = true;
        setTimeout(() => {
          this.alertOpen = false;
        }, 3000);
        return;
      }

      if (this.hasErrors) {
        this.alertType = "error";
        this.alertMessage = "Please correct the errors before submitting.";
        this.alertOpen = true;
        setTimeout(() => {
          this.alertOpen = false;
        }, 3000); // Close alert after 3 seconds
        return;
      }

      this.alertOpen = true;
      this.alertType = "waiting";
      this.alertMessage = "Please wait, Stray application is updating! ";

      const uploadedImageUrls = [];

      if (this.newImages != null) {
        for (let i = 0; i < this.newImages.length; i++) {
          const file = this.newImages[i];
          try {
            const response = await uploadImage(file, "image");
            if (response.status === 200) {
              uploadedImageUrls.push(response.data.url);
            } else {
              console.error(`Failed to upload image at index ${i}`);
            }
          } catch (error) {
            console.error(`Error uploading image at index ${i}:`, error);
          }
        }
      }

      this.stray.image = this.stray.image.filter(image => !this.addedImages.includes(image));

      const allImageUrls = [...this.stray.image.filter(img => typeof img === 'string'), ...uploadedImageUrls];

      const mainPicture = allImageUrls[0] || "";

      const cleanedBehaviors = this.stray.behaviors.filter(behavior => behavior.trim() !== '');

      const strayDetails = {
        strayId: this.strayID,
        name: this.stray.name,
        age: this.stray.age,
        gender: this.stray.gender,
        behaviour: cleanedBehaviors,
        mainPicture: mainPicture,
        pictureUrl: allImageUrls,
        isVaccinated: this.stray.vaccined,
        isDewormed: this.stray.dewormed,
      }

      const result = await udpateStrayDetails(strayDetails);

      if (result) {
        this.alertType = "success";
        this.alertMessage = "Stray application update successful";
        this.alertOpen = true;
        setTimeout(() => {
          this.alertOpen = false;
          // Refresh the page
          // this.$router.go(-1);
        }, 1000); // Close alert after 1 seconds
        
        window.location.reload();
      }
    },
    removeImage(index) {
      this.stray.image.splice(index, 1); // Remove the image at the specified index
      // this.previewUrl.splice(index, 1); // Remove the image at the specified index
    },


    goBack() {
      this.$router.go(-1);
    },

    addBehavior() {
      this.stray.behaviors.push(''); // Add an empty string to the behaviors array
    },

    removeBehavior(index) {
      this.stray.behaviors.splice(index, 1); // Remove the behavior at the specified index
    },

    closeAlert() {
      this.alertOpen = false;
    },
  },

  watch: {
    'stray.name': 'validateName',
    'stray.age': 'validateAge',
  }
}

</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.loading-overlay {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9;
}
</style>