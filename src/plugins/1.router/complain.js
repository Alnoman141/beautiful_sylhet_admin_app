export const complainRoutes = [
  {
    path: '/complain',
    children: [
      {
        path: '',
        name: 'complainList',
        component: () => import('@/views/complain/index.vue'),
        meta: {
          subject: "dangerzone",
          action: "show menu",
        },
      },
      {
        path: 'complain-chat',
        name: 'complainChatList',
        component: () => import('@/views/complain/chat.vue'),
        meta: {
          subject: "dangerzone",
          action: "show menu",
        },
      },
    
      {
        path: 'create-complain',
        name: 'createComplain',
        component: () => import('@/views/complain/create.vue'),
        meta: {
          subject: "dangerzone",
          action: "create",
          navActiveLink: 'complainList',
        },
      },
      {
        path: 'edit-complain/:id',
        name: 'editComplain',
        component: () => import('@/views/complain/update.vue'),
        meta: {
          subject: "dangerzone",
          action: "edit",
          navActiveLink: 'complainList',
        },
      },
     
      
    ],
  },
]
    