import { setupWorker } from 'msw'

// Handlers
import { handlerAppBarSearch } from '@db/app-bar-search/index'
import { handlerAppsCalendar } from '@db/apps/calendar/index'
import { handlerAppsChat } from '@db/apps/chat/index'
import { handlerAppsPermission } from '@db/apps/permission/index'
import { handlerAppsUsers } from '@db/apps/users/index'
import { handlerAuth } from '@db/auth/index'
import { handlerDashboard } from '@db/dashboard/index'
import { handlerPagesDatatable } from '@db/pages/datatable/index'
import { handlerPagesFaq } from '@db/pages/faq/index'
import { handlerPagesProfile } from '@db/pages/profile/index'

const worker = setupWorker( ...handlerAppsUsers, ...handlerAppsCalendar, ...handlerAppsChat, ...handlerAppsPermission, ...handlerPagesProfile, ...handlerPagesFaq, ...handlerPagesDatatable, ...handlerAppBarSearch, ...handlerAuth, ...handlerDashboard)
export default function () {
  // const workerUrl = `${import.meta.env.BASE_URL ?? '/'}mockServiceWorker.js`
  // const workerUrl = `http://localhost:5173/mockServiceWorker.js`
  const workerUrl = '/mockServiceWorker.js'


  // worker.start({
  //   serviceWorker: {
  //     url: workerUrl,
  //   },
  //   onUnhandledRequest: 'bypass',
  // })
}
