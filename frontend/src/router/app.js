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
      ],
   },
];

export default app;
