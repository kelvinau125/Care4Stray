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
                    <tr v-for="(project, index) in projects" :key="index">
                        <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
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
            tableHeaders: [
                { text: "Title" },
                { text: 'Date' },
                { text: 'Author' },
                { text: 'Status' },
                { text: '' }
            ],
            projects: [
                {
                    title: "Rescued dog 'trapped for several days' down well",
                    date: "2024/4/24",
                    author: "Hello Kitty",
                    status: "active",
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
                case 'active':
                    return 'text-emerald-500';
                case 'deactivate':
                    return 'text-red-500';
                default:
                    return 'text-gray-500';
            }
        },
    }
}
</script>