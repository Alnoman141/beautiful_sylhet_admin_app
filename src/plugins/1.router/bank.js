export const bankRoutes = [
  {
    path: '/bank',
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
    children: [
      {
        path: '',
        name: 'bankList',
        component: () => import('@/views/bank/index.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
        },
      },
    
      {
        path: 'create-bank',
        name: 'createBank',
        component: () => import('@/views/bank/create.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
          navActiveLink: 'bankList',
        },
      },
      {
        path: 'edit-bank/:id',
        name: 'editBank',
        component: () => import('@/views/bank/update.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
          navActiveLink: 'bankList',
        },
      },
      
    ],
  },
]
    