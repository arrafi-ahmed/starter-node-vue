// Composables
import {createRouter, createWebHistory} from "vue-router";

const routes = [
  {
    path: "/",
    component: import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "signin",
        name: "signin",
        component: import("@/views/Signin.vue"),
        meta: {
          requiresNoAuth: true,
          title: "Signin",
        },
      },
      {
        path: "signout",
        name: "signout",
        component: import("@/views/Signout.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "register",
        name: "register",
        component: import("@/views/Register.vue"),
        meta: {
          requiresNoAuth: true,
          title: "Register",
        },
      },
      {
        path: "home",
        name: "home",
        component: import("@/views/Home.vue"),
        meta: {
          requiresAuth: true,
          title: "Home",
        },
      },
    ],
  },
  {
    path: "",
    redirect: {name: "home"},
  },
  {
    path: "/not-found/:status?/:message?",
    name: "not-found",
    component: () => import("@/views/NotFound.vue"),
    props: (route) => ({
      status: route.params.status || 404,
      message: route.params.message || "Looks like you're lost!",
    }),
    meta: {},
  },
  {
    path: "/:catchAll(.*)",
    redirect: {
      name: "not-found",
      params: {status: 404, message: "Looks like you're lost!"},
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
