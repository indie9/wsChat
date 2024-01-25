import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/users",
      name: "users",
      component: () => import("../views/UsersView.vue"),
    },
    {
      path: "/chats",
      name: "chats",
      props: true,
      component: () => import("../views/ChatsView.vue"),
      children: [
        {
          path: ":id",
          name: "room",
          props: true,
          component: () => import("../components/Chat.vue"),
        }
      ],
    },
    // {
    //   path: "/room/:id",
    //   name: "room",
    //   props: true,
    //   component: () => import("../components/Chat.vue"),
    // },
    {
      path: "/auth",
      name: "auth",
      component: () => import("../views/AuthView.vue"),
      children: [
        {
          path: "login",
          component: () => import("../components/AuthForm.vue"),
        },
        {
          path: "registration",
          component: () => import("../components/RegistrationForm.vue"),
        },
      ],
    },
  ],
});

export default router;
