export const volunteerRoutes = [
  {
    path: '/volunteer',

    // meta: {
    //   subject: "volunteer",
    //   action: "show menu",
    // },
    children: [
      {
        path: '',
        name: 'volunteerList',
        component: () => import('@/views/volunteer/index.vue'),
        meta: {
          subject: "volunteer",
          action: "show menu",
        },
      },
    
      {
        path: 'create-volunteer',
        name: 'createVolunteer',
        component: () => import('@/views/volunteer/create.vue'),
        meta: {
          subject: "volunteer",
          action: "create",
          navActiveLink: 'volunteerList',
        },
      },
      {
        path: 'edit-volunteer/:id',
        name: 'editVolunteer',
        component: () => import('@/views/volunteer/update.vue'),
        meta: {
          subject: "volunteer",
          action: "edit",
          navActiveLink: 'volunteerList',
        },
      },
      
    ],
  },
]
    