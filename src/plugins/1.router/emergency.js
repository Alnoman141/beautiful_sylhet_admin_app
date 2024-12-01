
const childrenRoutes = [
  
  {
    path: 'tourist-police',
    redirects: '/news/tourist-police',
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
    children: [
      {
        path: '',
        name: 'touristPolice',
        component: () => import('@/views/emergency/tourist-police/index.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
        },
      },
      {
        path: '/volunteer',
        name: 'volunteer',
        component: () => import('@/views/emergency/volunteer/index.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
        },
      },
      {
        path: '/life-guard',
        name: 'lifeGuard',
        component: () => import('@/views/emergency/life-guard/index.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
        },
      },
      {
        path: '/doctor',
        name: 'doctor',
        component: () => import('@/views/emergency/doctor/index.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
        },
      },
      {
        path: '/red-zone',
        name: 'RedZone',
        component: () => import('@/views/emergency/red-zone/index.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
        },
      },
     
    ],
  },

 
]

export const emergencyRoutes = [
  {
    path: '/emergency',
    name: 'emergency',
    redirects: '/tourist-police',
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
    children: [
      ...childrenRoutes,
    ],
  },
 
]
