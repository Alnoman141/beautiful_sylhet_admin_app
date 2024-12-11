export const atmRoutes = [
  {
    path: '/atm',
    meta: {
      subject: "Atm",
      action: "show menu",
    },
    children: [
      {
        path: '',
        name: 'atmList',
        component: () => import('@/views/atm/index.vue'),
        meta: {
          subject: "Atm",
          action: "show menu",
        },
      },
    
      {
        path: 'create-atm',
        name: 'createAtm',
        component: () => import('@/views/atm/create.vue'),
        meta: {
          subject: "Atm",
          action: "create",
          navActiveLink: 'atmList',
        },
      },
      {
        path: 'edit-atm/:id',
        name: 'editAtm',
        component: () => import('@/views/atm/update.vue'),
        meta: {
          subject: "Atm",
          action: "edit",
          navActiveLink: 'atmList',
        },
      },
      
    ],
  },
]
    