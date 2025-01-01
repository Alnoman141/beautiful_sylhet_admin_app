<template>
  <div>
    <ElForm
      v-loading="loading"
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      :size="formSize"
      label-position="top"
      status-icon
    >
  
      <ElCard class="my-2">
        <VRow>
          <VCol cols="12" md="6" v-if="mode == 'update'">
            <ElFormItem
              label="Password"
              prop="password"
              :rules="{ validator: validatePass, trigger: 'blur' }"
            >
              <ElInput
                type="password"
                placeholder="Password"
                v-model="ruleForm.password"
              />
            </ElFormItem>
          </VCol>
          <VCol cols="12" md="6" >
            <ElFormItem
              label="Confirm Password"
              prop="password_confirmation"
              :rules="{ validator: validatePassConfirm, trigger: 'blur' }"
            >
              <ElInput
                type="password"
                placeholder="Confirm Password"
                v-model="ruleForm.password_confirmation"
                
              />
            </ElFormItem>
          </VCol>
          <!-- password_confirmation -->
          <VCol
            cols="12"
            md="6"
            v-if="mode == 'update' && route.name == 'profile'"
          >
            <ElFormItem
              label="Old Password"
              prop="password_confirmation"
              :rules="{ validator: validatePass2, trigger: 'blur' }"
            >
              <ElInput
                type="password"
                placeholder="Confirm Password"
                v-model="ruleForm.old_password"
              />
            </ElFormItem>
          </VCol>
        </VRow>

        <div class="py-4">
          <el-tooltip
            class="item"
            effect="dark"
            content="Save"
            placement="top-start"
          >
            <ElButton
              class="submit"
              type="primary"
              @click="submitForm(ruleFormRef)"
            >
              Update Password
            </ElButton>
          </el-tooltip>
        </div>
      </ElCard>
    </ElForm>
  </div>
</template>

<script setup lang="ts">
import { useRolePermissionStore } from "@/stores/tourism/rolePermissionStore";
import { useUserStore } from "@/stores/tourism/userStore";

import {
  type ComponentSize,
  type FormInstance,
  type FormRules,
} from "element-plus";
import { defineEmits, defineProps, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const userStore = useUserStore();
// getRole
const useRolePermission = useRolePermissionStore();
const emit = defineEmits(["tableDataEmit"]);
const route = useRoute();
const router = useRouter();
const props = defineProps({
  id: {
    type: Number,
    default: 0,
  },
  mode: {
    type: String,
    default: "update",
  },
});

const ruleForm = ref({
  id: props.id,
  password: "",
  password_confirmation: "",
  old_password: "",
});

const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
const locationOptions = ["Home", "Company", "School"];
const rules = reactive<FormRules<RuleForm>>({
  // name: [
  //   { required: true, message: 'Please input Activity name', trigger: 'blur' },
  //   { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  // ],
});
const imgUploadValidation = ref(false);

const loading = ref(false);
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid && !imgUploadValidation.value) {
      loading.value = true;
      try{
      const { data } =  await userStore.updatePassword(ruleForm.value);
      data.status_code == 200
        ? (notify("Congratulations!", data.message, "success", "top-right"),
          emit("tableDataEmit"),
          loading.value = false)
        : "";
        data.status_code == 200 ? router.push({ name: "userList" }) : "";
      } catch (error) {
        loading.value = false
          notify(error?.response?.data?.message,  error?.response?.data?.errors ? error?.response?.data?.errors : error?.response?.data?.error ?error?.response?.data?.error : "Something went wrong", 'error', 'top-right')
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

// confirm password validation
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (ruleForm.old_password === "") {
    callback(new Error("Please input the old password"));
  }  else {
    callback();
  }


};
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the password"));
  } else {
    if (ruleForm.old_password !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkPass");
    }
    callback();
  }
};

const validatePassConfirm = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the password again"));
  } else if (ruleForm.password_confirmation !== ruleForm.password) {
    callback(new Error("Two inputs don't match!"));
  } else {
    callback();
  }
};

// role permission section
</script>

<style scoped>
.submit {
  text-transform: capitalize;
}

.create-btn {
  border-radius: 5px;
  background-color: rgb(var(--v-theme-primary));
  color: #fff;
  padding-block: 6px;
  padding-inline: 10px;
}

.upload-section {
  display: block;
  text-align: center;
}

.dlt-btn {
  position: relative;
  display: none;
  border-radius: 50%;
  background-color: white;
  block-size: 30px;
  inline-size: 30px;
  inset-block-start: -25%;
  opacity: 0.8;

  /* transition: 0.3s; */
}

.btn-section:hover .dlt-btn {
  display: block;
}
</style>
