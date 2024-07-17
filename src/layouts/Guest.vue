<template>
    <div>
        <auth-navbar />

        <div class="md:pt-16">
            <!-- Main Content -->
            <div class="w-full">
                <div class="w-full md:flex-grow bg-white px-4 md:px-10 mx-auto md:pt-4 relative">
                    <NewsContent />
                </div>
                <div class="w-full bg-secondaryMain flex flex-col items-center">
                    <div class="w-4/5">
                        <NewsFooter />
                        <footer-admin />
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import AuthNavbar from "@/components/Navbars/AuthNavbar.vue";
import FooterAdmin from "@/components/Footers/FooterAdmin.vue";
import NewsFooter from "@/components/News/NewsFooter.vue";
import NewsContent from "@/components/News/NewsContent.vue";

export default {
    name: "UserLayout",
    components: {
        AuthNavbar,
        FooterAdmin,
        NewsFooter,
        NewsContent,
    },
};
</script>

<style scoped>
@media (min-width: 768px) {
    .md\\:fixed {
        position: fixed;
    }
}
</style>