export const lockerRoutes = [
  {
    path: '/locker',
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
    children: [
      {
        path: '',
        name: 'lockerList',
        component: () => import('@/views/locker/index.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
        },
      },
    
      {
        path: 'create-locker',
        name: 'createLocker',
        component: () => import('@/views/locker/create.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
          navActiveLink: 'locker',
        },
      },
      {
        path: 'edit-locker/:id',
        name: 'editLocker',
        component: () => import('@/views/locker/update.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
          navActiveLink: 'locker',
        },
      },
      
    ],
  },
]
    