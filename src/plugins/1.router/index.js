import { setupLayouts } from 'virtual:generated-layouts'
// eslint-disable-next-line import/no-unresolved
import { createRouter, createWebHistory } from 'vue-router/auto'
import { redirects, routes } from './additional-routes'
import { setupGuards } from './guards'

import { bankRoutes } from './bank'
import { emergencyRoutes } from './emergency'
import { hotelRoutes } from './hotel'
import { hotelCategoryRoutes } from './hotelCategory'
import { hotelTypeRoutes } from './hotelType'
import { lockerRoutes } from './locker'
import { newsRoutes } from './news'
import { settingRoutes } from './settings'
import { spotRoutes } from './spot'

function recursiveLayouts(route) {
  if (route.children) {
    for (let i = 0; i < route.children.length; i++)
      route.children[i] = recursiveLayouts(route.children[i])
    
    return route
  }
  
  return setupLayouts([route])[0]
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    if (to.hash)
      return { el: to.hash, behavior: 'smooth', top: 60 }
    
    return { top: 0 }
  },
  extendRoutes: pages => [
    ...redirects,
    ...[
      ...pages,
      ...routes,
      ...settingRoutes,
      ...newsRoutes,
      ...emergencyRoutes,
      ...bankRoutes,
      ...spotRoutes,
      ...lockerRoutes,
      ...hotelRoutes,
      ...hotelTypeRoutes,
      ...hotelCategoryRoutes,
    ].map(route => recursiveLayouts(route)),
  ],
})

setupGuards(router)
export { router }
export default function (app) {
  app.use(router)
}
