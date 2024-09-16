<template>
    <div>
        <EditApplicationModal :showModal="isModalVisible" :closeModal="closeModal" />
        <CancelApplicationModal :showModal="isCancelModalVisible" :closeModal="closeCancelModal" />

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
            <div class="flex flex-col md:flex-row items-start p-4 space-x-4">
                <img :src="application.image" alt="Application Image"
                    class="md:w-4/12 xl:w-3/12 md:h-auto rounded-lg" />
                <div class="flex-1 mt-4 md:mt-0">
                    <div class="flex justify-between">
                        <div class="items-center space-y-1">
                            <p><strong>Name:</strong> {{ application.name }}</p>
                            <p><strong>Gender:</strong> {{ application.gender }}</p>
                            <p><strong>Age:</strong> {{ application.age }} months</p>
                            <p><strong>Behavior:</strong></p>
                            <ul class="list-disc pl-20">
                                <li v-for="behavior in application.behaviors" :key="behavior">{{ behavior }}</li>
                            </ul>
                            <p><strong>Application Date:</strong> {{ application.date }}</p>
                            <p>
                                <strong>Application Status: </strong>
                                <span :class="{
                                    'text-yellow-500': application.status === 'APPLICATION_PENDING',
                                    'text-red-500': application.status === 'APPLICATION_FAILURE',
                                    'text-green-500': application.status === 'APPLICATION_SUCCESS',
                                }">
                                    {{ application.status }}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex p-4 space-x-4">
                <div
                    class="w-32 flex justify-center items-center bg-secondaryMain border-mainTheme border-2 text-mainText font-bold uppercase text-xs px-4 py-1 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                    <img :src="vaccine" alt="vaccine" class="w-8 h-8 p-1" />Vaccinated
                </div>

                <div
                    class="w-32 flex justify-center items-center border-mainTheme border-2 bg-secondaryMain text-mainText font-bold uppercase text-xs px-4 py-1 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                    <img :src="worm" alt="worm" class="w-8 h-8 p-1" />Deworm
                </div>
            </div>

            <div class="p-4 flex flex-col min-w-0 break-words w-full mb-4">
                <div class="rounded-t bg-white mb-0 py-6">
                    <div class="text-center flex justify-between">
                        <h6 class="text-blueGray-700 text-xl font-bold justify-start flex">Adopter's Information
                            <i class="fas fa-star-of-life text-red-500 text-xs ml-2"></i>
                        </h6>
                    </div>
                </div>
                <div class="flex-auto py-10 pt-0">
                    <hr class=" border-b-1 border-blueGray-300" />
                    <form>
                        <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            User Information
                        </h6>
                        <div class="flex flex-wrap">
                            <div class="w-full lg:w-6/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        for="first-name">
                                        First Name
                                    </label>
                                    <input type="text" id="first-name"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        :class="{ 'disabled-bg': !isEdit }" :readonly="!isEdit"
                                        v-model="adopter.firstName" />
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        for="last-name">
                                        Last Name
                                    </label>
                                    <input type="text" id="last-name"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        :class="{ 'disabled-bg': !isEdit }" :readonly="!isEdit"
                                        v-model="adopter.lastName" />
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        for="date-of-birth">
                                        Date of Birth
                                    </label>
                                    <input type="date" id="date-of-birth"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        :class="{ 'disabled-bg': !isEdit }" :disabled="!isEdit"
                                        v-model="adopter.dateOfBirth" />
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        for="gender">
                                        Gender
                                    </label>
                                    <select id="gender"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        :class="{ 'disabled-bg': !isEdit }" :disabled="!isEdit"
                                        v-model="adopter.gender">
                                        <option value="">Select Gender</option>
                                        <option value="MALE">MALE</option>
                                        <option value="FEMALE">FEMALE</option>
                                        <option value="OTHER">OTHER</option>
                                    </select>
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        for="phone-number">
                                        Phone Number
                                    </label>
                                    <input type="text" id="phone-number"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        :class="{ 'disabled-bg': !isEdit }" :readonly="!isEdit"
                                        v-model="adopter.phoneNumber" />
                                </div>
                            </div>
                        </div>

                        <hr class="mt-6 border-b-1 border-blueGray-300" />

                        <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            Contact Information
                        </h6>
                        <div class="flex flex-wrap">
                            <div class="w-full lg:w-12/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        for="address">
                                        Address
                                    </label>
                                    <input type="text" id="address"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        :class="{ 'disabled-bg': !isEdit }" :readonly="!isEdit"
                                        v-model="adopter.address" />
                                </div>
                            </div>
                            <div class="w-full lg:w-4/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="city">
                                        City
                                    </label>
                                    <input type="text" id="city"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        :class="{ 'disabled-bg': !isEdit }" :readonly="!isEdit"
                                        v-model="adopter.city" />
                                </div>
                            </div>
                            <div class="w-full lg:w-4/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="state">
                                        State / Province
                                    </label>
                                    <select id="state"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        :class="{ 'disabled-bg': !isEdit }" :disabled="!isEdit" v-model="adopter.state">
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
                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        for="postal-code">
                                        Postal Code
                                    </label>
                                    <input type="text" id="postal-code"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        :class="{ 'disabled-bg': !isEdit }" :readonly="!isEdit"
                                        v-model="adopter.postal" />
                                </div>
                            </div>
                        </div>

                        <hr class="mt-6 border-b-1 border-blueGray-300" />

                        <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            About Me
                        </h6>
                        <div class="flex flex-wrap">
                            <div class="w-full lg:w-6/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        for="occupation">
                                        Occupation
                                    </label>
                                    <select id="occupation"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        :class="{ 'disabled-bg': !isEdit }" :disabled="!isEdit"
                                        v-model="adopter.occupation">
                                        <option value="">Select Occupation</option>

                                        <option value="SELF_EMPLOYED">Self Employed</option>
                                        <option value="RETIRED">Retired</option>
                                        <option value="STUDENT">Student</option>
                                        <option value="EMPLOYED">Employed</option>
                                        <option value="UNEMPLOYED">Unemployed</option>
                                        <option value="OTHER">Other</option>
                                        <!-- <option value="administrativeSupport">Administrative Support</option>
                                        <option value="architectureAndEngineering">Architecture and Engineering</option>
                                        <option value="artsDesignEntertainmentSportsAndMedia">Arts, Design,
                                            Entertainment,
                                            Sports, and Media</option>
                                        <option value="buildingAndGroundsCleaningAndMaintenance">Building and Grounds
                                            Cleaning and Maintenance</option>
                                        <option value="businessAndFinancialOperations">Business and Financial Operations
                                        </option>
                                        <option value="communityAndSocialService">Community and Social Service</option>
                                        <option value="computerAndMathematical">Computer and Mathematical</option>
                                        <option value="constructionAndExtraction">Construction and Extraction</option>
                                        <option value="educationTrainingAndLibrary">Education, Training, and Library
                                        </option>
                                        <option value="farmingFishingAndForestry">Farming, Fishing, and Forestry
                                        </option>
                                        <option value="foodPreparationAndServingRelated">Food Preparation and Serving
                                            Related</option>
                                        <option value="healthcarePractitionersAndTechnical">Healthcare Practitioners and
                                            Technical</option>
                                        <option value="healthcareSupport">Healthcare Support</option>
                                        <option value="installationMaintenanceAndRepair">Installation, Maintenance, and
                                            Repair</option>
                                        <option value="legal">Legal</option>
                                        <option value="lifePhysicalAndSocialScience">Life, Physical, and Social Science
                                        </option>
                                        <option value="management">Management</option>
                                        <option value="militarySpecific">Military Specific</option>
                                        <option value="officeAndAdministrativeSupport">Office and Administrative Support
                                        </option>
                                        <option value="personalCareAndService">Personal Care and Service</option>
                                        <option value="production">Production</option>
                                        <option value="protectiveService">Protective Service</option>
                                        <option value="salesAndRelated">Sales and Related</option>
                                        <option value="transportationAndMaterialMoving">Transportation and Material
                                            Moving
                                        </option>
                                        <option value="other">Other</option> -->
                                    </select>
                                </div>
                            </div>
                        </div>


                    </form>
                </div>
                <div class="justify-end flex px-3 space-x-4 pt-4" v-if="application.status === 'APPLICATION_PENDING'">
                    <button
                        class="w-40 bg-red-500 text-white active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded-xl shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        @click="reject(application.id)">
                        Reject
                    </button>
                    <button
                        class="w-40 bg-emerald-500 text-white active:bg-emerald-500 font-bold uppercase text-xs px-4 py-2 rounded-xl shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        @click="approve(application.id)">
                        Approve
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import vaccine from "@/assets/img/tabler_vaccine.png";
import worm from "@/assets/img/contrast_worm.png";

import EditApplicationModal from "@/components/Application/EditApplicationModal.vue";
import CancelApplicationModal from "@/components/Application/CancelApplicationModal.vue";

import { createPopper } from "@popperjs/core";
import { ref } from "vue";

import { getApplicationDetails, updateApplicationStatus } from "../../service/apiProviderAdoption";

export default {
    components: {
        EditApplicationModal,
        CancelApplicationModal,
    },

    data() {
        return {
            popoverShow: false,
            isModalVisible: ref(false),
            isCancelModalVisible: ref(false),

            isEdit: false,

            application: {
                id: "",
                image: "",
                name: '',
                gender: '',
                age: '',
                behaviors: [],
                date: '',
                status: '',
            },

            vaccine,
            worm,

            adopter: {
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

            alertOpen: false,
            alertType: "success",
            alertMessage: "",

            applicationID: this.$route.query.applicationID,
        };
    },
    mounted() {
        this.getDetailsApi();
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
    },
    methods: {
        async getDetailsApi() {
            const result = await getApplicationDetails(this.applicationID);

            this.application = {
                id: result.stray.strayId,
                image: result.stray.mainPicture,
                name: result.stray.name,
                gender: result.stray.gender,
                age: result.stray.age,
                behaviors: result.stray.behaviour,
                vaccined: result.stray.isVaccinated,
                dewormed: result.stray.isDewormed,
                date: new Date(result.applicationDate).toISOString().split('T')[0],
                status: result.adoptionStatus,
            };

            this.adopter = {
                firstName: result.user.firstName,
                lastName: result.user.lastName,
                dateOfBirth: result.user.dateOfBirth,
                gender: result.user.gender,
                phoneNumber: result.user.phoneNumber,
                address: result.user.address,
                city: result.user.city,
                state: result.user.state,
                postal: result.user.postal,
                occupation: result.user.occupation,
            };
        },
        async approve(strayid) {
            this.alertOpen = true;
            this.alertType = "waiting";
            this.alertMessage = "Please wait! ";

            const result = await updateApplicationStatus("APPLICATION_SUCCESS", strayid, this.applicationID);

            if (result) {
                this.alertType = "success";
                this.alertMessage = "Application update successful";
                this.alertOpen = true;

                setTimeout(() => {
                    this.alertOpen = false;
                }, 1000); // Close alert after 3 seconds

                window.location.reload()
            }
        },
        async reject(strayid) {
            this.alertOpen = true;
            this.alertType = "waiting";
            this.alertMessage = "Please wait! ";
            const result = await updateApplicationStatus("APPLICATION_FAILURE", strayid, this.applicationID);

            if (result) {
                this.alertType = "success";
                this.alertMessage = "Application update successful";
                this.alertOpen = true;

                setTimeout(() => {
                    this.alertOpen = false;
                }, 1000); // Close alert after 3 seconds

                window.location.reload()
            }
        },
        togglePopover: function () {
            if (this.popoverShow) {
                this.hidePopover();
            } else {
                this.showPopover();
            }
        },
        showPopover: function () {
            this.popoverShow = true;
            createPopper(this.$refs.btnRef, this.$refs.popoverRef, {
                placement: "bottom",
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: [-70, 0] // Adjust the offset values as needed
                        },
                    },
                    {
                        name: 'preventOverflow',
                        options: {
                            boundary: 'viewport'
                        }
                    }
                ]
            });
            document.addEventListener('click', this.handleClickOutside);
        },
        hidePopover: function () {
            this.popoverShow = false;
            document.removeEventListener('click', this.handleClickOutside);
        },
        handleClickOutside: function (event) {
            const popover = this.$refs.popoverRef;
            const button = this.$refs.btnRef;
            if (popover && !popover.contains(event.target) && button && !button.contains(event.target)) {
                this.hidePopover();
            } else if (popover && popover.contains(event.target)) {
                this.hidePopover();
            }
        },
        showModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },

        showCancelModal() {
            this.isCancelModalVisible = true;
        },
        closeCancelModal() {
            this.isCancelModalVisible = false;
        },
    },
};
</script>

<style scoped>
.disabled-bg {
    background-color: rgba(220, 226, 208, 1);
    opacity: 1;
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
