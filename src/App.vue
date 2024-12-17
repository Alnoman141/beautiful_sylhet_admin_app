<script setup>
import { getToken } from "@/utils/auth"
import ScrollToTop from '@core/components/ScrollToTop.vue'
import initCore from '@core/initCore'
import {
  initConfigStore,
  useConfigStore,
} from '@core/stores/config'
import { hexToRgb } from '@layouts/utils'
import { useRoute, useRouter } from "vue-router"
import { useTheme } from 'vuetify'

const router = useRouter()
const route = useRoute()
const token = getToken()

// reset-password
// !token && route.name !== 'reset-password' || route.name !== 'forgot-password'  ? router.push({ name: "login" }) : null

const { global } = useTheme()

// ℹ️ Sync current theme with initial loader theme
initCore()
initConfigStore()

const configStore = useConfigStore()
</script>

<template>
  <VLocaleProvider :rtl="configStore.isAppRTL">
    <!-- ℹ️ This is required to set the background color of active nav link based on currently active global theme's primary -->
    <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
      <!-- {{ route.name }} -->
      <RouterView />
      <ScrollToTop />
    </VApp>
  </VLocaleProvider>
</template>
