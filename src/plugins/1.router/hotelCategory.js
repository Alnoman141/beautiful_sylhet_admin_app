export const hotelCategoryRoutes = [
  {
    path: '/hotel-category',
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
    children: [
      {
        path: '',
        name: 'hotelCategoryList',
        component: () => import('@/views/hotel/hotel-category/index.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
        },
      },
    
      {
        path: 'create-hotel-category',
        name: 'createHotelCategory',
        component: () => import('@/views/hotel/hotel-category/create.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
          navActiveLink: 'hotelCategoryList',
        },
      },
      {
        path: 'edit-hotel-type/:id',
        name: 'editHotelCategory',
        component: () => import('@/views/hotel/hotel-category/update.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
          navActiveLink: 'hotelCategoryList',
        },
      },
      
    ],
  },
]
    