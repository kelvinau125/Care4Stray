<template>
    <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
        :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']">
        <div class="rounded-t mb-0 px-4 py-3 border-0">
            <div class="flex flex-wrap items-center">
                <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 class="font-semibold text-lg" :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']">
                        User's List
                    </h3>
                </div>
                <!-- <button
                    class="bg-emerald-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
                    <tr v-for="(project, index) in projects" :key="index" @click="toUserProfile(project.id)">
                        <th
                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                            <img :src="project.image" class="h-12 w-12 bg-white rounded-full border" alt="..." />
                            <span class="ml-3 font-bold" :class="[
                                color === 'light' ? 'text-blueGray-600' : 'text-white',
                            ]">
                                {{ project.name }}
                            </span>
                        </th>

                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div class="flex pl-10">
                                <i :class="project.isAdopted === 'yes' ? 'fas fa-check' : 'fas fa-times'"></i>
                            </div>
                        </td>

                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div class="flex pl-10">
                                {{ project.numberAdopted }}
                            </div>
                        </td>

                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <i :class="['fas fa-circle', statusColor(project.status), 'mr-2']"></i>
                            {{ project.status }}
                        </td>

                        <td
                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right" @click.native.stop="toggleDropdown(index)">
                            <div>
                                <a class="text-blueGray-500 py-1 px-3" href="#pablo" ref="btnDropdownRef"
                                    v-on:click="toggleDropdown(index, $event)">
                                    <i class="fas fa-ellipsis-v"></i>
                                </a>
                                <div ref="popoverDropdownRef"
                                    class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                                    :class="{
                                        hidden: dropdownIndex !== index,
                                        block: dropdownIndex === index,
                                    }" >
                                    <a href="javascript:void(0);"
                                        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                                        {{ project.status == "active"  ? "Inactive" : "Active" }}
                                    </a>
                                </div>
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

export default {
    components: {
    },

    data() {
        return {
            dropdownIndex: null,
            tableHeaders: [
                { text: 'User`s Name' },
                { text: 'Is Adopted Stray' },
                { text: 'Total Adopted Stray' },
                { text: 'Status' },
                { text: '' } // Empty header cell if needed
            ],
            projects: [
                {
                    id: "1",
                    image: require('@/assets/img/team-1-800x800.jpg').default,
                    name: "kelvin",
                    isAdopted: "yes",
                    numberAdopted: "1",
                    status: "active",
                },
                {
                    id: "2",
                    image: require('@/assets/img/team-1-800x800.jpg').default,
                    name: "kelvin",
                    isAdopted: "yes",
                    numberAdopted: "1",
                    status: "active",
                },
                {
                    id: "3",
                    image: require('@/assets/img/team-1-800x800.jpg').default,
                    name: "kelvin",
                    isAdopted: "yes",
                    numberAdopted: "1",
                    status: "inactive",
                },
                {
                    id: "4",
                    image: require('@/assets/img/team-1-800x800.jpg').default,
                    name: "kelvin",
                    isAdopted: "yes",
                    numberAdopted: "1",
                    status: "active",
                },
            ]
        }
    },
    props: {
        color: {
            type: String,
            default: 'light'
        },
    },
    methods: {
        statusColor(status) {
            switch (status) {
                case 'active':
                    return 'text-emerald-500';
                case 'inactive':
                    return 'text-red-500';
                default:
                    return 'text-gray-500';
            }
        },

        toUserProfile(id) {
            // Push
            this.$router.push({
                path: '/admin/viewprofile',
                query: {
                    userID: id,
                },
            });
        },

        toggleDropdown(index, event) {
            event.preventDefault();
            this.dropdownIndex = this.dropdownIndex === index ? null : index;
            this.$nextTick(() => {
                if (this.dropdownIndex !== null) {
                    createPopper(this.$refs[`btnDropdownRef_${index}`][0], this.$refs[`popoverDropdownRef_${index}`][0], {
                        placement: "bottom-start",
                    });
                    document.addEventListener('click', this.handleClickOutsideDropdown);
                } else {
                    document.removeEventListener('click', this.handleClickOutsideDropdown);
                }
            });
        },

        handleClickOutsideDropdown(event) {
            const dropdown = this.$refs[`popoverDropdownRef_${this.dropdownIndex}`][0];
            const button = this.$refs[`btnDropdownRef_${this.dropdownIndex}`][0];
            if (dropdown && !dropdown.contains(event.target) && button && !button.contains(event.target)) {
                this.dropdownIndex = null;
                document.removeEventListener('click', this.handleClickOutsideDropdown);
            }
        }
    }
}
</script>
