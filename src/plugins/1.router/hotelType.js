export const hotelTypeRoutes = [
  {
    path: '/hotel-type',
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
    children: [
      {
        path: '',
        name: 'hotelTypeList',
        component: () => import('@/views/hotel/hotel-type/index.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
        },
      },
    
      {
        path: 'create-hotel-type',
        name: 'createHotelType',
        component: () => import('@/views/hotel/hotel-type/create.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
          navActiveLink: 'hotelTypeList',
        },
      },
      {
        path: 'edit-hotel-type/:id',
        name: 'editHotelType',
        component: () => import('@/views/hotel/hotel-type/update.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
          navActiveLink: 'hotelTypeList',
        },
      },
      
    ],
  },
]
    