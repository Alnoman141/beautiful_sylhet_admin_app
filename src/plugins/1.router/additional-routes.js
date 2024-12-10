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
      subject: "Guideline",
      action: "show menu",
    },
  },
  {
    path: '/create-guideline',
    name: 'createGuideline',
    component: () => import('@/views/guideline/guidelineForm.vue'),
    meta: {
      subject: "Guideline",
      action: "create",
    },
  },
  {
    path: '/edit-guideline/:id',
    name: 'edit-guideline',
    component: () => import('@/views/guideline/guidelineForm.vue'),
    meta: {
      subject: "Guideline",
      action: "edit",
    },
  },
  {
    path: '/awareness',
    name: 'awareness',
    component: () => import('@/views/awareness/index.vue'),
    meta: {
      subject: "Awareness",
      action: "show menu",
    },
  },
  {
    path: '/create-awareness',
    name: 'createAwareness',
    component: () => import('@/views/awareness/awarenessForm.vue'),
    meta: {
      subject: "Awareness",
      action: "create",
    },
  },
  {
    path: '/edit-awareness/:id',
    name: 'edit-awareness',
    component: () => import('@/views/awareness/awarenessForm.vue'),
    meta: {
      subject: "Awareness",
      action: "edit",
    },
  }, 
  {
    path: '/info',
    name: 'info',
    component: () => import('@/views/coxbazar-info/index.vue'),
    meta: {
      subject: "Info",
      action: "show menu",
    },
  },
  {
    path: '/info-edit',
    name: 'infoEdit',
    component: () => import('@/views/coxbazar-info/infoForm.vue'),
    meta: {
      subject: "Info",
      action: "edit",
    },
  },
 
 
]
