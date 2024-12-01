import { cookieRef } from '@layouts/stores/config'
import { themeConfig } from '@themeConfig'

export const resolveVuetifyTheme = () => {
  const cookieColorScheme = cookieRef('color-scheme', usePreferredDark().value ? 'dark' : 'light')
  const storedTheme = cookieRef('theme', themeConfig.app.theme).value
  
  return storedTheme === 'dark'
    ? cookieColorScheme.value === 'dark'
      ? 'dark'
      : 'light'
    : storedTheme
}
