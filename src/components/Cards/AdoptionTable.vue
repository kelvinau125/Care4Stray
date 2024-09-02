<template>
    <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
        :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']">
        <div class="rounded-t mb-0 px-4 py-3 border-0">
            <div class="flex flex-wrap items-center">
                <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 class="font-semibold text-lg" :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']">
                        Adoption Application List
                    </h3>
                </div>

                <!-- <button
                    class="bg-emerald-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 shadow"
                    type="button"
                >
                    Create
                </button> -->
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
                        <td colspan="5" class="text-center">
                            <div class="flex justify-center items-center mt-2">
                                <img src="@/assets/img/pageloading.gif" style="width: 12rem; height: 12rem;" />
                            </div>
                        </td>
                    </tr>

                    <tr v-else v-for="(project, index) in projects" :key="index" @click="toApplicationDetails(project.id)" class="cursor-pointer">
                        <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div class="flex">
                                {{ project.date }}
                            </div>
                        </th>

                        <td
                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                            <img :src="project.image" class="h-12 w-12 bg-white rounded-full border" alt="..." />
                            <span class="ml-3 font-bold" :class="[
                                color === 'light' ? 'text-blueGray-600' : 'text-white',
                            ]">
                                {{ project.name }}
                            </span>
                        </td>

                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <i :class="['fas fa-circle', statusColor(project.status), 'mr-2']"></i>
                            {{ project.status }}
                        </td>

                        <td
                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                            <img :src="project.strayimage" class="h-12 w-12 bg-white rounded-full border" alt="..." />
                            <span class="ml-3 font-bold" :class="[
                                color === 'light' ? 'text-blueGray-600' : 'text-white',
                            ]">
                                {{ project.strayname }}
                            </span>
                        </td>

                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"
                            v-if="(project.status == 'APPLICATION_PENDING')">
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
                                    @click.native.stop="approve(project.strayid, project.id)">
                                    APPROVE
                                </a>
                                <a href="javascript:void(0);"
                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                                    @click.native.stop="reject(project.strayid, project.id)">
                                    REJECT
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

import { getAdminAllApplicationList, updateApplicationStatus } from '../../service/apiProviderAdoption';

export default {
    components: {
    },

    data() {
        return {
            dropdownIndex: null,

            tableHeaders: [
                { text: "Date" },
                { text: 'Adoption User' },
                { text: 'Status' },
                { text: 'Stray`s Informtion' },
                { text: '' } // Empty header cell if needed
            ],
            projects: [
                // {
                //     id: "1",
                //     date: "2024/12/5",
                //     image: require('@/assets/img/team-1-800x800.jpg').default,
                //     name: "kelvin",
                //     strayimage: require('@/assets/img/team-2-800x800.jpg').default,
                //     strayname: "kelvin123",
                //     status: "pending",
                // },
                // {
                //     id: "2",
                //     date: "2024/12/5",
                //     image: require('@/assets/img/team-1-800x800.jpg').default,
                //     name: "kelvin",
                //     strayimage: require('@/assets/img/team-2-800x800.jpg').default,
                //     strayname: "kelvin123",
                //     status: "rejected",
                // },
                // {
                //     id: "3",
                //     date: "2024/12/5",
                //     image: require('@/assets/img/team-1-800x800.jpg').default,
                //     name: "kelvin",
                //     strayimage: require('@/assets/img/team-2-800x800.jpg').default,
                //     strayname: "kelvin123",
                //     status: "approve",
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
        this.getAllCreatedPostApi()
    },
    methods: {
        async getAllCreatedPostApi() {
            this.getList = await getAdminAllApplicationList();

            for (let i = 0; i < this.getList.length; i++) {
                this.projects.push({
                    id: this.getList[i]["adoptionId"],
                    date: new Date(this.getList[i]["applicationDate"]).toISOString().split('T')[0],
                    image: this.getList[i]["user"]["userAvatar"],
                    name: this.getList[i]["user"]["firstName"] + " " + this.getList[i]["user"]["lastName"],
                    strayid: this.getList[i]["stray"]["strayId"],
                    strayimage: this.getList[i]["stray"]["mainPicture"],
                    strayname: this.getList[i]["stray"]["name"],
                    status: this.getList[i]["adoptionStatus"],
                });
            }

            this.isLoading = false;
        },

        toApplicationDetails(id) {
            // Push
            this.$router.push({
                path: '/admin/adminadoption',
                query: {
                    applicationID: id,
                },
            });
        },

        async approve(strayid, applicationid) {
            const originalStatus = this.updateProjectStatus(strayid, 'APPLICATION_SUCCESS');

            const result = await updateApplicationStatus("APPLICATION_SUCCESS", strayid, applicationid);

            if (!result) {
                this.updateProjectStatus(strayid, originalStatus);
            }
        },
        async reject(strayid, applicationid) {
            const originalStatus = this.updateProjectStatus(strayid, 'APPLICATION_FAILURE');

            const result = await updateApplicationStatus("APPLICATION_FAILURE", strayid, applicationid);

            if (!result) {
                this.updateProjectStatus(strayid, originalStatus);
            }
        },

        updateProjectStatus(id, newStatus) {
            const project = this.projects.find(project => project.strayid === id);
            if (project) {
                const originalStatus = project.status;
                project.status = newStatus;
                return originalStatus;
            }
            return null;
        },

        statusColor(status) {
            switch (status) {
                case 'APPLICATION_PENDING':
                    return 'text-orange-500';
                case 'APPLICATION_SUCCESS':
                    return 'text-emerald-500';
                case 'APPLICATION_FAILURE':
                    return 'text-red-500';
                default:
                    return 'text-gray-500';
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