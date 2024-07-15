<template>
<div class="modal overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex" v-show="showRegModal" @keyup.esc="closeRegModal">
    <div class="modal-content">
        <div class="container mx-auto px-4 h-full">
            <div class="flex content-center items-center justify-center h-full">
                <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-secondaryMain border-0">
                    <div class="rounded-t mb-0 px-6 py-6 flex flex-row">
                        <div class="text-left mb-3">
                            <h6 class="text-mainText text-3xl font-bold">
                                Sign up
                            </h6>
                            <h3 class="text-mainText text-base font-normal mt-3">Please note that 
                                <span class="underline font-semibold">Volunteer Registration</span> 
                                is separated.</h3>
                        </div>
                        <div>
                            <button class="w-8" @click="closeRegModal">
                                <img :src=closebtn alt="Close" />
                            </button>
                        </div>
                        <hr class="mt-6 border-b-1 border-blueGray-300" />
                    </div>
                    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <form>
                            <div class="relative w-full mb-3 text-left">
                                <label class="block uppercase text-mainText text-xs font-bold mb-2" for="name">
                                    Name
                                </label>
                                <input type="text" id="name"
                                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Name" />
                            </div>

                            <div class="relative w-full mb-3 text-left">
                                <label class="block uppercase text-mainText text-xs font-bold mb-2" for="email">
                                    Email
                                </label>
                                <input type="email" id="email"
                                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Email" />
                            </div>

                            <div class="relative w-full mb-3 text-left">
                                <label class="block uppercase text-mainText text-xs font-bold mb-2" for="gender">
                                    Gender
                                </label>
                                <select id="gender"
                                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
    
                            <div class="relative w-full mb-3 text-left">
                                <label class="block uppercase text-mainText text-xs font-bold mb-2" for="password">
                                    Password
                                </label>
                                <input type="password" id="password"
                                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Password" />
                            </div>

                            <div class="relative w-full mb-3 text-left">
                                <label class="block uppercase text-mainText text-xs font-bold mb-2" for="confirm-password">
                                    Confirm Password
                                </label>
                                <input type="password" id="confirm-password"
                                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Confirm Password" />
                            </div>

                            <div class="text-center mt-6">
                                <button
                                    class="bg-mainText text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                    type="button"
                                    @click=closeRegModal>
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

</template>

<script>
import closebtn from "@/assets/img/close-btn.png";

export default {
    props: {
        showRegModal: Boolean,
        closeRegModal: Function,
    },

    data() {
        return {
            closebtn,
        };
    },

    methods: {
        closeModalOnEsc(event) {
            // Check if the pressed key is 'Esc' (key code 27)
            if (event.keyCode === 27) {
                this.closeRegModal();
            }
        },
    },

    watch: {
        // Add a watch to listen for changes in the showModal prop
        showRegModal(newValue) {
            if (newValue) {
                // Add the 'keyup' event listener when the modal is shown
                document.addEventListener("keyup", this.closeModalOnEsc);
            } else {
                // Remove the 'keyup' event listener when the modal is hidden
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

/* .modal-content {
    background: #f4f9f4;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    width: 38rem;
    color: black;
    position: relative;
} */
</style>