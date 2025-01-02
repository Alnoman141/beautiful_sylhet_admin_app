export const tourismRoutes = [
  {
    path: '/Tourism-Corporation',

    // meta: {
    //   subject: "transport",
    //   action: "show menu",
    // },
    children: [
      {
        path: '',
        name: 'Tourism Corporation',
        component: () => import('@/views/services/index.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
        },
      },
     
      {
        path: 'create-tourism/:type',
        name: 'createTourism',
        component: () => import('@/views/services/create.vue'),
        meta: {
          subject: "transport",
          action: "create",
          navActiveLink: 'Tourism Corporation',
        },
      },
     
    

      {
        path: 'edit-tourism/:id',
        name: 'editTourism',
        component: () => import('@/views/services/update.vue'),
        meta: {
          subject: "transport",
          action: "edit",
          navActiveLink: 'Tourism Corporation',
        },
      },
      
      {
        path: 'edit-tourism-description/:type',
        name: 'editTourismDescription',
        component: () => import('@/views/services/descriptionForm.vue'),
        meta: {
          subject: "transport",
          action: "edit",
          navActiveLink: 'Tourism Corporation',
        },
      },
      

    ],
  },
]
    