import { useConfigStore } from '@core/stores/config'
import { useTheme } from 'vuetify'

// composable function to return the image variant as per the current theme and skin
export const useGenerateImageVariant = (imgLight, imgDark, imgLightBordered, imgDarkBordered, bordered = false) => {
  const configStore = useConfigStore()
  const { global } = useTheme()
  
  // eslint-disable-next-line vue/return-in-computed-property
  return computed(() => {
    if (global.name.value === 'light') {
      if (configStore.skin === 'bordered' && bordered)
        return imgLightBordered
      else
        return imgLight
    }
    if (global.name.value === 'dark') {
      if (configStore.skin === 'bordered' && bordered)
        return imgDarkBordered
      else
        return imgDark
    }
  })
}
