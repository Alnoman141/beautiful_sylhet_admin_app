export const newsRoutes = [
  {
    path: '/news',
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
    children: [
      {
        path: '',
        name: 'newsList',
        component: () => import('@/views/news/index.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
        },
      },
    
      {
        path: 'create-news',
        name: 'createNews',
        component: () => import('@/views/news/create.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
          navActiveLink: 'news',
        },
      },
      {
        path: 'edit-news/:id',
        name: 'editNews',
        component: () => import('@/views/news/update.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
          navActiveLink: 'news',
        },
      },
      
    ],
  },
]
    