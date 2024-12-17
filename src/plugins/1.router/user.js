export const userRoutes = [
  {
    path: '/user',
    meta: {
      subject: "user",
      action: "show menu",
    },
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
        path: '/user-activity',
        name: 'userActivity',
        component: () => import('@/views/user/activity.vue'),
        meta: {
          subject: "user",
          action: "show menu",
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
    