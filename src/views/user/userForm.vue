<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol cols="6">
          <b> User {{ mode == "update" ? "Edit" : "Create" }} </b>
        </VCol>
        <VCol cols="6" class="text-right">
          <RouterLink
            type="primary"
            :underline="false"
            :to="{ name: 'userList' }"
            class="create-btn"
          >
          <el-tooltip class="item" effect="dark" content="Back" placement="top-start">
            Bank List
            </el-tooltip>
          </RouterLink>
        </VCol>
      </VRow>
    </ElCard>

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
          <VCol cols="12" md="6">
            <ElFormItem
              label="First Name"
              prop="first_name"
              :rules="{
                required: true,
                message: 'Fisrt name is required',
                trigger: 'change',
              }"
            >
              <ElInput placeholder="First Name" v-model="ruleForm.first_name" />
            </ElFormItem>
          </VCol>
          <VCol cols="12" md="6">
            <ElFormItem
              label="Last Name"
              prop="last_name"
              :rules="{
                required: true,
                message: 'Last name is required',
                trigger: 'change',
              }"
            >
              <ElInput placeholder="Last Name" v-model="ruleForm.last_name" />
            </ElFormItem>
          </VCol>
          <VCol cols="12" md="6">
            <ElFormItem
              label="Email"
              prop="email"
              :rules="[
                {
                  required: true,
                  message: 'Email is required',
                  trigger: 'change',
                },
                {
                  type: 'email',
                  message: 'Please input correct email address',
                  trigger: 'change',
                },
              ]"
            >
              <ElInput
                type="email"
                placeholder="Email"
                v-model="ruleForm.email"
              />
            </ElFormItem>
          </VCol>
          <VCol cols="12" md="6">
            <ElFormItem
              label="Phone Number"
              prop="phone"
              :rules="{ validator: validatePhone, trigger: 'blur' }"
            >
              <ElInput placeholder="Phone number" v-model="ruleForm.phone" />
            </ElFormItem>
          </VCol>
          
          <VCol cols="12" md="6" v-if="mode !== 'update'">
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
          <!-- password_confirmation -->
          <VCol cols="12" md="6" v-if="mode !== 'update'">
            <ElFormItem
              label="Confirm Password"
              prop="password_confirmation"
              :rules="{ validator: validatePass2, trigger: 'blur' }"
            >
              <ElInput
                type="password"
                placeholder="Confirm Password"
                v-model="ruleForm.password_confirmation"
                
              />
            </ElFormItem>
          </VCol>
          <VCol cols="12" md="6" class="my-2">
            <el-upload
              class="upload-section"
              drag
              :on-change="onFileChange"
              auto-upload="false"
            >
              <div class="el-upload__text">
                <el-icon
                  v-if="!ruleForm.avatar && !previewImage"
                  class="el-icon--upload"
                  ><upload-filled
                /></el-icon>
                <img
                  v-if="ruleForm.avatar || previewImage"
                  :src="previewImage ? previewImage : ruleForm.avatar"
                  alt=""
                  height="60"
                  width="60"
                  class="border mt-2"
                />
                <el-icon class="avatar-uploader-icon"><Plus /></el-icon> <br />
                Drop file here or <em>click to upload</em>
              </div>
              <template #tip>
                <div class="el-upload__tip">
                  jpg/png files with a size less than 2MB <br />
                  <span
                    v-if="imgUploadValidation == true"
                    style="color: #fc6767; font-size: 12px; font-weight: light"
                  >
                    Image is required and must be valid format
                  </span>
                </div>
              </template>
            </el-upload>
          </VCol>
          <VCol cols="12" md="6">            
             <ElFormItem
              label="Role"
             
            >
              <el-select
                v-model="selectedRole"
                placeholder="Select Role"
              >
                <el-option
                  v-for="(item, index) in roleList"
                  :key="index"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </ElFormItem>
          </VCol>
        </VRow>

        <div class="py-4">
          <el-tooltip class="item" effect="dark" content="Save" placement="top-start">
          <ElButton
            class="submit"
            type="primary"
            @click="submitForm(ruleFormRef)"
          >
            {{ mode }}
          </ElButton>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="Update" placement="top-start">

          <ElButton v-if="mode !== 'update'" @click="resetForm(ruleFormRef)"
            >Reset</ElButton
          >
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="Back" placement="top-start">
          <ElButton @click="router.go(-1)" type="info">Back</ElButton>
          </el-tooltip>
        </div>
      </ElCard>
    </ElForm>
  </div>
</template>

<script setup lang="ts">
import { useRolePermissionStore } from "@/stores/tourism/rolePermissionStore";
import { useUserStore } from "@/stores/tourism/userStore";

import { notify } from "@/utils/notification";
import { UploadFilled } from "@element-plus/icons-vue";
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
  ruleForm: {
    type: Object,
    default: () => ({}),
  },
  mode: {
    type: String,
    default: "create",
  },
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
  props.ruleForm.role = selectedRole.value
  props.mode == "create" && !tempImg.value
    ? (imgUploadValidation.value = true)
    : (imgUploadValidation.value = false);
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    props.ruleForm.avatar = tempImg.value ? tempImg.value : "";

    if (valid && !imgUploadValidation.value) {
      loading.value = true;
      try{
      const { data } = props.ruleForm.id
        ? await userStore.updateUser(props.ruleForm)
        : await userStore.createUser(props.ruleForm);
      data.status_code == 200
        ? (notify("Congratulations!", data.message, "success", "top-right"),
          emit("tableDataEmit"),
          loading.value = false)
        : "";
        data.status_code == 200 ? router.push({ name: "userList" }) : "";
      } catch (error) {
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

// image functionality
const typeList = ref([]);

const previewImage = ref(null);
const tempImg = ref("");
const onFileChange = (file) => {
  tempImg.value = file.raw;

  const reader = new FileReader();

  reader.readAsDataURL(file.raw);
  reader.onload = () => {
    previewImage.value = reader.result;
  };
};

const imgViewModal = ref(false);
const modalImg = ref(null);
const viewImage = (item) => {
  imgViewModal.value = true;
  modalImg.value = item;
};

// confirm password validation
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the password again"));
  } else if (value !== props.ruleForm.password) {
    callback(new Error("Two inputs don't match!"));
  } else {
    callback();
  }
};
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the password"));
  } else {
    if (props.ruleForm.password_confirmation !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkPass");
    }
    callback();
  }
};
const validatePhone = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the phone number"));
  } else {
    if (value.length !== 11) {
      callback(new Error("Phone number must be 11 digits"));
    }
    if(value[0] !== "0" && value[1] !== '1' ){
      callback(new Error("Phone number must be start with 01"));
    }
    callback();
  }
};
// role permission section
const roleList = ref([]);
const getRoleList = async () => {
  const { data } = await useRolePermission.getRole();
  roleList.value = data.data;
};
const selectedRole = ref(null);
onMounted(() => {
  getRoleList();
  setTimeout(()=>{
    selectedRole.value = props.ruleForm && props.ruleForm.roles && props.ruleForm.roles[0] ? props.ruleForm.roles[0].name :'';
  },1000)
 
});
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
