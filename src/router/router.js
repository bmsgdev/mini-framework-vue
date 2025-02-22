import { createRouter, createWebHistory } from "vue-router";
import AdminView from "@/views/AdminView.vue";
import UserView from "@/views/UserView.vue";

const routes = [
  { path: "/", component: AdminView, name: "Admin" },
  { path: "/utilisation", component: UserView, name: "User" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
