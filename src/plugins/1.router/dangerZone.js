export const redZoneRoutes = [
  {
    path: '/red-zone',

    // meta: {
    //   subject: "dangerzone",
    //   action: "show menu",
    // },
    children: [
      {
        path: '',
        name: 'redZoneList',
        component: () => import('@/views/danger-zone/index.vue'),
        meta: {
          subject: "dangerzone",
          action: "show menu",
        },
      },
    
      {
        path: 'create-red-zone',
        name: 'createRedZone',
        component: () => import('@/views/danger-zone/create.vue'),
        meta: {
          subject: "dangerzone",
          action: "create",
          navActiveLink: 'redZoneList',
        },
      },
      {
        path: 'edit-red-zone/:id',
        name: 'editRedZone',
        component: () => import('@/views/danger-zone/update.vue'),
        meta: {
          subject: "dangerzone",
          action: "edit",
          navActiveLink: 'redZoneList',
        },
      },
      
    ],
  },
]
    