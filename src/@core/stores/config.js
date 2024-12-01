import { cookieRef, useLayoutConfigStore } from '@layouts/stores/config'
import { themeConfig } from '@themeConfig'
import { storeToRefs } from 'pinia'
import { useTheme } from 'vuetify'

// SECTION Store
export const useConfigStore = defineStore('config', () => {
  // 👉 Theme
  const userPreferredColorScheme = usePreferredColorScheme()
  const cookieColorScheme = cookieRef('color-scheme', 'light')

  watch(userPreferredColorScheme, val => {
    if (val !== 'no-preference')
      cookieColorScheme.value = val
  }, { immediate: true })

  const theme = cookieRef('theme', themeConfig.app.theme)

  // 👉 isVerticalNavSemiDark
  const isVerticalNavSemiDark = cookieRef('isVerticalNavSemiDark', themeConfig.verticalNav.isVerticalNavSemiDark)

  // 👉 isVerticalNavSemiDark
  const skin = cookieRef('skin', themeConfig.app.skin)

  // ℹ️ We need to use `storeToRefs` to forward the state
  const { isLessThanOverlayNavBreakpoint, appContentWidth, navbarType, isNavbarBlurEnabled, appContentLayoutNav, isVerticalNavCollapsed, footerType, isAppRTL } = storeToRefs(useLayoutConfigStore())
  
  const getRowStyle = () => {
    return {
      color: theme.value === 'dark' ? '#fefeff' : '#2e3248',
      backgroundColor: theme.value === 'dark' ? '#2e3248' : '#fefeff',

      // set hover bg color for the row red
      '&:hover': {
        backgroundColor: theme.value === 'dark' ? 'red' : '#f4f4f4',
      },
    }
  }

  const getHeaderRowStyle = () => {
    return {
      color: '#909399',
      backgroundColor: theme.value === 'dark' ? '#2e3248' : '#fefeff',
    }
  }

  return {
    theme,
    isVerticalNavSemiDark,
    skin,

    // @layouts exports
    isLessThanOverlayNavBreakpoint,
    appContentWidth,
    navbarType,
    isNavbarBlurEnabled,
    appContentLayoutNav,
    isVerticalNavCollapsed,
    footerType,
    isAppRTL,
    getRowStyle,
    getHeaderRowStyle,
  }
})
// !SECTION
// SECTION Init
export const initConfigStore = () => {
  const userPreferredColorScheme = usePreferredColorScheme()
  const vuetifyTheme = useTheme()
  const configStore = useConfigStore()

  watch([() => configStore.theme, userPreferredColorScheme], () => {
    vuetifyTheme.global.name.value = configStore.theme === 'dark'
      ? userPreferredColorScheme.value === 'dark'
        ? 'dark'
        : 'light'
      : configStore.theme
  })
  onMounted(() => {
    if (configStore.theme === 'dark')
      vuetifyTheme.global.name.value = userPreferredColorScheme.value
  })
}
