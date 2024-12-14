export const transportRoutes = [
  {
    path: '/transport',
    meta: {
      subject: "transport",
      action: "show menu",
    },
    children: [
      {
        path: '',
        name: 'transportList',
        component: () => import('@/views/transport/index.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
        },
      },
    
      {
        path: 'create-transport',
        name: 'createTransport',
        component: () => import('@/views/transport/create.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
          navActiveLink: 'transportList',
        },
      },
      {
        path: 'edit-transport/:id',
        name: 'editTransport',
        component: () => import('@/views/transport/update.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
          navActiveLink: 'transportList',
        },
      },
      
    ],
  },
]
    