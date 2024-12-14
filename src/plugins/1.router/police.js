export const policeRoutes = [
  {
    path: '/police',
    meta: {
      subject: "police",
      action: "show menu",
    },
    children: [
      {
        path: '',
        name: 'policeList',
        component: () => import('@/views/police/index.vue'),
        meta: {
          subject: "police",
          action: "show menu",
        },
      },
    
      {
        path: 'create-police',
        name: 'createPolice',
        component: () => import('@/views/police/create.vue'),
        meta: {
          subject: "police",
          action: "show menu",
          navActiveLink: 'policeList',
        },
      },
      {
        path: 'edit-police/:id',
        name: 'editPolice',
        component: () => import('@/views/police/update.vue'),
        meta: {
          subject: "police",
          action: "show menu",
          navActiveLink: 'policeList',
        },
      },
      
    ],
  },
]
    