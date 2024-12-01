
const childrenRoutes = [
  
  {
    path: 'banks',
    redirects: '/banks/bank',
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
    children: [
      {
        path: '',
        name: 'bank',
        component: () => import('@/views/banks/bank/index.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
        },
      },
      {
        path: '/atm',
        name: 'atm',
        component: () => import('@/views/banks/atm/index.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
        },
      },
     
    ],
  },

 
]

export const bankRoutes = [
  {
    path: '/banks',
    name: 'banks',
    redirects: '/bank',
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
    children: [
      ...childrenRoutes,
    ],
  },
]
