<template>
    <div class="modal overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
        v-show="showModal" @keyup.esc="closeModal">
        <div class="modal-content">
            <div class="container mx-auto px-4 h-full">
                <div class="flex content-center items-center justify-center h-full">
                    <div
                        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-secondaryMain border-0">
                        <div class="rounded-t mb-0 px-6 py-6 flex flex-row">
                            <div class="text-left mb-3">
                                <div class="flex justify-between">
                                    <h6 class="text-mainText text-3xl font-bold">
                                        Cancel Your Application?
                                    </h6>
                                    <div>
                                        <button class="w-8" @click="closeModal">
                                            <img :src=closebtn alt="Close" />
                                        </button>
                                    </div>
                                </div>
                                <hr class="mt-6 border-b-1 border-thirdText" />
                                <h3 class="text-mainText text-base font-normal mt-3">
                                    Please be aware that your current application will be permanently withdrawn<br>
                                    from consideration.
                                </h3>
                            </div>
                        </div>


                        <div class="justify-end flex px-6 py-3">
                            <button @click="closeModal" class="text-mainButton active:bg-secondTheme font-bold uppercase text-xs px-4 py-2 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                Maybe Later
                            </button>
                            <button @click="cancel" class="w-32 bg-secondTheme text-mainText active:bg-secondTheme font-bold uppercase text-xs px-4 py-2 rounded-xl shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import closebtn from "@/assets/img/close-btn.png";

import { cancelApplication } from "../../service/apiProviderAdoption";

export default {
    props: {
        showModal: Boolean,
        closeModal: Function,
    },

    data() {
        return {
            closebtn,

            applicationID: this.$route.query.applicationID,
        };
    },

    methods: {
        async cancel() {
            const result = await cancelApplication(this.applicationID);

            if(result.message == "success") {
                this.$router.push('/user/application');
            }
        },

        closeModalOnEsc(event) {
            // Check if the pressed key is 'Esc' (key code 27)
            if (event.keyCode === 27) {
                this.closeRegModal();
            }
        },
    },

    watch: {
        // Add a watch to listen for changes in the showModal prop
        showModal(newValue) {
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