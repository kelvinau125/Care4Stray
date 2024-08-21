<template>
    <div ref="postContainer" class="bg-mainTheme px-12 pt-8 pb-4 mb-2">
        <div class="flex items-center mb-4 justify-between">
            <div class="flex items-center">
                <img :src="post.userAvatar" alt="User Avatar" class="w-12 h-12 rounded-full mr-4 cursor-pointer"
                    @click.stop="toUserPost(post.userId)" />
                <div class="text-sm">
                    <p class="font-semibold">{{ post.username }}</p>
                </div>
            </div>

            <p class="text-gray-700 whitespace-pre-line text-sm mr-2">{{ post.date }}</p>
        </div>
        <div class="mb-4">
            <h3 class="font-bold text-lg mb-2">{{ post.title }}</h3>
            <p class="text-gray-700 whitespace-pre-line ml-2" v-if="isAdoptionRoute">
            <ul>
                <li v-for="(item, index) in post.description" :key="index">
                    • {{ item }}
                </li>
            </ul>
            </p>
            <div class="flex flex-wrap mt-4">
                <div v-for="(image, index) in post.images" :key="index" class="relative w-32 h-32 mr-2 mb-2 ">
                    <img :src="image" alt="Post Image" class="w-full h-full object-cover rounded-lg" />
                </div>
            </div>
        </div>
        <div class="flex items-center justify-between">
            <div class="flex space-x-4">
                <div @click.stop="likePost(post.id)" class="flex items-center justify-center cursor-pointer">
                    <i
                        :class="['text-2xl', post.isliked ? 'fas fa-heart text-red-500' : 'far fa-heart text-mainText']"></i>
                    <span class="ml-2">{{ post.likeCount }}</span>
                </div>

                <div class="flex items-center justify-center cursor-pointer">
                    <i class="far fa-comment text-2xl"></i>
                    <!-- <span class="ml-2">{{ post.commentCount }}</span> -->
                </div>
            </div>


            <div class="flex space-x-2 flex-col mr-5">
                <div class="flex items-center">
                    <p class="text-gray-700 whitespace-pre-line text-sm mr-2">{{ post.duration }}</p>
                    <span class="material-icons" v-if="isAdoptionRoute && post.isVaccinated"><img :src="vaccine"
                            alt="vaccine" class="w-8 h-8 p-1"></span>
                    <span class="material-icons" v-if="isAdoptionRoute && post.isDewormed"><img :src="worm" alt="warm"
                            class="w-8 h-8 p-1"></span>
                </div>
            </div>
        </div>

        <div class="pt-2 justify-end items-end flex" v-if="isAdoptionRoute">
            <button
                class="w-40 bg-secondaryMain text-mainText active:bg-secondTheme font-bold uppercase text-xs px-4 py-3 rounded-xl shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                @click="toCreateApplication" type="button">
                Adopt Now
            </button>
        </div>
    </div>
</template>

<script>
import vaccine from "@/assets/img/tabler_vaccine.png";
import worm from "@/assets/img/contrast_worm.png";

import { getPostDetails, likeorUnlike } from "@/service/apiProviderPost";

export default {
    name: "PostComponent",
    data() {
        return {
            vaccine,
            worm,

            containerWidth: 0,
            imageWidth: 128, // 32 (width) + 16 (margin-right)

            post: {
                id: "",
                userId: "",
                userAvatar: "https://res.cloudinary.com/dfmnw3bin/image/upload/v1722330239/default_avatar.jpg",
                username: "",
                date: "",
                title: "",
                description: "",
                images: [],
                isliked: null,
                duration: "",
                isAdoption: null,
            },

            postID: this.$route.query.postID,
        };
    },
    computed: {

        isAdoptionRoute() {
            return this.post.isAdoption;
        },
    },
    mounted() {
        this.getPostDetailsApi();
    },
    methods: {
        toUserPost(id) {
            // Push
            this.$router.push({
                path: '/user/ownpost',
                query: {
                    postID: id,
                },
            });
        },
        async getPostDetailsApi() {
            this.getList = await getPostDetails(this.postID);

            this.post.id = this.getList['postId']
            this.post.userId = this.getList['author']['id']
            this.post.userAvatar = this.getList['author']['userAvatar']
            this.post.username = this.getList['author']['firstName'] + " " + this.getList['author']['lastName'],
            this.post.date = new Date(this.getList["createdDate"]).toISOString().split('T')[0]
            this.post.title = this.getList['content']
            this.post.description = this.getList['content']
            this.post.images = this.getList['picture']
            this.post.isliked = this.getList['isliked']
            this.post.duration = this.getList['duration']
            this.post.isAdoption = this.getList['isAdoption']
            this.post.likeCount = this.getList['likeCount']
            this.post.commentCount = this.getList['commentCount']

            this.post.isVaccinated = this.getList["strayPost"]["isVaccinated"]
            this.post.isDewormed = this.getList["strayPost"]["isDewormed"]
            this.post.title = this.getList['strayPost']['name']
            this.post.images = this.getList["strayPost"]["pictureUrl"]
            this.post.description = this.getList["strayPost"]["behaviour"]
        },
        async likePost(postId) {
            // Optimistically update the UI
            const originalIsLiked = this.post.isliked;
            this.post.isliked = !this.post.isliked;
            this.post.likeCount += this.post.isliked ? 1 : -1;

            // Make the API call
            const result = await likeorUnlike(postId);

            // Revert if the API call fails
            if (!result) {
                this.post.isliked = originalIsLiked;
                this.post.likeCount += this.post.isliked ? 1 : -1;
            }
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