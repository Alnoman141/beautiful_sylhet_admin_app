export const spotRoutes = [
  {
    path: '/spot',
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
    children: [
      {
        path: '',
        name: 'touristSpot',
        component: () => import('@/views/tourist-spot/index.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
        },
      },
    
      {
        path: 'create-tourist-spot',
        name: 'createTouristSpot',
        component: () => import('@/views/tourist-spot/create.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
          navActiveLink: 'spot',
        },
      },
      {
        path: 'edit-tourist-spot/:id',
        name: 'editTouristSpot',
        component: () => import('@/views/tourist-spot/update.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
          navActiveLink: 'spot',
        },
      },
      
    ],
  },
]
    