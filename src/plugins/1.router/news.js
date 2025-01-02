export const newsRoutes = [
  {
    path: '/news',

    // meta: {
    //   subject: "news",
    //   action: "show menu",
    // },
    children: [
      {
        path: '',
        name: 'newsList',
        component: () => import('@/views/news/index.vue'),
        meta: {
          subject: "news",
          action: "show menu",
        },
      },
    
      {
        path: 'create-news',
        name: 'createNews',
        component: () => import('@/views/news/create.vue'),
        meta: {
          subject: "news",
          action: "create",
          navActiveLink: 'newsList',
        },
      },
      {
        path: 'edit-news/:id',
        name: 'editNews',
        component: () => import('@/views/news/update.vue'),
        meta: {
          subject: "news",
          action: "edit",
          navActiveLink: 'newsList',
        },
      },
      
    ],
  },
]
    