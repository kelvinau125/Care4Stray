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
        <div class="modal overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center flex"
            v-show="showRegModal" @keyup.esc="closeModal">
            <div v-if="alertOpen" :class="alertClass">
                <span class="text-xl inline-block mr-5 align-middle">
                    <i class="fas fa-bell"></i>
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
            <div class="modal-content mt-4">
                <div class="container mx-auto px-4 h-full">
                    <div class="flex content-center items-center justify-center h-full">
                        <div
                            class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-secondaryMain border-0">
                            <div class="rounded-t mb-0 px-6 py-6 flex flex-row justify-between">
                                <div class="text-left mb-3">
                                    <h6 class="text-mainText text-3xl font-bold">
                                        Sign up
                                    </h6>
                                    <!-- <h3 class="text-mainText text-base font-normal mt-3">Please note that
                                        <span class="underline font-semibold">Volunteer Registration</span>
                                        is separated.
                                    </h3> -->
                                    <h3 class="text-mainText text-base font-normal mt-3 mr-10">Join
                                        <span class="underline font-semibold">Care4Stray</span>
                                        and make a difference today.           
                                    </h3> 
                                </div>
                                <div>
                                    <button class="w-8" @click="closeModal">
                                        <img :src=closebtn alt="Close" />
                                    </button>
                                </div>
                            </div>
                            <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <form @submit.prevent="register">
                                    <div class="relative w-full mb-3 text-left">
                                        <label class="block uppercase text-mainText text-xs font-bold mb-2"
                                            for="firstname">
                                            First Name
                                        </label>
                                        <input type="text" id="firstname"
                                            class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="First Name" v-model="firstname" required />
                                        <span v-if="validationErrors.firstname" class="text-red-500 text-xs">{{
                                            validationErrors.firstname }}</span>
                                    </div>

                                    <div class="relative w-full mb-3 text-left">
                                        <label class="block uppercase text-mainText text-xs font-bold mb-2"
                                            for="lastname">
                                            Last Name
                                        </label>
                                        <input type="text" id="lastname"
                                            class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Last Name" v-model="lastname" required />
                                        <span v-if="validationErrors.lastname" class="text-red-500 text-xs">{{
                                            validationErrors.lastname }}</span>
                                    </div>

                                    <div class="relative w-full mb-3 text-left">
                                        <label class="block uppercase text-mainText text-xs font-bold mb-2" for="email">
                                            Email
                                        </label>
                                        <input type="email" id="email"
                                            class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Email" v-model="email" required />
                                        <span v-if="validationErrors.email" class="text-red-500 text-xs">{{
                                            validationErrors.email }}</span>
                                    </div>

                                    <div class="relative w-full mb-3 text-left">
                                        <label class="block uppercase text-mainText text-xs font-bold mb-2"
                                            for="gender">
                                            Gender
                                        </label>
                                        <select id="gender"
                                            class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            v-model="gender" required>
                                            <option value="">Select Gender</option>
                                            <option value="MALE">Male</option>
                                            <option value="FEMALE">Female</option>
                                            <option value="OTHER">Other</option>
                                        </select>
                                        <span v-if="validationErrors.gender" class="text-red-500 text-xs">{{
                                            validationErrors.gender }}</span>
                                    </div>

                                    <div class="relative w-full mb-3 text-left">
                                        <label class="block uppercase text-mainText text-xs font-bold mb-2"
                                            for="password">
                                            Password
                                        </label>
                                        <div class="relative">
                                            <input :type="passwordType" id="password"
                                                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Password" v-model="password" required />
                                            <i :class="passwordIcon" class="password-toggle"
                                                @click="togglePasswordVisibility('password')"></i>
                                        </div>
                                        <span v-if="validationErrors.password" class="text-red-500 text-xs">{{
                                            validationErrors.password }}</span>
                                    </div>

                                    <div class="relative w-full mb-3 text-left">
                                        <label class="block uppercase text-mainText text-xs font-bold mb-2"
                                            for="confirm-password">
                                            Confirm Password
                                        </label>
                                        <div class="relative">
                                            <input :type="confirmPasswordType" id="confirm-password"
                                                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Confirm Password" v-model="confirmpassword" required />
                                            <i :class="confirmPasswordIcon" class="password-toggle"
                                                @click="togglePasswordVisibility('confirm-password')"></i>
                                        </div>
                                        <span v-if="validationErrors.confirmpassword" class="text-red-500 text-xs">{{
                                            validationErrors.confirmpassword }}</span>
                                    </div>

                                    <div class="text-center mt-6">
                                        <button
                                            class="bg-mainText text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                            type="submit">
                                            Create Account
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import closebtn from "@/assets/img/close-btn.png";
import { createUser } from "@/service/apiProviderAuth.js";

export default {
    props: {
        showRegModal: Boolean,
        closeRegModal: Function,
    },
    data() {
        return {
            closebtn,
            firstname: "",
            lastname: "",
            email: "",
            gender: "",
            password: "",
            confirmpassword: "",
            passwordType: "password",
            confirmPasswordType: "password",
            passwordIcon: "fas fa-eye-slash",
            confirmPasswordIcon: "fas fa-eye-slash",
            alertOpen: false,
            alertType: "success",
            alertMessage: "",
            validationErrors: {}
        };
    },
    computed: {
        alertClass() {
            return {
                "text-white px-6 py-4 border-0 rounded-full fixed mb-4 z-50 w-6/12 mt-8": true,
                "bg-emerald-500": this.alertType === "success",
                "bg-red-500": this.alertType === "error",
            };
        },
    },
    methods: {
        closeModalOnEsc(event) {
            if (event.keyCode === 27) {
                this.resetForm();
                this.closeRegModal();
            }
        },

        closeModal() {
            this.resetForm();
            this.closeRegModal();
        },

        togglePasswordVisibility(field) {
            if (field === "password") {
                this.passwordType = this.passwordType === "password" ? "text" : "password";
                this.passwordIcon = this.passwordType === "password" ? "fas fa-eye-slash" : "fas fa-eye";
            } else if (field === "confirm-password") {
                this.confirmPasswordType = this.confirmPasswordType === "password" ? "text" : "password";
                this.confirmPasswordIcon = this.confirmPasswordType === "password" ? "fas fa-eye-slash" : "fas fa-eye";
            }
        },

        resetForm() {
            this.firstname = "";
            this.lastname = "";
            this.email = "";
            this.gender = "";
            this.password = "";
            this.confirmpassword = "";
            this.validationErrors = {};
        },

        validateForm() {
            this.validationErrors = {};

            const nameRegex = /^[A-Za-z]+$/;

            if (!this.firstname) {
                this.validationErrors.firstname = "First Name is required.";
            } else if (!nameRegex.test(this.firstname)) {
                this.validationErrors.firstname = "First Name can only contain alphabet characters.";
            }

            if (!this.lastname) {
                this.validationErrors.lastname = "Last Name is required.";
            } else if (!nameRegex.test(this.lastname)) {
                this.validationErrors.lastname = "Last Name can only contain alphabet characters.";
            }

            if (!this.email) {
                this.validationErrors.email = "Email is required.";
            } else if (!/\S+@\S+\.\S+/.test(this.email)) {
                this.validationErrors.email = "Email is not valid.";
            }

            if (!this.gender) {
                this.validationErrors.gender = "Gender is required.";
            }

            if (!this.password) {
                this.validationErrors.password = "Password is required.";
            } else if (this.password.length < 6) {
                this.validationErrors.password = "Password must be at least 6 characters.";
            }

            if (this.password !== this.confirmpassword) {
                this.validationErrors.confirmpassword = "Passwords do not match.";
            }

            return Object.keys(this.validationErrors).length === 0;
        },

        async register() {
            if (!this.validateForm()) {
                return;
            }

            try {
                const result = await createUser(this.firstname, this.lastname, this.email, this.gender, this.password, "USER", "https://res.cloudinary.com/dfmnw3bin/image/upload/v1722330239/default_avatar.jpg");
                console.log(result)
                if (result == true) {
                    this.alertType = "success";
                    this.alertMessage = "Account created successfully!";
                   
                    if(this.$route.path !== '/') {
                        this.$router.push("/");
                    }  
                    this.closeModal();
                } else {
                    this.alertType = "error";
                    this.alertMessage = result || "An error occurred.";
                }
            } catch (error) {
                this.alertType = "error";
                this.alertMessage = error.response.data || "An error occurred.";
            } finally {
                this.alertOpen = true;
                setTimeout(() => {
                    this.alertOpen = false;
                }, 3000); // Close alert after 3 seconds
            }
        },
        closeAlert() {
            this.alertOpen = false;
        },
    },
    watch: {
        showRegModal(newValue) {
            if (newValue) {
                document.addEventListener("keyup", this.closeModalOnEsc);
            } else {
                document.removeEventListener("keyup", this.closeModalOnEsc);
            }
        },
    },
};
</script>

<style scoped>
.modal {
    background: rgba(0, 0, 0, 0.5);
}

.password-toggle {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
}
</style>