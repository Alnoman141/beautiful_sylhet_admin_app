export const guardRoutes = [
  {
    path: '/guard',
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
    children: [
      {
        path: '',
        name: 'guardList',
        component: () => import('@/views/guard/index.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
        },
      },
    
      {
        path: 'create-guard',
        name: 'createGuard',
        component: () => import('@/views/guard/create.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
          navActiveLink: 'guard',
        },
      },
      {
        path: 'edit-guard/:id',
        name: 'editGuard',
        component: () => import('@/views/guard/update.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
          navActiveLink: 'guard',
        },
      },
      
    ],
  },
]
    