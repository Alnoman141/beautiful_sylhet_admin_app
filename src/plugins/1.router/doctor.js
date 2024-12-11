export const doctorRoutes = [
  {
    path: '/doctor',
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
    children: [
      {
        path: '',
        name: 'doctorList',
        component: () => import('@/views/doctor/index.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
        },
      },
    
      {
        path: 'create-doctor',
        name: 'createDoctor',
        component: () => import('@/views/doctor/create.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
          navActiveLink: 'doctorList',
        },
      },
      {
        path: 'edit-doctor/:id',
        name: 'editDoctor',
        component: () => import('@/views/doctor/update.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
          navActiveLink: 'doctorList',
        },
      },      
    ],
  },
]
    