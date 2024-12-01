export const hotelRoutes = [
  {
    path: '/hotel',
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
    children: [
      {
        path: '',
        name: 'hotelList',
        component: () => import('@/views/hotel/index.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
        },
      },
    
      {
        path: 'create-hotel',
        name: 'createHotel',
        component: () => import('@/views/hotel/create.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
          navActiveLink: 'hotel',
        },
      },
      {
        path: 'edit-hotel/:id',
        name: 'editHotel',
        component: () => import('@/views/hotel/update.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
          navActiveLink: 'hotel',
        },
      },
      
    ],
  },
]
    