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
            </div>
        </div>
        <div class="block w-full overflow-x-auto">
            <!-- Projects table -->
            <table class="items-center w-full bg-transparent border-collapse">
                <thead>
                    <tr>
                        <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                            :class="[
                                color === 'light'
                                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                    : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                            ]">
                            Date
                        </th>
                        <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                            :class="[
                                color === 'light'
                                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                    : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                            ]">
                            Adoption User
                        </th>
                        <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                            :class="[
                                color === 'light'
                                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                    : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                            ]">
                            Status
                        </th>
                        <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                            :class="[
                                color === 'light'
                                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                    : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                            ]">
                            Stray's Information
                        </th>
                        <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                            :class="[
                                color === 'light'
                                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                    : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                            ]">
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(project, index) in projects" :key="index">
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

                        <td
                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                            <table-dropdown />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import TableDropdown from "@/components/Dropdowns/TableDropdown.vue";


export default {
    components: {
        TableDropdown,
    },

    data() {
        return {
            projects: [
                {
                    date: "2024/12/5",
                    image: require('@/assets/img/team-1-800x800.jpg').default,
                    name: "kelvin",
                    strayimage: require('@/assets/img/team-2-800x800.jpg').default,
                    strayname: "kelvin123",
                    status: "completed",
                }
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
                case 'pending':
                    return 'text-orange-500';
                case 'completed':
                    return 'text-emerald-500';
                case 'delayed':
                    return 'text-red-500';
                case 'on schedule':
                    return 'text-teal-500';
                default:
                    return 'text-gray-500';
            }
        },
    }
}
</script>