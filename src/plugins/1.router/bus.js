export const busRoutes = [
  {
    path: '/Tourist-Bus',
    meta: {
      subject: "transport",
      action: "show menu",
    },
    children: [
     
      {
        path: '/Tourist-Bus',
        name: 'Tourist Bus',
        component: () => import('@/views/services/bus.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
        },
      },
      
      {
        path: 'create-bus/:type',
        name: 'createBus',
        component: () => import('@/views/services/create.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
          navActiveLink: 'Tourist Bus',
        },
      },
      
    

     
      {
        path: 'edit-bus/:id',
        name: 'editBus',
        component: () => import('@/views/services/update.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
          navActiveLink: 'Tourist Bus',
        },
      },
     
      {
        path: 'edit-bus-description/:type',
        name: 'editBusDescription',
        component: () => import('@/views/services/descriptionForm.vue'),
        meta: {
          subject: "transport",
          action: "show menu",
          navActiveLink: 'Tourist Bus',
        },
      },
      

    ],
  },
]
    