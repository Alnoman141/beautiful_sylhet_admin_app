
const childrenRoutes = [
  
  {
    path: 'awareness',
    redirects: '/awareness/list',
    meta: {
      subject: "awareness",
      action: "show menu",
    },
    children: [
      {
        path: '',
        name: 'list',
        component: () => import('@/views/awareness/index.vue'),
        meta: {
          subject: "awareness",
          action: "show menu",
        },
      },
      {
        path: '/edit/:id',
        name: 'edit-awareness',
        component: () => import('@/views/awareness/awarenessForm.vue'),
        meta: {
          subject: "awareness",
          action: "edit",
        },
      },
     
    ],
  },

 
]

export const awarenessRoutes = [
  {
    path: '/awareness',
    name: 'awareness',
    redirects: '/list',
    meta: {
      subject: "awareness",
      action: "show menu",
    },
    children: [
      ...childrenRoutes,
    ],
  },
]
