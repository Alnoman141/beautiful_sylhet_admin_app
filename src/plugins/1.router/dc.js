export const dcRoutes = [
  {
    path: '/DC-Tourism-Cell',

    // meta: {
    //   subject: "transport",
    //   action: "show menu",
    // },
    children: [
     
      {
        path: '/DC-Tourism-Cell',
        name: 'DC Activities',
        component: () => import('@/views/services/dc.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
        },
      },
      
      {
        path: 'create-dc/:type',
        name: 'createDc',
        component: () => import('@/views/services/create.vue'),
        meta: {
          subject: "transport",
          action: "create",
          navActiveLink: 'DC Activities',
        },
      },
      

      
      {
        path: 'edit-dc/:id',
        name: 'editDc',
        component: () => import('@/views/services/update.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
          navActiveLink: 'DC Activities',
        },
      },
      
      {
        path: 'edit-dc-description/:type',
        name: 'editDcDescription',
        component: () => import('@/views/services/descriptionForm.vue'),
        meta: {
          subject: "transport",
          action: "edit",
          navActiveLink: 'DC Activities',
        },
      },
     

    ],
  },
]
    