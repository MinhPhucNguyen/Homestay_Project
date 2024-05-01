import { createRouter, createWebHistory } from "vue-router";
import app from "./app";
const routes = [...app];

const router = createRouter({
   history: createWebHistory(process.env.BASE_URL),
   routes: routes,
});

export default router;
