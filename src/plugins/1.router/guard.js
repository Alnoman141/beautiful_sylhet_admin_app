export const guardRoutes = [
  {
    path: '/guard',
    meta: {
      subject: "guard",
      action: "show menu",
    },
    children: [
      {
        path: '',
        name: 'guardList',
        component: () => import('@/views/guard/index.vue'),
        meta: {
          subject: "guard",
          action: "show menu",
        },
      },
    
      {
        path: 'create-guard',
        name: 'createGuard',
        component: () => import('@/views/guard/create.vue'),
        meta: {
          subject: "guard",
          action: "show menu",
          navActiveLink: 'guardList',
        },
      },
      {
        path: 'edit-guard/:id',
        name: 'editGuard',
        component: () => import('@/views/guard/update.vue'),
        meta: {
          subject: "guard",
          action: "show menu",
          navActiveLink: 'guardList',
        },
      },
      
    ],
  },
]
    