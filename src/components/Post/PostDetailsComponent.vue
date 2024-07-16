<template>
    <div ref="postContainer" class="bg-mainTheme px-12 pt-8 pb-4 mb-2">
        <div class="flex items-center mb-4 justify-between">
            <div class="flex items-center">
                <img :src="post.userAvatar" alt="User Avatar" class="w-12 h-12 rounded-full mr-4" />
                <div class="text-sm">
                    <p class="font-semibold">{{ post.username }}</p>
                </div>
            </div>

            <p class="text-gray-700 whitespace-pre-line text-sm mr-2">{{ post.date }}</p>
        </div>
        <div class="mb-4">
            <h3 class="font-bold text-lg mb-2">{{ post.title }}</h3>
            <p class="text-gray-700 whitespace-pre-line">{{ post.description }}</p>
            <div class="flex flex-wrap mt-4">
                <div v-for="(image, index) in post.images" :key="index" class="relative w-32 h-32 mr-2 mb-2 ">
                    <img :src="image" alt="Post Image" class="w-full h-full object-cover rounded-lg" />
                </div>
            </div>
        </div>
        <div class="flex items-center justify-between">
            <button @click="likePost">
                <i :class="['text-2xl', post.isliked ? 'fas fa-heart text-red-500' : 'far fa-heart text-mainText']"></i>
            </button>

            <div class="flex space-x-2 flex-col mr-5">
                <div class="flex items-center">
                    <p class="text-gray-700 whitespace-pre-line text-sm mr-2">{{ post.duration }}</p>
                    <span class="material-icons" v-if="isAdoptionRoute"><img :src="vaccine" alt="vaccine"
                            class="w-8 h-8 p-1"></span>
                    <span class="material-icons" v-if="isAdoptionRoute"><img :src="worm" alt="warm"
                            class="w-8 h-8 p-1"></span>
                </div>
            </div>
        </div>

        <div class="pt-2 justify-end items-end flex" v-if="isAdoptionRoute">
            <button
                class="w-40 bg-secondaryMain text-mainText active:bg-secondTheme font-bold uppercase text-xs px-4 py-3 rounded-xl shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                @click="toCreateApplication"
                type="button">
                Adopt Now
            </button>
        </div>
    </div>
</template>

<script>
import vaccine from "@/assets/img/tabler_vaccine.png";
import worm from "@/assets/img/contrast_worm.png";

export default {
    name: "PostComponent",
    data() {
        return {
            vaccine,
            worm,

            containerWidth: 0,
            imageWidth: 128, // 32 (width) + 16 (margin-right)

            post: {
                id: 1,
                userAvatar: require('@/assets/img/team-1-800x800.jpg').default,
                username: "@Username1",
                date: "2024.04.05",
                title: "Doggy",
                description: "• Affectionate feline\n• Playful",
                images: [
                    require('@/assets/img/sketch.jpg').default,
                    require('@/assets/img/team-2-800x800.jpg').default,
                    require('@/assets/img/sketch.jpg').default,
                    require('@/assets/img/sketch.jpg').default,
                    require('@/assets/img/sketch.jpg').default,
                    require('@/assets/img/sketch.jpg').default,
                    require('@/assets/img/sketch.jpg').default,
                    require('@/assets/img/sketch.jpg').default
                ],
                isliked: true,
                duration: "21 months",
                isAdoption: true,
            },
        };
    },
    computed: {

        isAdoptionRoute() {
            return this.post.isAdoption;
        },
    },

    methods: {
        likePost() {
            this.$emit("like-post", this.post.id);
        },
        toCreateApplication() {
            this.$router.push('/user/createapplication')
        }
    },
};
</script>

<style scoped>
/* Additional scoped styles can go here if needed */
</style>