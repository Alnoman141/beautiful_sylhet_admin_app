export const spotRoutes = [
  {
    path: '/spot',

    children: [
      {
        path: '',
        name: 'touristSpot',
        component: () => import('@/views/tourist-spot/index.vue'),
        meta: {
          subject: "spot",
          action: "show menu",
        },
      },
    
      {
        path: 'create-tourist-spot',
        name: 'createTouristSpot',
        component: () => import('@/views/tourist-spot/create.vue'),
        meta: {
          subject: "spot",
          action: "create",
          navActiveLink: 'touristSpot',
        },
      },
      {
        path: 'edit-tourist-spot/:id',
        name: 'editTouristSpot',
        component: () => import('@/views/tourist-spot/update.vue'),
        meta: {
          subject: "spot",
          action: "edit",
          navActiveLink: 'touristSpot',
        },
      },
      
    ],
  },
]
    