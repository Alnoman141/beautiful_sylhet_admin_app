export const restaurantCategoryRoutes = [
  {
    path: '/restaurant-category',

    // meta: {
    //   subject: "restaurantcategory",
    //   action: "show menu",
    // },
    children: [
      {
        path: '',
        name: 'restaurantCategoryList',
        component: () => import('@/views/restaurant/restaurant-category/index.vue'),
        meta: {
          subject: "hotelcategory",
          action: "show menu",
        },
      },
    
      {
        path: 'create-restaurant-category',
        name: 'createRestaurantCategory',
        component: () => import('@/views/restaurant/restaurant-category/create.vue'),
        meta: {
          subject: "hotelcategory",
          action: "create",
          navActiveLink: 'restaurantCategoryList',
        },
      },
      {
        path: 'edit-restaurant-category/:id',
        name: 'editRestaurantCategory',
        component: () => import('@/views/restaurant/restaurant-category/update.vue'),
        meta: {
          subject: "hotelcategory",
          action: "edit",
          navActiveLink: 'restaurantCategoryList',
        },
      },
      
    ],
  },
]
    