import { createRouter, createWebHashHistory } from "vue-router";
import HelloWorld from "../views/HelloWorld.vue";
import AboutView from "../views/AboutView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HelloWorld,
  },
  {
    path: "/about/:Pid",
    name: "about",
    component: AboutView,
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
