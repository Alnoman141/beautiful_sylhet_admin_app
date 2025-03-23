export const hotelCategoryRoutes = [
  {
    path: '/hotel-category',

    // meta: {
    //   subject: "hotelcategory",
    //   action: "show menu",
    // },
    children: [
      {
        path: '',
        name: 'hotelCategoryList',
        component: () => import('@/views/hotel/hotel-category/index.vue'),
        meta: {
          subject: "hotelcategory",
          action: "show menu",
        },
      },
    
      {
        path: 'create-hotel-category',
        name: 'createHotelCategory',
        component: () => import('@/views/hotel/hotel-category/create.vue'),
        meta: {
          subject: "hotelcategory",
          action: "create",
          navActiveLink: 'hotelCategoryList',
        },
      },
      {
        path: 'edit-hotel-category/:id',
        name: 'editHotelCategory',
        component: () => import('@/views/hotel/hotel-category/update.vue'),
        meta: {
          subject: "hotelcategory",
          action: "edit",
          navActiveLink: 'hotelCategoryList',
        },
      },
      
    ],
  },
]
    