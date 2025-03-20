export const complainCategoryRoutes = [
  {
    path: '/complain-category',
    children: [
      {
        path: '',
        name: 'complainCategoryList',
        component: () => import('@/views/complain/complain-category/index.vue'),
        meta: {
          subject: "dangerzone",
          action: "show menu",
        },
      },
    
      {
        path: 'create-complain-category',
        name: 'createComplainCategory',
        component: () => import('@/views/complain/complain-category/create.vue'),
        meta: {
          subject: "dangerzone",
          action: "create",
          navActiveLink: 'complainCategoryList',
        },
      },
      {
        path: 'edit-complain-category/:id',
        name: 'editComplainCategory',
        component: () => import('@/views/complain/complain-category/update.vue'),
        meta: {
          subject: "dangerzone",
          action: "edit",
          navActiveLink: 'complainCategoryList',
        },
      },
      
    ],
  },
]
    