export const complainRoutes = [
  {
    path: '/complain',
    children: [
     
      {
        path: 'complain-list',
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
    