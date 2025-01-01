export const kitkotRoutes = [
  {
    path: "/Kitkot-Chair",
    meta: {
      subject: "transport",
      action: "show menu",
    },
    children: [
      {
        path: "/Kitkot-Chair",
        name: "Kitkot Chair",
        component: () => import("@/views/services/kitkat.vue"),
        meta: {
          subject: "transport",
          action: "show menu",
        },
      },

      {
        path: "create-kitkot/:type",
        name: "createKitkot",
        component: () => import("@/views/services/create.vue"),
        meta: {
          subject: "transport",
          action: "show menu",
          navActiveLink: "Kitkot Chair",
        },
      },

      {
        path: "edit-kitkot/:id",
        name: "editKitkot",
        component: () => import("@/views/services/update.vue"),
        meta: {
          subject: "transport",
          action: "show menu",
          navActiveLink: "Kitkot Chair",
        },
      },

      {
        path: "edit-kitkot-description/:type",
        name: "editKitkotDescription",
        component: () => import("@/views/services/descriptionForm.vue"),
        meta: {
          subject: "transport",
          action: "show menu",
          navActiveLink: "Kitkot Chair",
        },
      },
    ],
  },
]
