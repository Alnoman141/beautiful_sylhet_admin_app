export const noticeRoutes = [
  {
    path: '/notice',
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
    children: [
      {
        path: '',
        name: 'noticeList',
        component: () => import('@/views/notice/index.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
        },
      },
    
      {
        path: 'create-notice',
        name: 'createNotice',
        component: () => import('@/views/notice/create.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
          navActiveLink: 'notice',
        },
      },
      {
        path: 'edit-notice/:id',
        name: 'editNotice',
        component: () => import('@/views/notice/update.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
          navActiveLink: 'notice',
        },
      },
      
    ],
  },
]
    