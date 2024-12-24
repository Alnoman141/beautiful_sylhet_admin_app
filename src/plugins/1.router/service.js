export const servicesRoutes = [
  {
    path: '/tourismHelpline',
    meta: {
      subject: "transport",
      action: "show menu",
    },
    children: [
      {
        path: '',
        name: 'tourismHelpline',
        component: () => import('@/views/services/index.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
        },
      },
      {
        path: '/dcHelpline',
        name: 'dcHelpline',
        component: () => import('@/views/services/dc.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
        },
      },
      {
        path: '/busService',
        name: 'busService',
        component: () => import('@/views/services/bus.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
        },
      },
      {
        path: '/kitkatChair',
        name: 'kitkatChair',
        component: () => import('@/views/services/kitkat.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
        },
      },
      {
        path: 'create-tourism/:type',
        name: 'createTourism',
        component: () => import('@/views/services/create.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
          navActiveLink: 'tourismHelpline',
        },
      },
      {
        path: 'create-dc/:type',
        name: 'createDc',
        component: () => import('@/views/services/create.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
          navActiveLink: 'dcHelpline',
        },
      },
      {
        path: 'create-bus/:type',
        name: 'createBus',
        component: () => import('@/views/services/create.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
          navActiveLink: 'busService',
        },
      },
      {
        path: 'create-kitkat/:type',
        name: 'createKitkat',
        component: () => import('@/views/services/create.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
          navActiveLink: 'kitkatChair',
        },
      },
    

      {
        path: 'edit-tourism/:id',
        name: 'editTourism',
        component: () => import('@/views/services/update.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
          navActiveLink: 'tourismHelpline',
        },
      },
      {
        path: 'edit-dc/:id',
        name: 'editDc',
        component: () => import('@/views/services/update.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
          navActiveLink: 'dcHelpline',
        },
      },
      {
        path: 'edit-bus/:id',
        name: 'editBus',
        component: () => import('@/views/services/update.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
          navActiveLink: 'busService',
        },
      },
      {
        path: 'edit-kitkat/:id',
        name: 'editKitkat',
        component: () => import('@/views/services/update.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
          navActiveLink: 'kitkatChair',
        },
      },
      {
        path: 'edit-tourism-description/:type',
        name: 'editTourismDescription',
        component: () => import('@/views/services/descriptionForm.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
          navActiveLink: 'tourismHelpline',
        },
      },
      {
        path: 'edit-dc-description/:type',
        name: 'editDcDescription',
        component: () => import('@/views/services/descriptionForm.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
          navActiveLink: 'dcHelpline',
        },
      },
      {
        path: 'edit-bus-description/:type',
        name: 'editBusDescription',
        component: () => import('@/views/services/descriptionForm.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
          navActiveLink: 'busService',
        },
      },
      {
        path: 'edit-kitkat-description/:type',
        name: 'editKitkatDescription',
        component: () => import('@/views/services/descriptionForm.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
          navActiveLink: 'kitkatChair',
        },
      },

    ],
  },
]
    