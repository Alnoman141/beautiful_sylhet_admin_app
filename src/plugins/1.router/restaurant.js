export const restaurantRoutes = [
  {
    path: '/restaurant',

    
    children: [
      {
        path: '',
        name: 'restaurantList',
        component: () => import('@/views/restaurant/index.vue'),
        meta: {
          subject: "dangerzone",
          action: "show menu",
        },
      },
    
      {
        path: 'create-restaurant',
        name: 'createRestaurant',
        component: () => import('@/views/restaurant/create.vue'),
        meta: {
          subject: "dangerzone",
          action: "create",
          navActiveLink: 'restaurantList',
        },
      },
      {
        path: 'edit-restaurant/:id',
        name: 'editRestaurant',
        component: () => import('@/views/restaurant/update.vue'),
        meta: {
          subject: "dangerzone",
          action: "edit",
          navActiveLink: 'restaurantList',
        },
      },
      
    ],
  },
]
    