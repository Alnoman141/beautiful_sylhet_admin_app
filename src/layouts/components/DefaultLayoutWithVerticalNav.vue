<script setup>
import navItems from '@/navigation/vertical'

// Components
import Footer from '@/layouts/components/Footer.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'

// @layouts plugin
import { VerticalNavLayout } from '@layouts'

// SECTION: Loading Indicator
const isFallbackStateActive = ref(false)
const refLoadingIndicator = ref(null)

watch([
  isFallbackStateActive,
  refLoadingIndicator,
], () => {
  if (isFallbackStateActive.value && refLoadingIndicator.value)
    refLoadingIndicator.value.fallbackHandle()
  if (!isFallbackStateActive.value && refLoadingIndicator.value)
    refLoadingIndicator.value.resolveHandle()
}, { immediate: true })

import { useRoleStore } from '@/stores/roleStore'

const roleStore = useRoleStore()
const ability = useAbility()

const syncPermission =  async() =>{
  const { data } = await roleStore.syncPermission()



  // this will use later    
  const abilityData = data.data
  const userAbilityRules = JSON.stringify(data.data)

  data.status_code == 200 ? notify('Successfull!', 'Permission has been synced.', 'success', 'top-right') : notify('Error!', 'something went wrong', 'error', 'top-right')

  ability.update(abilityData)
}
</script>

<template>
  <VerticalNavLayout :nav-items="navItems">
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <VRow class=" h-100  d-flex justify-between align-center">
        <VCol>
          <IconBtn
            id="vertical-nav-toggle-btn"
            class="ms-n3 d-lg-none"
            @click="toggleVerticalOverlayNavActive(true)"
          >
            <VIcon
              size="26"
              icon="tabler-menu-2"
            />
          </IconBtn>
        </VCol>
        <!--
          

          <NavSearchBar class="ms-lg-n3" />

          <VSpacer />

          <NavBarI18n
          v-if="themeConfig.app.i18n.enable && themeConfig.app.i18n.langConfig?.length"
          :languages="themeConfig.app.i18n.langConfig"
          />
          <NavbarThemeSwitcher />
          <NavbarShortcuts />
          <NavBarNotifications class="me-2" /> 
        -->
       
        <VCol class="d-flex align-center justify-end">
          <IconBtn
            id="vertical-nav-toggle-btn"
            class=""
            @click="syncPermission"
          >
            <ElTooltip
              content="Sync Permission"
              raw-content
            >
              <VIcon
                size="15"
                icon="tabler-refresh"
              />
            </ElTooltip>
          </IconBtn>
          
          <UserProfile />
        </VCol>
      </VRow>
    </template>

    <AppLoadingIndicator ref="refLoadingIndicator" />

    <!-- 👉 Pages -->
    <RouterView v-slot="{ Component }">
      <Suspense
        :timeout="0"
        @fallback="isFallbackStateActive = true"
        @resolve="isFallbackStateActive = false"
      >
        <Component :is="Component" />
      </Suspense>
    </RouterView>

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>

    <!-- 👉 Customizer -->
  </VerticalNavLayout>
</template>
