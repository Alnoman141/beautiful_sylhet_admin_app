export const servicesRoutes = [
  {
    path: '/Tourism-Corporation',
    meta: {
      subject: "transport",
      action: "show menu",
    },
    children: [
      {
        path: '',
        name: 'Tourism Corporation',
        component: () => import('@/views/services/index.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
        },
      },
      {
        path: '/DC-Activities',
        name: 'DC Activities',
        component: () => import('@/views/services/dc.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
        },
      },
      {
        path: '/Tourist-Bus',
        name: 'Tourist Bus',
        component: () => import('@/views/services/bus.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
        },
      },
      {
        path: '/Kitkot-Chair',
        name: 'Kitkot Chair',
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
          navActiveLink: 'Tourism Corporation',
        },
      },
      {
        path: 'create-dc/:type',
        name: 'createDc',
        component: () => import('@/views/services/create.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
          navActiveLink: 'DC Activities',
        },
      },
      {
        path: 'create-bus/:type',
        name: 'createBus',
        component: () => import('@/views/services/create.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
          navActiveLink: 'Tourist Bus',
        },
      },
      {
        path: 'create-kitkot/:type',
        name: 'createKitkot',
        component: () => import('@/views/services/create.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
          navActiveLink: 'Kitkot Chair',
        },
      },
    

      {
        path: 'edit-tourism/:id',
        name: 'editTourism',
        component: () => import('@/views/services/update.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
          navActiveLink: 'Tourism Corporation',
        },
      },
      {
        path: 'edit-dc/:id',
        name: 'editDc',
        component: () => import('@/views/services/update.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
          navActiveLink: 'DC Activities',
        },
      },
      {
        path: 'edit-bus/:id',
        name: 'editBus',
        component: () => import('@/views/services/update.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
          navActiveLink: 'Tourist Bus',
        },
      },
      {
        path: 'edit-kitkot/:id',
        name: 'editKitkot',
        component: () => import('@/views/services/update.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
          navActiveLink: 'Kitkot Chair',
        },
      },
      {
        path: 'edit-tourism-description/:type',
        name: 'editTourismDescription',
        component: () => import('@/views/services/descriptionForm.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
          navActiveLink: 'Tourism Corporation',
        },
      },
      {
        path: 'edit-dc-description/:type',
        name: 'editDcDescription',
        component: () => import('@/views/services/descriptionForm.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
          navActiveLink: 'DC Activities',
        },
      },
      {
        path: 'edit-bus-description/:type',
        name: 'editBusDescription',
        component: () => import('@/views/services/descriptionForm.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
          navActiveLink: 'Tourist Bus',
        },
      },
      {
        path: 'edit-kitkot-description/:type',
        name: 'editKitkotDescription',
        component: () => import('@/views/services/descriptionForm.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
          navActiveLink: 'Kitkot Chair',
        },
      },

    ],
  },
]
    