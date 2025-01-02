export const atmRoutes = [
  {
    path: '/atm',

    children: [
      {
        path: '',
        name: 'atmList',
        component: () => import('@/views/atm/index.vue'),
        meta: {
          subject: "atm",
          action: "show menu",
        },
      },
    
      {
        path: 'create-atm',
        name: 'createAtm',
        component: () => import('@/views/atm/create.vue'),
        meta: {
          subject: "atm",
          action: "create",
          navActiveLink: 'atmList',
        },
      },
      {
        path: 'edit-atm/:id',
        name: 'editAtm',
        component: () => import('@/views/atm/update.vue'),
        meta: {
          subject: "atm",
          action: "edit",
          navActiveLink: 'atmList',
        },
      },
      
    ],
  },
]
    