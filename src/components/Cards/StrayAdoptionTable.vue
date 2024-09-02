<template>
    <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
        :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']">
        <div class="rounded-t mb-0 px-4 py-3 border-0">
            <div class="flex flex-wrap items-center">
                <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 class="font-semibold text-lg" :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']">
                        Stray's List
                    </h3>
                </div>

                <button
                    class="bg-emerald-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button" @click="toCreateStray()">
                    Create
                </button>
            </div>
        </div>
        <div class="block w-full overflow-x-auto">
            <!-- Projects table -->
            <table class="items-center w-full bg-transparent border-collapse">
                <thead>
                    <tr>
                        <th v-for="(header, index) in tableHeaders" :key="index"
                            class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                            :class="[
                                color === 'light'
                                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                    : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                            ]">
                            {{ header.text }}
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-if="isLoading">
                        <td colspan="8" class="text-center">
                            <div class="flex justify-center items-center mt-2">
                                <img src="@/assets/img/pageloading.gif" style="width: 12rem; height: 12rem;" />
                            </div>
                        </td>
                    </tr>
                    
                    <tr v-else v-for="(project, index) in projects" :key="index" @click="toStrayDetails(project.id)"
                        class="cursor-pointer">
                        <th
                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                            <img :src="project.strayimage" class="h-12 w-12 bg-white rounded-full border" alt="..." />
                            <span class="ml-3 font-bold" :class="[
                                color === 'light' ? 'text-blueGray-600' : 'text-white',
                            ]">
                                {{ project.strayname }}
                            </span>
                        </th>

                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div class="flex">
                                {{ project.gender }}
                            </div>
                        </td>

                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div class="flex">
                                {{ project.age }}
                            </div>
                        </td>

                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <i :class="project.isVaccinated ? 'fas fa-check' : 'fas fa-times'"></i>
                        </td>

                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <i :class="project.isDeworm ? 'fas fa-check' : 'fas fa-times'"></i>
                        </td>

                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <i :class="['fas fa-circle', statusColor(project.status), 'mr-2']"></i>
                            {{ project.status }}
                        </td>


                        <td
                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                            <a class="text-blueGray-500 py-1 px-3" href="#pablo" :ref="'btnDropdownRef' + index"
                                @click.native.stop="toggleDropdown(index, $event)">
                                <i class="fas fa-ellipsis-v"></i>
                            </a>
                            <div :ref="'popoverDropdownRef' + index"
                                class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                                :class="{
                                    hidden: dropdownIndex !== index,
                                    block: dropdownIndex === index,
                                }">
                                <a href="javascript:void(0);"
                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                                    @click.native.stop="toEditApplication(project.id)">
                                    EDIT
                                </a>
                                <a href="javascript:void(0);"
                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                                    @click.native.stop="toDelete(project.id)">
                                    DELETE
                                </a>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { createPopper } from "@popperjs/core";
import { getAllStrayList } from "@/service/apiProviderAdoption";
import { deletePost } from "../../service/apiProviderPost";

export default {
    components: {
    },

    data() {
        return {
            dropdownIndex: null,

            tableHeaders: [
                { text: "Stray's Name" },
                { text: 'Gender' },
                { text: 'Age' },
                { text: 'Is Vaccinated' },
                { text: 'Is Deworm' },
                { text: 'Status' },
                { text: '' }
            ],
            projects: [
                // {
                //     id: 1,
                //     strayimage: require('@/assets/img/team-1-800x800.jpg').default,
                //     strayname: "Hello Kitty",
                //     gender: "M",
                //     age: "18",
                //     isVaccinated: "no",
                //     isDeworm: "yes",
                //     status: "available",
                // },
                // {
                //     id: 1,
                //     strayimage: require('@/assets/img/team-1-800x800.jpg').default,
                //     strayname: "Hello Kitty",
                //     gender: "M",
                //     age: "18",
                //     isVaccinated: "no",
                //     isDeworm: "yes",
                //     status: "pending",
                // },
                // {
                //     id: 1,
                //     strayimage: require('@/assets/img/team-1-800x800.jpg').default,
                //     strayname: "Hello Kitty",
                //     gender: "M",
                //     age: "18",
                //     isVaccinated: "no",
                //     isDeworm: "yes",
                //     status: "adopted",
                // }
            ],

            isLoading: true,
        }
    },
    props: {
        color: {
            type: String,
            default: 'light'
        },
    },
    mounted() {
        this.getAllStrayListApi();
    },
    methods: {
        async getAllStrayListApi() {
            this.getList = await getAllStrayList();
            for (let i = 0; i < this.getList.length; i++) {
                this.projects.push({
                    id: this.getList[i]["strayId"],
                    strayimage: this.getList[i]["mainPicture"],
                    strayname: this.getList[i]["name"],
                    gender: this.getList[i]["gender"],
                    age: this.getList[i]["age"],
                    isVaccinated: this.getList[i]["isVaccinated"],
                    isDeworm: this.getList[i]["isDewormed"],
                    status: this.getList[i]["status"],
                });
            }

            this.isLoading = false;
        },

        statusColor(status) {
            switch (status) {
                case 'AVAILABLE':
                    return 'text-emerald-500';
                case 'ADOPTED':
                    return 'text-red-500';
                default:
                    return 'text-gray-500';
            }
        },

        toCreateStray() {
            // Push
            this.$router.push({
                path: '/admin/createstrayprofile',
            });
        },

        toStrayDetails(id) {
            // Push
            this.$router.push({
                path: '/admin/viewstrayprofile',
                query: {
                    strayID: id,
                },
            });
        },

        toEditApplication(id) {
            // Push
            this.$router.push({
                path: '/admin/editstrayprofile',
                query: {
                    strayID: id,
                },
            });
        },

        async toDelete(id) {
            const originalProjects = [...this.projects];
            this.projects = this.projects.filter(project => project.id !== id);

            this.hideDropdown();

            const result = await deletePost(id);

            if (!result) {
                this.projects = originalProjects; 
            }
        },

        toggleDropdown(index, event) {
            event.preventDefault();
            if (this.dropdownIndex === index) {
                this.hideDropdown();
            } else {
                this.showDropdown(index);
            }
        },

        showDropdown(index) {
            this.dropdownIndex = index;
            this.$nextTick(() => {
                createPopper(
                    this.$refs['btnDropdownRef' + index],
                    this.$refs['popoverDropdownRef' + index],
                    {
                        placement: 'bottom-start',
                    }
                );
            });
            document.addEventListener('click', this.handleClickOutsideDropdown);
        },

        hideDropdown() {
            this.dropdownIndex = null;
            document.removeEventListener('click', this.handleClickOutsideDropdown);
        },

        handleClickOutsideDropdown(event) {
            if (!this.$refs['popoverDropdownRef' + this.dropdownIndex].contains(event.target) &&
                !this.$refs['btnDropdownRef' + this.dropdownIndex].contains(event.target)) {
                this.hideDropdown();
            }
        }
    }
}
</script>