export const redZoneCategoryRoutes = [
  {
    path: '/red-zone-category',
    children: [
      {
        path: '',
        name: 'redZoneCategoryList',
        component: () => import('@/views/danger-zone/zone-category/index.vue'),
        meta: {
          subject: "dangerzone",
          action: "show menu",
        },
      },
    
      {
        path: 'create-red-zone-category',
        name: 'createRedZoneCategory',
        component: () => import('@/views/danger-zone/zone-category/create.vue'),
        meta: {
          subject: "dangerzone",
          action: "create",
          navActiveLink: 'redZoneCategoryList',
        },
      },
      {
        path: 'edit-red-zone-category/:id',
        name: 'editRedZoneCategory',
        component: () => import('@/views/danger-zone/zone-category/update.vue'),
        meta: {
          subject: "dangerzone",
          action: "edit",
          navActiveLink: 'redZoneCategoryList',
        },
      },
      
    ],
  },
]
    