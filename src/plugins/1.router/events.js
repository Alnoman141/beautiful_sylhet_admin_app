export const eventsRoutes = [
  {
    path: '/events',
    meta: {
      subject: "event",
      action: "show menu",
    },
    children: [
      {
        path: '',
        name: 'eventsList',
        component: () => import('@/views/events/index.vue'),
        meta: {
          subject: "event",
          action: "show menu",
        },
      },
    
      {
        path: 'create-events',
        name: 'createEvents',
        component: () => import('@/views/events/create.vue'),
        meta: {
          subject: "event",
          action: "show menu",
          navActiveLink: 'eventsList',
        },
      },
      {
        path: 'edit-events/:id',
        name: 'editEvents',
        component: () => import('@/views/events/update.vue'),
        meta: {
          subject: "event",
          action: "show menu",
          navActiveLink: 'eventsList',
        },
      },
      
    ],
  },
]
    