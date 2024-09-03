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

        <div class="border border-gray-300 mb-4 rounded-lg">
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
                                    'text-yellow-500': application.status === 'ADOPTION_IN_PROGRESS',
                                    'text-red-500': application.status === 'APPLICATION_FAILURE',
                                    'text-green-500': application.status === 'APPLICATION_SUCCESS',
                                }">
                                    {{ application.status }}
                                </span>
                            </p>
                        </div>

                        <button v-if="application.status === 'ADOPTION_IN_PROGRESS'" ref="btnRef" v-on:click="togglePopover()"
                            class="flex items-start hover:text-mainText outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 h-8"
                            type="button">
                            <i class="fas fa-ellipsis-v text-mainText text-xl"></i>
                        </button>

                        <div ref="popoverRef" v-bind:class="{ 'hidden': !popoverShow, 'block': popoverShow }"
                            class="bg-mainTheme border-0 mr-3 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg">
                            <button href="javascript:void(0);" @click="showCancelModal"
                                class="text-sm py-2 px-4 font-normal w-full whitespace-nowrap bg-transparent text-blueGray-700 flex items-center">
                                <i class="fas fa-times text-mainText text-lg mr-2"></i> Cancel Application
                            </button>
                            <button href="javascript:void(0);" @click="showModal"
                                class="text-sm py-2 px-4 font-normal w-full whitespace-nowrap bg-transparent text-blueGray-700 flex items-center">
                                <i class="fas fa-edit text-mainText text-base mr-1"></i> Edit Application
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            <div class="flex p-4 space-x-4">
                <div class="w-32 flex justify-center items-center bg-secondaryMain border-mainTheme border-2 text-mainText font-bold uppercase text-xs px-4 py-1 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    v-if="application.vaccined">
                    <img :src="vaccine" alt="vaccine" class="w-8 h-8 p-1" />Vaccinated
                </div>

                <div class="w-32 flex justify-center items-center border-mainTheme border-2 bg-secondaryMain text-mainText font-bold uppercase text-xs px-4 py-1 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    v-if="application.dewormed">
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
                <form @submit.prevent="editApplication()">
                <div class="flex-auto py-10 pt-0">
                    <hr class=" border-b-1 border-blueGray-300" />
                  
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
                                        v-model="adopter.firstName" required />
                                    <span v-if="validationErrors.firstName" class="text-red-500 text-xs">{{
                                        validationErrors.firstName
                                        }}</span>
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
                                        v-model="adopter.lastName" required />
                                    <span v-if="validationErrors.lastName" class="text-red-500 text-xs">{{
                                        validationErrors.lastName
                                    }}</span>
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
                                        v-model="adopter.dateOfBirth" required />
                                    <span v-if="validationErrors.dateOfBirth" class="text-red-500 text-xs">{{
                                        validationErrors.dateOfBirth
                                    }}</span>
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
                                        :class="{ 'disabled-bg': !isEdit }" :disabled="!isEdit" v-model="adopter.gender"
                                        required>
                                        <option value="">Select Gender</option>
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                    <span v-if="validationErrors.gender" class="text-red-500 text-xs">{{
                                        validationErrors.gender }}</span>
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
                                        v-model="adopter.phoneNumber" required />
                                    <span v-if="validationErrors.phoneNumber" class="text-red-500 text-xs">{{
                                        validationErrors.phoneNumber
                                    }}</span>
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
                                        v-model="adopter.address" required />
                                    <span v-if="validationErrors.address" class="text-red-500 text-xs">{{
                                        validationErrors.address
                                    }}</span>
                                </div>
                            </div>
                            <div class="w-full lg:w-4/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="city">
                                        City
                                    </label>
                                    <input type="text" id="city"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        :class="{ 'disabled-bg': !isEdit }" :readonly="!isEdit" v-model="adopter.city"
                                        required />
                                    <span v-if="validationErrors.city" class="text-red-500 text-xs">{{
                                        validationErrors.city }}</span>
                                </div>
                            </div>
                            <div class="w-full lg:w-4/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="state">
                                        State / Province
                                    </label>
                                    <select id="state"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        :class="{ 'disabled-bg': !isEdit }" :disabled="!isEdit" v-model="adopter.state"
                                        required>
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
                                    <span v-if="validationErrors.state" class="text-red-500 text-xs">{{
                                        validationErrors.state }}</span>
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
                                        :class="{ 'disabled-bg': !isEdit }" :readonly="!isEdit" v-model="adopter.postal"
                                        required />
                                    <span v-if="validationErrors.postal" class="text-red-500 text-xs">{{
                                        validationErrors.postal }}</span>
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
             
                </div>
                <div class="justify-end flex px-3" v-if="isEdit">
                    <button
                        class="w-40 bg-secondTheme text-mainText active:bg-secondTheme font-bold uppercase text-xs px-4 py-2 rounded-xl shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit">
                        Submit
                    </button>
                </div>
            </form>
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

import { getApplicationDetails, updateApplication } from "../../service/apiProviderAdoption";

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

            // isEdit: false,

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

            validationErrors: {},

            alertOpen: false,
            alertType: "success",
            alertMessage: "",

            applicationID: this.$route.query.applicationID,
        };
    },

    mounted() {
        this.getDetailsApi();
    },

    methods: {
        async editApplication() {
            this.alertOpen = true;
            this.alertType = "waiting";
            this.alertMessage = "Please wait, profile is updating! ";

            if (this.validateAndSubmit()) {
                this.alertOpen = true;
                this.alertType = "waiting";
                this.alertMessage = "Please wait, profile is updating! ";

                this.applicationDetails = {
                    user: {
                        ...this.adopter
                    },
                    stray: {
                        strayId: this.strayID
                    }
                };

                const result = await updateApplication(this.applicationDetails);
                if (result) {
                    // Store success message in sessionStorage before refreshing
                    this.alertType = "success";
                    this.alertMessage = "Application update successful";
                    this.alertOpen = true;

                    setTimeout(() => {
                    this.alertOpen = false;
                    }, 1000); // Close alert after 3 seconds

                    this.$router.push('/user/applicationdetails')
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
        },
        closeAlert() {
            this.alertOpen = false;
        },
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
                status: result.stray.status,
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

    computed: {
        isEdit() {
            return this.$route.path === '/user/editapplicationdetails';
        },
        alertClass() {
            return {
                "text-white px-6 py-4 border-0 rounded-full fixed mb-4 z-50 w-6/12": true,
                "bg-orange-500": this.alertType === "waiting",
                "bg-emerald-500": this.alertType === "success",
                "bg-red-500": this.alertType === "error",
            };
        },
    },

};
</script>

<style scoped>
.disabled-bg {
    background-color: rgba(220, 226, 208, 1);
    opacity: 0.8;
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
