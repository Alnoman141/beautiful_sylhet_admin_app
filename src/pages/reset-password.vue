<template>
  <VRow no-gutters class="auth-wrapper bg-surface">
    <VCol md="8" class="d-none d-md-flex">
      <div class="position-relative bg-background rounded-lg w-100 ma-8 me-0">
        <div class="d-flex align-center justify-center w-100 h-100">
          <img :src="logo" class="auth-img" />
        </div>
      </div>
    </VCol>
    <VCol
      cols="12"
      md="4"
      class="auth-card-v2 d-flex align-center justify-center"
      style="background-color: rgb(var(--v-theme-surface))"
    >
      <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-4">
        <VCardText>
          <h5 class="text-h5 mb-1">Reset your pasword here 🚀</h5>
        </VCardText>
        <VCardText>
          <VRow>
            <!-- password -->
            <VCol cols="12">
              <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                :rules="rules"
                label-width="auto"
                class="demo-ruleForm"
                :size="formSize"
                label-position="top"
                status-icon
              >
                <el-form-item label="Password" prop="password">
                  <el-input
                    :type="isPasswordVisible ? 'text' : 'password'"
                    v-model="ruleForm.password"
                    autocomplete="off"
                  >
                    <template #append>
                      <el-button
                        @click="isPasswordVisible = !isPasswordVisible"
                      >
                        <v-icon
                          :icon="
                            isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
                          "
                        ></v-icon>
                      </el-button>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item label="Confirm" prop="password_confirmation">
                  <el-input
                    v-model="ruleForm.password_confirmation"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    autocomplete="off"
                  >
                    <template #append>
                      <el-button
                        @click="isPasswordVisible = !isPasswordVisible"
                      >
                        <v-icon
                          :icon="
                            isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
                          "
                        ></v-icon>
                      </el-button>
                    </template>
                  </el-input>
                </el-form-item>

                <VBtn block class="mt-6" @click="submitForm(ruleFormRef)">
                  Update Password
                </VBtn>
              </el-form>
            </VCol>
            <VCol cols="12" class="text-center text-base">
              <span>Already have an account?</span>
              <RouterLink class="text-primary ms-2" :to="{ name: 'login' }">
                Sign in instead
              </RouterLink>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/AuthStore";
import { notify } from "@/utils/notification";
import logo from "@images/logo.svg";
import authV2RegisterIllustrationBorderedDark from "@images/pages/auth-v2-register-illustration-bordered-dark.png";
import authV2RegisterIllustrationBorderedLight from "@images/pages/auth-v2-register-illustration-bordered-light.png";
import authV2RegisterIllustrationDark from "@images/pages/auth-v2-register-illustration-dark.png";
import authV2RegisterIllustrationLight from "@images/pages/auth-v2-register-illustration-light.png";
import authV2MaskDark from "@images/pages/misc-mask-dark.png";
import authV2MaskLight from "@images/pages/misc-mask-light.png";
import { useRouter } from "vue-router";
const formSize = ref<ComponentSize>("default");
const router = useRouter().currentRoute;
const imageVariant = useGenerateImageVariant(
  authV2RegisterIllustrationLight,
  authV2RegisterIllustrationDark,
  authV2RegisterIllustrationBorderedLight,
  authV2RegisterIllustrationBorderedDark,
  true
);
const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark);
const userAuthStore = useAuthStore();
const refVForm = ref();
const loading = ref(false);
const isPasswordVisible = ref(false);
definePage({
  meta: {
    layout: "blank",
    unauthenticatedOnly: true,
  },
});
// default
import type { FormInstance, FormRules } from "element-plus";
import { reactive, ref } from "vue";

const ruleFormRef = ref<FormInstance>();

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the password"));
  } else {
    if (ruleForm.password_confirmation !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("password_confirmation");
    }
    callback();
  }
};
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the password again"));
  } else if (value !== ruleForm.value.password) {
    callback(new Error("Two inputs don't match!"));
  } else {
    callback();
  }
};

const ruleForm = ref({
  email: "",
  token: "",
  password: "",
  password_confirmation: "",
});

const rules = reactive<FormRules<typeof ruleForm>>({
  password: [{ validator: validatePass, trigger: "blur" }],
  password_confirmation: [{ validator: validatePass2, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  ruleForm.value.email = router.value.query?.email;
  ruleForm.value.token = router.value.query?.token;

  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      try {
        const { data } = await userAuthStore.updatePassword(ruleForm.value);

        data.status_code == 200
          ? notify("Congratulations!", data.message, "success", "top-right")
          : "";

        loading.value = false;
      } catch (err) {
        notify(
          err?.response?.data?.message,
          err?.response?.data?.error,
          "error",
          "top-right"
        );
      }
    } else {
      console.log("error submit!");
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
