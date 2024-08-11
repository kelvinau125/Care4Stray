<template>
  <div>
    <div class="border border-gray-300 mb-4 rounded-lg bg-white">
      <div class="p-4 flex flex-col min-w-0 break-words w-full mb-4">

        <div class="flex items-center justify-center pb-2 pt-4 flex-row">
          <div
            v-for="(image, index) in stray.image"
            :key="index"
            class="relative group inline-block m-2"
          >
            <img
              :src="image"
              alt="Stray Image"
              class="rounded-lg cursor-pointer"
              style="width: 17rem; height: auto;"
            />
            <img
              src="@/assets/img/close.png"
              @click="removeImage(index)"
              class="absolute w-8 h-8 transform translate-x-2 translate-y-2 opacity-75 group-hover:opacity-100 transition-opacity duration-200 ease-in-out cursor-pointer"
              style="top: -15px; right: -15px;"
            />
          </div>
          <input
            type="file"
            ref="fileInput"
            class="hidden"
            @change="handleFileChange"
            multiple
          />
        </div>

        <div class="flex justify-center mb-4">
          <button
            @click="triggerFileInput"
            class="bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-opacity-90 transition duration-200"
          >
            Upload Image
          </button>
        </div>

        <div class="rounded-t mb-0 py-6">
          <div class="text-center flex justify-between">
            <h6 class="text-blueGray-700 text-xl font-bold justify-start flex">Animal Information</h6>
          </div>
        </div>
        <div class="flex-auto py-10 pt-0">
          <hr class="border-b-1 border-blueGray-300" />
          <form>
            <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Stray's Information</h6>
            <div class="flex flex-wrap">
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="first-name">Name</label>
                  <input type="text" id="first-name"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    v-model="stray.name" />
                </div>
              </div>

              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="gender">Gender</label>
                  <select id="gender"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    v-model="stray.gender">
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="last-name">Age</label>
                  <input type="text" id="last-name"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    v-model="stray.age" />
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
                      v-model="stray.behaviors[index]" placeholder="Enter behavior" />
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
                    v-model="stray.vaccined">
                    <option value="" disabled>Select an option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>

              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="dewormed">Dewormed</label>
                  <select id="dewormed"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    v-model="stray.dewormed">
                    <option value="" disabled>Select an option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
            </div>


          </form>
        </div>
        <div class="justify-end flex px-3">
          <button
            class="w-40 bg-secondTheme text-mainText active:bg-secondTheme font-bold uppercase text-xs px-4 py-2 rounded-xl shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button" @click="goBack()">
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { uploadImage } from "@/service/apiProviderImage.js";

export default {
  data() {
    return {
      userId: this.$route.query.applicationID,

      stray: {
        image: [require('@/assets/img/team-1-800x800.jpg').default, require('@/assets/img/team-1-800x800.jpg').default, require('@/assets/img/team-1-800x800.jpg').default, require('@/assets/img/team-1-800x800.jpg').default],
        name: '',
        gender: '',
        age: '',
        behaviors: [""],
        vaccined: "",
        dewormed: "",
      }
    };
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    async handleFileChange(event) {
      const files = event.target.files;
      if (files.length) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          if (file.size > 20 * 1024 * 1024) {
            alert("File size exceeds 20MB. Please choose a smaller file.");
            return;
          }

          // const result = await uploadImage(file, "image");

          // if (result) {
          //   this.stray.image.push(result.imageUrl); // Assuming the image URL is returned in result.imageUrl
          // }
        }
      }
    },

    removeImage(index) {
      this.stray.image.splice(index, 1); // Remove the image at the specified index
    },

    goBack() {
      this.$router.go(-1);
    },

    addBehavior() {
      this.stray.behaviors.push(''); // Add an empty string to the behaviors array
    },

    removeBehavior(index) {
      this.stray.behaviors.splice(index, 1); // Remove the behavior at the specified index
    }
  },
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>