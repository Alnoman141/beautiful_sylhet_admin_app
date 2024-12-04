export const policeRoutes = [
  {
    path: '/police',
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
    children: [
      {
        path: '',
        name: 'policeList',
        component: () => import('@/views/police/index.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
        },
      },
    
      {
        path: 'create-police',
        name: 'createPolice',
        component: () => import('@/views/police/create.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
          navActiveLink: 'police',
        },
      },
      {
        path: 'edit-police/:id',
        name: 'editPolice',
        component: () => import('@/views/police/update.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
          navActiveLink: 'police',
        },
      },
      
    ],
  },
]
    