<script setup>
import { useAuthStore } from '@/stores/AuthStore'
import { getUserData, removeApiDomain, removeToken, removeUserAbilityRules, removeUserData } from '@/utils/auth'

const router = useRouter()
const ability = useAbility()

const userAuthStore = useAuthStore()

// TODO: Get type from backend
const userData = getUserData()

const logout = async () => {

  try {
    
    // Logout user
    await userAuthStore.logout()

    // Remove "accessToken" from cookie
    removeToken()

    // Remove "userData" from cookie
    removeUserData()

    // Remove "apiDomain" from cookie
    removeApiDomain()

    // Redirect to login page
    await router.push('/login')

    // ℹ️ We had to remove abilities in then block because if we don't nav menu items mutation is visible while redirecting user to login page

    // Remove "userAbilities" from cookie
    removeUserAbilityRules()

    // Reset ability to initial ability
    ability.update([])

    // Notify user
    notify('Successfull!', 'You have been logged out successfully.', 'success', 'top-right')

  } catch (error) {
    notify(error?.response?.data?.error, error?.response?.data?.message, 'error', 'top-right')
  }
}

import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
import pages401 from '@images/pages/401.png'
import miscMaskDark from '@images/pages/misc-mask-dark.png'
import miscMaskLight from '@images/pages/misc-mask-light.png'

definePage({
  alias: '/pages/misc/not-authorized',
  meta: {
    layout: 'blank',
    public: true,
  },
})

const authThemeMask = useGenerateImageVariant(miscMaskLight, miscMaskDark)

onMounted(() => {
  // logout()
})
</script>

<template>
  <div class="misc-wrapper">
    <ErrorHeader
      status-code="401"
      title="You are not authorized! 🔐"
      description="You do not have permission to view this page using the credentials that you have provided while login.
       Please contact your site administrator."
    />

    <VBtn
      class="mt-2 mb-10"
      to="/"
    >
      Back Home
    </VBtn>

    <!-- 👉 Image -->
    <div class="misc-avatar w-100 text-center">
      <VImg
        :src="pages401"
        alt="Coming Soon"
        :max-width="170"
        class="mx-auto"
      />
    </div>

    <VImg
      :src="authThemeMask"
      class="misc-footer-img d-none d-md-block"
    />
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/misc.scss";
</style>
