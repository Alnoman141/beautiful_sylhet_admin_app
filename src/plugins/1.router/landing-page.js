
export const landingPageRoutes = [
  
  {
    path: '/landing-page',

    // meta: {
    //   subject: "dangerzone",
    //   action: "show menu",
    // },
    children: [
      {
        path: '',
        name: 'landingPage',
        component: () => import('@/views/landing-page/index.vue'),
        meta: {
          subject: "dangerzone",
          action: "show menu",
        },
      },
    
      {
        path: 'create-landing-page',
        name: 'createLandingPage',
        
        component: () => import('@/views/landing-page/create.vue'),
        meta: {
          subject: "dangerzone",
          action: "create",
          navActiveLink: 'landingPage',
        },
      },
      {
        path: 'preview-landing-page',
        name: 'previewLandingPage',
        
        component: () => import('@/views/landing-page/preview.vue'),
        meta: {
          subject: "dangerzone",
          action: "create",
          navActiveLink: 'landingPage',
        },
      },

      // {
      //   path: 'edit-red-zone/:id',
      //   name: 'editRedZone',
      //   component: () => import('@/views/danger-zone/update.vue'),
      //   meta: {
      //     subject: "dangerzone",
      //     action: "edit",
      //     navActiveLink: 'redZoneList',
      //   },
      // },
      
    ],
  },

 
]


