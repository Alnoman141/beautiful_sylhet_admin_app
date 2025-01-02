export const hotelTypeRoutes = [
  {
    path: '/hotel-type',

    // meta: {
    //   subject: "hoteltype",
    //   action: "show menu",
    // },
    children: [
      {
        path: '',
        name: 'hotelTypeList',
        component: () => import('@/views/hotel/hotel-type/index.vue'),
        meta: {
          subject: "hoteltype",
          action: "show menu",
        },
      },
    
      {
        path: 'create-hotel-type',
        name: 'createHotelType',
        component: () => import('@/views/hotel/hotel-type/create.vue'),
        meta: {
          subject: "hoteltype",
          action: "create",
          navActiveLink: 'hotelTypeList',
        },
      },
      {
        path: 'edit-hotel-type/:id',
        name: 'editHotelType',
        component: () => import('@/views/hotel/hotel-type/update.vue'),
        meta: {
          subject: "hoteltype",
          action: "edit",
          navActiveLink: 'hotelTypeList',
        },
      },
      
    ],
  },
]
    