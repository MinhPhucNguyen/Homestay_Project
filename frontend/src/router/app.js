const app = [
   {
      path: "/",
      component: () => import("../layouts/app.vue"),
      meta: {
         permission: "user",
      },
      children: [
         {
            path: "/",
            component: () => import("../pages/HomePage/HomePage.vue"),
            name: "home",
         },
         {
            path: "authorize/:provider/callback",
            component: () => import("@/components/Auth/LoginSocial.vue"),
            name: "socialLogin",
            meta: {
               hideFooter: true,
               hideNavbar: true,
            },
         },
      ],
   },
];

export default app;
