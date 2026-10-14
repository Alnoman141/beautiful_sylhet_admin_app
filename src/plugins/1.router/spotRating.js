export const spotRatingRoutes = [
  {
    path: '/spot-rating',
    children: [
      {
        path: '',
        name: 'spotRatingList',
        component: () => import('@/views/spot-rating/index.vue'),
        meta: {
          subject: "spot rating",
          action: "show menu",
        },
      },
    ],
  },
]
    