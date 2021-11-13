import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Email from "../components/Email.vue";
import Table from "../components/Table.vue";
import Login from "../components/Login.vue";
//import { component } from "vue/types/umd";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/email",
    name: "Email",
    component: Email,
  },
  {
    path: "/table",
    name: "Table",
    component: Table,
  },
  {
    path: "/raised",
    name: "Raised",
    component: () => import("../components/Raised.vue"),
  },

  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
