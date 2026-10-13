export const teaEstateRoutes = [
  {
    path: '/tea-estate',
    children: [
      {
        path: '',
        name: 'teaEstateList',
        component: () => import('@/views/tea-estate/index.vue'),
        meta: {
          subject: "tea estate",
          action: "show menu",
        },
      },
    
      {
        path: 'create',
        name: 'createTeaEstate',
        component: () => import('@/views/tea-estate/create.vue'),
        meta: {
          subject: "tea estate",
          action: "create",
          navActiveLink: 'teaEstateList',
        },
      },
      {
        path: 'edit/:id',
        name: 'editTeaEstate',
        component: () => import('@/views/tea-estate/update.vue'),
        meta: {
          subject: "tea estate",
          action: "edit",
          navActiveLink: 'teaEstateList',
        },
      },
      
    ],
  },
]
    