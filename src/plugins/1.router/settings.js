
const childrenRoutes = [  
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

export const settingRoutes = [
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
