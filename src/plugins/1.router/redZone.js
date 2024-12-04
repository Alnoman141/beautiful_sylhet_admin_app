export const redZoneRoutes = [
  {
    path: '/red-zone',
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
    children: [
      {
        path: '',
        name: 'redZoneList',
        component: () => import('@/views/red-zone/index.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
        },
      },
    
      {
        path: 'create-red-zone',
        name: 'createRedZone',
        component: () => import('@/views/red-zone/create.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
          navActiveLink: 'red-zone',
        },
      },
      {
        path: 'edit-red-zone/:id',
        name: 'editRedZone',
        component: () => import('@/views/red-zone/update.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
          navActiveLink: 'red-zone',
        },
      },
      
    ],
  },
]
    