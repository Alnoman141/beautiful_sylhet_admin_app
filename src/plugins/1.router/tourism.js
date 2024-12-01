
const childrenRoutes = [
  // admin dashboard
  {
    path: 'categories',
    name: 'categories',
    component: () => import('@/views/settings/category/index.vue'),
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
  },
  {
    path: 'job-roles',
    name: 'jobRoles',
    component: () => import('@/views/settings/job-role/index.vue'),
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
  },
  {
    path: 'industries',
    name: 'industries',
    component: () => import('@/views/settings/industry/index.vue'),
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
  },
  {
    path: 'positions',
    name: 'positions',
    component: () => import('@/views/settings/position/index.vue'),
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
  },
  {
    path: 'skills',
    name: 'skills',
    component: () => import('@/views/settings/skill/index.vue'),
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
  },
  {
    path: 'locations',
    name: 'locations',
    component: () => import('@/views/settings/location/index.vue'),
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
  },
  {
    path: 'sub-locations',
    name: 'subLocations',
    component: () => import('@/views/settings/sub-location/index.vue'),
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
  },
  {
    path: 'role-permissions',
    redirects: '/settings/role-permissions',
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
    children: [
      {
        path: '',
        name: 'rolePermissions',
        component: () => import('@/views/settings/role-permission/index.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
        },
      },
      {
        path: 'view',
        name: 'rolePermissionView',
        component: () => import('@/views/settings/role-permission/view.vue'),
        meta: {
          subject: "Dashboard",
          action: "show menu",
        },
      },
    ],
  },

  {
    path: 'user-list',
    name: 'userList',
    component: () => import('@/views/settings/users/index.vue'),
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
  },
]

export const tourismRoutes = [
  {
    path: '/settings',
    name: 'settings',
    redirects: '/categories',
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
    children: [
      ...childrenRoutes,
    ],
  },
]
