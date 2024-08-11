<template>
    <div>
        <div class="border border-gray-300 mb-4 rounded-lg bg-white">
            <div class="p-4 flex flex-col min-w-0 break-words w-full mb-4">
                <div class="flex pb-2 pt-4 justify-between">

                    <div class="ml-3 mt-1">
                        <div class="text-sm whitespace-nowrap">
                            <i :class="['fas fa-circle', statusColor(stray.status), 'mr-2']"></i>
                            {{ stray.status }}
                        </div>
                    </div>

                    <div class="mr-2">
                        <button
                            class="bg-emerald-500 text-white active:bg-indigo-600 text-sm font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button" @click="toEditApplication()" style="width: 5rem;">
                            edit
                        </button>
                    </div>
                </div>


                <div class="flex items-center justify-center pb-2 pt-4 flex-row">
                    <div v-for="(image, index) in stray.image" :key="index" class="relative group inline-block m-2">
                        <img :src="image" alt="Stray Image" class="rounded-lg"
                            style="width: 17rem; height: auto;" />
                    </div>
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
                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        for="first-name">Name</label>
                                    <input type="text" id="first-name"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        v-model="stray.name" readonly>
                                </div>
                            </div>

                            <div class="w-full lg:w-6/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        for="gender">Gender</label>
                                    <select id="gender"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        v-model="stray.gender" disabled>
                                        <option value="">Select Gender</option>
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                    </select>
                                </div>
                            </div>

                            <div class="w-full lg:w-6/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        for="last-name">Age</label>
                                    <input type="text" id="last-name"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        v-model="stray.age" readonly />
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
                                    <div v-for="(behavior, index) in stray.behaviors" :key="index"
                                        class="flex items-center mb-2">
                                        <input type="text" :id="'behavior-' + index"
                                            class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            v-model="stray.behaviors[index]" placeholder="Enter behavior" readonly />
                                    </div>
                                </div>

                            </div>
                        </div>

                        <hr class="mt-6 border-b-1 border-blueGray-300" />
                        <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Vaccinated or Deworm
                            Information</h6>
                        <div class="flex flex-wrap">

                            <div class="w-full lg:w-6/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        for="vaccined">Vaccined</label>
                                    <select id="vaccined"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        v-model="stray.vaccined" disabled>
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
                                        v-model="stray.dewormed" disabled>
                                        <option value="" disabled>Select an option</option>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
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
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { getStrayDetails } from "@/service/apiProviderAdoption";

export default {
    data() {
        return {
            strayID: this.$route.query.strayID,

            stray: {
                image: [],
                name: '',
                gender: '',
                age: '' + "Years Old",
                behaviors: [],
                vaccined: "",
                dewormed: "",
                status: "",
            }
        };
    },
    mounted() {
        this.getStrayDetailsApi()
    },
    methods: {
        async getStrayDetailsApi() {
            const result = await getStrayDetails(this.strayID);

            this.stray = {
                image: result.pictureUrl,
                name: result.name,
                gender: result.gender,
                age: result.age,
                behaviors: result.behaviour,
                vaccined: result.vaccinated,
                dewormed: result.dewormed,
                status: result.status,
            };
        },

        toEditApplication() {
            // Push
            this.$router.push({
                path: '/admin/editstrayprofile',
                query: {
                    strayID: this.$route.query.strayID,
                },
            });
        },

        statusColor(status) {
            switch (status) {
                case 'UNDER_REVIEW':
                    return 'text-orange-500';
                case 'AVAILABLE':
                    return 'text-emerald-500';
                case 'ADOPTION_FAILED':
                    return 'text-red-500';
                case 'ADOPTED':
                    return 'text-gray-500';
                default:
                    return 'text-gray-500';
            }
        },

        goBack() {
            this.$router.go(-1);
        },
    },
};
</script>

<style scoped>
.cursor-pointer {
    cursor: pointer;
}
</style>