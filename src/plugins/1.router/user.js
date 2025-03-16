export const userRoutes = [
  {
    path: '/user',

    // meta: {
    //   subject: "user",
    //   action: "show menu",
    // },
    children: [
      {
        path: '',
        name: 'userList',
        component: () => import('@/views/user/index.vue'),
        meta: {
          subject: "user",
          action: "show menu",
        },
      },
      {
        path: '/tourist-list',
        name: 'touristList',
        component: () => import('@/views/user/tourist.vue'),
        meta: {
          subject: "user",
          action: "show menu",
          navActiveLink: 'touristList',
        },
      },

      // complain
      {
        path: '/complain-list',
        name: 'complainList',
        component: () => import('@/views/user/complain.vue'),
        meta: {
          subject: "user",
          action: "show menu",
          navActiveLink: 'complainList',
        },
      },
      {
        path: '/user-activity',
        name: 'userActivity',
        component: () => import('@/views/user/activity.vue'),
        meta: {
          subject: "user",
          action: "show menu",
          navActiveLink: 'userActivity',
        },
      },
    
      {
        path: 'create-user',
        name: 'createUser',
        component: () => import('@/views/user/create.vue'),
        meta: {
          subject: "user",
          action: "create",
          navActiveLink: 'userList',
        },
      },
      {
        path: 'edit-user/:id',
        name: 'editUser',
        component: () => import('@/views/user/update.vue'),
        meta: {
          subject: "user",
          action: "edit",
          navActiveLink: 'userList',
        },
      },
      
    ],
  },
]
    