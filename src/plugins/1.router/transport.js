export const transportRoutes = [
  {
    path: '/transport',
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
    children: [
      {
        path: '',
        name: 'transportList',
        component: () => import('@/views/transport/index.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
        },
      },
    
      {
        path: 'create-transport',
        name: 'createTransport',
        component: () => import('@/views/transport/create.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
          navActiveLink: 'transport',
        },
      },
      {
        path: 'edit-transport/:id',
        name: 'editTransport',
        component: () => import('@/views/transport/update.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
          navActiveLink: 'transport',
        },
      },
      
    ],
  },
]
    