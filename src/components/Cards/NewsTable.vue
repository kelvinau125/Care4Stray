<template>
    <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
        :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']">
        <div class="rounded-t mb-0 px-4 py-3 border-0">
            <div class="flex flex-wrap items-center">
                <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 class="font-semibold text-lg" :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']">
                        New's List
                    </h3>
                </div>

                <button
                    class="bg-emerald-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button" @click="toCreateNews()">
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

                    <tr v-else v-for="(project, index) in projects" :key="index">
                        <th
                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs p-4 max-w-200-px truncate">
                            <div class="flex">
                                {{ project.title }}
                            </div>
                        </th>

                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div class="flex">
                                {{ project.date }}
                            </div>
                        </td>

                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div class="flex">
                                {{ project.author }}
                            </div>
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
                                    @click.native.stop="toEditNews(project.id)">
                                    EDIT
                                </a>
                                <a href="javascript:void(0);"
                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                                    @click.native.stop="toUpdateStatus(project.id, project.status)">
                                    {{ project.status == "ACTIVE" ? "INACTIVE" : "ACTIVE" }}
                                </a>
                                <a href="javascript:void(0);"
                                    class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                                    @click.native.stop="toDeleteNews(project.id)">
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

import { updateNewsStatus, getNewsListAdmin } from '@/service/apiProviderNews';

export default {
    components: {
    },

    data() {
        return {
            dropdownIndex: null,

            tableHeaders: [
                { text: "Title" },
                { text: 'Date' },
                { text: 'Author' },
                { text: 'Status' },
                { text: '' }
            ],
            projects: [
                // {
                //     id: "1",
                //     title: "Rescued dog 'trapped for several days' down well",
                //     date: "2024/4/24",
                //     author: "Hello Kitty",
                //     status: "active",
                // },
                // {
                //     id: "2",
                //     title: "Rescued dog 'trapped for several days' down well",
                //     date: "2024/4/24",
                //     author: "Hello Kitty",
                //     status: "inactive",
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
        this.generateNewsLists()
    },
    methods: {
        async generateNewsLists() {
            this.getNewsList = await getNewsListAdmin();
            for (let i = 0; i < this.getNewsList.length; i++) {
                this.projects.push({
                    id: this.getNewsList[i]["id"],
                    title: this.getNewsList[i]["title"],
                    date: new Date(this.getNewsList[i]["createdDate"]).toISOString().split('T')[0],
                    author: this.getNewsList[i]["author"],
                    status: this.getNewsList[i]["status"],
                });
            }

            this.isLoading = true;
        },

        statusColor(status) {
            switch (status) {
                case 'ACTIVE':
                    return 'text-emerald-500';
                case 'INACTIVE':
                    return 'text-gray-500';
                default:
                    return 'text-red-500';
            }
        },

        async toUpdateStatus(id, status) {
           
            const newStatus = status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
            
            const result = await updateNewsStatus(id,newStatus);

            this.hideDropdown();
            
            if (result) {
                // Find the index of the project in the projects array
                const projectIndex = this.projects.findIndex(project => project.id === id);
                if (projectIndex !== -1) {
                    // Update the status of the specific project
                    this.projects[projectIndex].status = newStatus;
                }
            }
        },

        async toDeleteNews(id) {
            const result = await updateNewsStatus(id, "DEACTIVATED");

            if (result) {
                // Find the index of the project in the projects array
                const projectIndex = this.projects.findIndex(project => project.id === id);
                if (projectIndex !== -1) {
                     // Remove the specific project from the array
                    this.projects.splice(projectIndex, 1);
                }
            }
        },

        toCreateNews() {
            // Push
            this.$router.push({
                path: '/admin/createnews',
            });
        },

        toEditNews(id) {
            // Push
            this.$router.push({
                path: '/admin/editnews',
                query: {
                    newsID: id,
                },
            });
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