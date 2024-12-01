
const childrenRoutes = [
  
  {
    path: 'awareness',
    redirects: '/awareness/list',
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
    children: [
      {
        path: '',
        name: 'list',
        component: () => import('@/views/awareness/index.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
        },
      },
      {
        path: '/edit/:id',
        name: 'edit/:id',
        component: () => import('@/views/awareness/awarenessForm.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
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
      subject: "Dashboard",
      action: "show menu",
    },
    children: [
      ...childrenRoutes,
    ],
  },
]
