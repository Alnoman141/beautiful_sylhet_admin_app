export const fairRoutes = [
  {
    path: '/fair',

    // meta: {
    //   subject: "dangerzone",
    //   action: "show menu",
    // },
    children: [
      {
        path: '',
        name: 'fairList',
        component: () => import('@/views/fair/index.vue'),
        meta: {
          subject: "dangerzone",
          action: "show menu",
        },
      },
    
      {
        path: 'create-fair',
        name: 'createFair',
        component: () => import('@/views/fair/create.vue'),
        meta: {
          subject: "dangerzone",
          action: "create",
          navActiveLink: 'fairList',
        },
      },
      {
        path: 'edit-fair/:id',
        name: 'editFair',
        component: () => import('@/views/fair/update.vue'),
        meta: {
          subject: "dangerzone",
          action: "edit",
          navActiveLink: 'fairList',
        },
      },
      
    ],
  },
]
    