import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";

// styles
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";

// mouting point for the whole app

import App from "@/App.vue";

// layouts

import Admin from "@/layouts/Admin.vue";
import Auth from "@/layouts/Auth.vue";
import User from "@/layouts/User.vue";

// views for Admin layout

import Dashboard from "@/views/admin/Dashboard.vue";
import Settings from "@/views/admin/Settings.vue";
import Tables from "@/views/admin/Tables.vue";
import Maps from "@/views/admin/Maps.vue";

// views for Auth layout

import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";
import RegisterModal from "@/views/auth/RegisterModal.vue";

// views for User layout

import News from "@/views/user/News.vue";
import NearMe from "@/views/user/NearMe.vue";
import Adoption from "@/views/user/Adoption.vue";
import notification from "@/views/user/Notification.vue";
import application from "@/views/user/Application.vue";
import applicationdetails from "@/views/user/ApplicationDetails.vue";
import createapplication from "@/components/Application/CreateApplication.vue";
import postdetails from "@/views/user/PostDetails.vue";

// views without layouts

import ContactUs from "@/views/ContactUs.vue";
import Donation from "@/views/Donation.vue";
import Landing from "@/views/Landing.vue";
import Profile from "@/views/Profile.vue";
import Index from "@/views/Index.vue";
import Main from "@/views/Main.vue";

import UserNavbar from "@/components/Navbars/UserNavbar.vue";

// routes

const routes = [
  {
    path: "/admin",
    redirect: "/admin/dashboard",
    component: Admin,
    children: [
      {
        path: "/admin/dashboard",
        component: Dashboard,
      },
      {
        path: "/admin/settings",
        component: Settings,
      },
      {
        path: "/admin/tables",
        component: Tables,
      },
      {
        path: "/admin/maps",
        component: Maps,
      },
    ],
  },
  {
    path: "/auth",
    redirect: "/auth/login",
    component: Auth,
    children: [
      {
        path: "/auth/login",
        component: Login,
      },
      {
        path: "/auth/register",
        component: Register,
      },
    ],
  },
  {
    path: "/user",
    redirect: "/user/news",
    component: User,
    children: [
      {
        path: "/user/news",
        component: News,
      },
      {
        path: "/user/nearme",
        component: NearMe,
      },
      {
        path: "/user/adoption",
        component: Adoption,
      },
      {
        path: "/user/notification",
        component: notification,
      },
      {
        path: "/user/application",
        component: application,
      },
      {
        path: "/user/applicationdetails",
        component: applicationdetails,
      },
      {
        path: "/user/editapplicationdetails",
        component: applicationdetails,
      },
      {
        path: "/user/createapplication",
        component: createapplication,
      },
      {
        path: "/user/postdetails",
        component: postdetails,
      },
    ],
  },
  {
    path: "/landing",
    component: Landing,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/",
    component: Main,
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
  {
    path: "/index",
    component: Index
  },
  {
    path: "/registermodal",
    component: RegisterModal
  },
  {
    path: "/contactus",
    component: ContactUs
  },
  {
    path: "/donation",
    component: Donation
  },
  {
    path: "/UserNavbar",
    component: UserNavbar
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
