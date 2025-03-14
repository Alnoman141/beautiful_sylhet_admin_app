import { setupLayouts } from 'virtual:generated-layouts'
// eslint-disable-next-line import/no-unresolved
import { createRouter, createWebHistory } from 'vue-router/auto'
import { redirects, routes } from './additional-routes'
import { setupGuards } from './guards'

import { atmRoutes } from './atm'
import { bankRoutes } from './bank'
import { campaignRoutes } from './campaign'
import { redZoneRoutes } from './dangerZone'
import { doctorRoutes } from './doctor'
import { eventsRoutes } from './events'
import { guardRoutes } from './guard'
import { hotelRoutes } from './hotel'
import { hotelCategoryRoutes } from './hotelCategory'
import { hotelTypeRoutes } from './hotelType'
import { lockerRoutes } from './locker'
import { newsRoutes } from './news'
import { noticeRoutes } from './notice'
import { policeRoutes } from './police'

// import { servicesRoutes } from './service'
import { busRoutes } from './bus'
import { dcRoutes } from './dc'
import { fairRoutes } from './fair'
import { kitkotRoutes } from './kitkot'
import { restaurantRoutes } from './restaurant'
import { settingRoutes } from './settings'
import { spotRoutes } from './spot'
import { tourismRoutes } from './tourism'
import { transportRoutes } from './transport'
import { userRoutes } from './user'
import { volunteerRoutes } from './volunteer'
import { landingPageRoutes } from './landing-page'

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
      ...spotRoutes,
      ...lockerRoutes,
      ...hotelRoutes,
      ...hotelTypeRoutes,
      ...hotelCategoryRoutes,
      ...transportRoutes,
      ...eventsRoutes,
      ...campaignRoutes,
      ...bankRoutes,
      ...atmRoutes,
      ...redZoneRoutes,
      ...policeRoutes,
      ...doctorRoutes,
      ...guardRoutes,
      ...volunteerRoutes,
      ...noticeRoutes,
      ...userRoutes,
      ...tourismRoutes,
      ...dcRoutes,
      ...busRoutes,
      ...kitkotRoutes,
      ...restaurantRoutes,
      ...fairRoutes,
      ...landingPageRoutes,

      // ...servicesRoutes,
    ].map(route => recursiveLayouts(route)),
  ],
})

setupGuards(router)
export { router }
export default function (app) {
  app.use(router)
}
