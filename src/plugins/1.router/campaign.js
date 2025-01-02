export const campaignRoutes = [
  {
    path: '/campaign',

    // meta: {
    //   subject: "campaign",
    //   action: "show menu",
    // },
    children: [
      {
        path: '',
        name: 'campaignList',
        component: () => import('@/views/campaign/index.vue'),
        meta: {
          subject: "campaign",
          action: "show menu",
        },
      },
    
      {
        path: 'create-campaign',
        name: 'createCampaign',
        component: () => import('@/views/campaign/create.vue'),
        meta: {
          subject: "campaign",
          action: "create",
          navActiveLink: 'campaignList',
        },
      },
      {
        path: 'edit-campaign/:id',
        name: 'editCampaign',
        component: () => import('@/views/campaign/update.vue'),
        meta: {
          subject: "campaign",
          action: "edit",
          navActiveLink: 'campaignList',
        },
      },
      
    ],
  },
]
    