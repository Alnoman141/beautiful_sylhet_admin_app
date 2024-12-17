<script setup>
import { useAuthStore } from '@/stores/AuthStore'
import { notify } from '@/utils/notification'
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
import logo from '@images/logo.svg'
import authV2ForgotPasswordIllustrationDark from '@images/pages/auth-v2-forgot-password-illustration-dark.png'
import authV2ForgotPasswordIllustrationLight from '@images/pages/auth-v2-forgot-password-illustration-light.png'
import authV2MaskDark from '@images/pages/misc-mask-dark.png'
import authV2MaskLight from '@images/pages/misc-mask-light.png'

const email = ref('')
const authThemeImg = useGenerateImageVariant(authV2ForgotPasswordIllustrationLight, authV2ForgotPasswordIllustrationDark)
const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)

const userAuthStore = useAuthStore()

definePage({
  meta: {
    layout: 'blank',
    unauthenticatedOnly: true,
  },
})

const refVForm = ref()
const loading = ref(false)

const errors = ref({
  email: undefined,
})

const resetPassword = () => {
  refVForm.value?.validate().then( async ({ valid: isValid }) => {
    if (isValid) {
      try {
        loading.value = true

        const data = {
          email: email.value,
        }
      
        let res =  await userAuthStore.resetPassword(data)
        notify('Successfull!', res?.data?.message, 'success', 'top-right')

        loading.value = false
      } catch (err) {
        notify(err?.response?.data?.message, err?.response?.data?.error, 'error', 'top-right')
        loading.value = false
      }
    }
  })
}
</script>

<template>
  <VRow
    class="auth-wrapper bg-surface"
    no-gutters
  >
    <VCol
      lg="8"
      class="d-none d-lg-flex"
    >
      <!--
        <div class="position-relative bg-background rounded-lg w-100 ma-8 me-0">
        <div class="d-flex align-center justify-center w-100 h-100">
        <VImg
        max-width="368"
        :src="authThemeImg"
        class="auth-illustration mt-16 mb-2"
        />
        </div>

        <VImg
        class="auth-footer-mask"
        :src="authThemeMask"
        />
        </div> 
      -->
      <div class="position-relative bg-background rounded-lg w-100 ma-8 me-0">
        <div class="d-flex align-center justify-center w-100 h-100">
          <img
           
            
            :src="logo"
            class="auth-img "
          >
        </div>

        <!--
          <VImg
          :src="authThemeMask"
          class="auth-footer-mask"
          /> 
        -->
      </div>
    </VCol>

    <VCol
      cols="12"
      lg="4"
      class="d-flex align-center justify-center"
    >
      <VCard
        flat
        :max-width="500"
        class="mt-12 mt-sm-0 pa-4"
      >
        <VCardText>
          <!--
            <VNodeRenderer
            :nodes="themeConfig.app.logo"
            class="mb-6"
            /> 
          -->
          <h4 class="text-h4 mb-1">
            Forgot Password? 🔒
          </h4>
          <p class="mb-0">
            Enter your email and we'll send you instructions to reset your password
          </p>
        </VCardText>

        <VCardText>
          <VForm
            ref="refVForm"
            v-loading="loading"
            element-loading-background="rgba(122, 122, 122, 0.8)"
            @submit.prevent="resetPassword"
          >
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <AppTextField
                  v-model="email"
                  label="Email"
                  placeholder="Please enter your email"
                  type="email"
                  autofocus
                  :rules="[requiredValidator, emailValidator]"
                  :error-messages="errors.email"
                />
              </VCol>

              <!-- Reset link -->
              <VCol cols="12">
                <VBtn
                  block
                  type="submit"
                >
                  Send Reset Link
                </VBtn>
              </VCol>

              <!-- back to login -->
              <VCol cols="12">
                <RouterLink
                  class="d-flex align-center justify-center"
                  :to="{ name: 'login' }"
                >
                  <VIcon
                    icon="tabler-chevron-left"
                    class="flip-in-rtl"
                  />
                  <span>Back to login</span>
                </RouterLink>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
