export const atmRoutes = [
  {
    path: '/atm',
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
    children: [
      {
        path: '',
        name: 'atmList',
        component: () => import('@/views/atm/index.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
        },
      },
    
      {
        path: 'create-atm',
        name: 'createAtm',
        component: () => import('@/views/atm/create.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
          navActiveLink: 'atm',
        },
      },
      {
        path: 'edit-atm/:id',
        name: 'editAtm',
        component: () => import('@/views/atm/update.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
          navActiveLink: 'atm',
        },
      },
      
    ],
  },
]
    