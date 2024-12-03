// 👉 Redirects
export const redirects = [
  // ℹ️ We are redirecting to different pages based on role.
  // NOTE: Role is just for UI purposes. ACL is based on abilities.
  {
    path: '/',
    name: 'index',
    redirect: to => {
      // TODO: Get type from backend
      const userData = useCookie('userData')
      
      // const userRole = userData.value?.roles[0].name

      const userRole = 'superadmin'

      if (userRole === 'superadmin')
        return { name: 'dashboards' }
      if (userRole === 'client')
        return { name: 'dashboards' }
      
      return { name: 'login', query: to.query }
    },
  },
]
export const routes = [
  // admin dashboard
  {
    path: '/dashboards',
    name: 'dashboards',
    component: () => import('@/views/dashboards/admin/index.vue'),
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
  },
  {
    path: '/guide-line',
    name: 'guide-line',
    component: () => import('@/views/guideline/index.vue'),
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
  },
  {
    path: '/edit-guideline/:id',
    name: 'edit-guideline',
    component: () => import('@/views/guideline/guidelineForm.vue'),
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
  },
  {
    path: '/awareness',
    name: 'awareness',
    component: () => import('@/views/awareness/index.vue'),
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
  },
  {
    path: '/edit-awareness/:id',
    name: 'edit-awareness',
    component: () => import('@/views/awareness/awarenessForm.vue'),
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
  },

  
  {
    path: '/locker',
    name: 'locker',
    component: () => import('@/views/locker/index.vue'),
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
  },
  {
    path: '/hotel',
    name: 'hotel',
    component: () => import('@/views/hotel/index.vue'),
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
  },
  {
    path: '/transport',
    name: 'transport',
    component: () => import('@/views/transport/index.vue'),
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
  },
  {
    path: '/events',
    name: 'events',
    component: () => import('@/views/events/index.vue'),
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
  },
  {
    path: '/campaign',
    name: 'campaign',
    component: () => import('@/views/campaign/index.vue'),
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
  },
  {
    path: '/info',
    name: 'info',
    component: () => import('@/views/info/index.vue'),
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
  },
 
 
  {
    path: '/notice',
    name: 'notice',
    component: () => import('@/views/notice/index.vue'),
    meta: {
      subject: "Dashboard",
      action: "show menu",
    },
  },
]
