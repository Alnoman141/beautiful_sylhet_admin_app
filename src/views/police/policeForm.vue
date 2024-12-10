<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol cols="6">
          <b> Red Zone {{ mode == "update" ? "Edit" : "Create" }} </b>
        </VCol>
        <VCol cols="6" class="text-right">
          <RouterLink
            type="primary"
            :underline="false"
            :to="{ name: 'redZoneList' }"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="3"
            :on-exceed="handleExceed"
            class="create-btn"
          >
            Red Zone List
          </RouterLink>
        </VCol>
      </VRow>
    </ElCard>

    <ElForm
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      :size="formSize"
      label-position="top"
      status-icon
    >
      <VRow>
        <VCol
          v-for="(item, index) in ruleForm && ruleForm.police
            ? ruleForm.police
            : ruleForm.data"
          :key="index"
          cols="12"
          md="6"
        >
          <ElCard class="rounded py-2 px-2">
            <b> {{ index == 0 ? "Bangla" : "English" }} </b>
            <hr class="my-2" />
            <VRow>
              <VCol cols="12">
                <ElFormItem
                  label="Name"
                  prop="name"
                  :prop="
                    ruleForm.police
                      ? 'police.' + index + '.name'
                      : 'data.' + index + '.name'
                  "
                  :rules="{
                    required: true,
                    message: 'Name is required',
                    trigger: 'blur',
                  }"
                >
                  <ElInput v-model="item.name" />
                </ElFormItem>
              </VCol>
              <VCol cols="12">
                <ElFormItem
                  label="Phone"
                  :prop="
                    ruleForm.police
                      ? 'police.' + index + '.phone'
                      : 'data.' + index + '.phone'
                  "
                  :rules="{
                    required: true,
                    message: 'Phone number is required',
                    trigger: 'blur',
                  }"
                >
                  <ElInput v-model="item.phone" />
                </ElFormItem>
              </VCol>
              <VCol cols="12">
                <ElFormItem
                  label="Instruction"
                  :prop="
                    ruleForm.police
                      ? 'police.' + index + '.instruction'
                      : 'data.' + index + '.instruction'
                  "
                >
                  <ElInput v-model="item.instruction" />
                </ElFormItem>
              </VCol>
            </VRow>
          </ElCard>
        </VCol>
      </VRow>

      <ElCard class="my-4">
        <VRow>
          <VCol cols="12" md="6">
            <ElFormItem
              label="Tourist Spot"
              prop="spot_parent_id"
              :rules="{
                required: true,
                message: 'Please select Tourist Spot',
                trigger: 'change',
              }"
            >
              <el-select
                v-model="ruleForm.police_parent_id"
                placeholder="Select Tourist Spot"
                prop="spot_parent_id"
                :rules="{
                  required: true,
                  message: 'Please select Tourist Spot',
                  trigger: 'change',
                }"
              >
                <el-option
                  v-for="(item, index) in spotDropdown"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </ElFormItem>
          </VCol>
        </VRow>
        <div class="py-4 ">
          <ElButton type="primary" @click="submitForm(ruleFormRef)">
            {{ mode }}
          </ElButton>
          <ElButton v-if="mode !== 'update'" @click="resetForm(ruleFormRef)">Reset</ElButton>
        </div>
      </ElCard>
    </ElForm>
  </div>
</template>

<script setup lang="ts">
import { usePoliceStore } from "@/stores/tourism/policeStore";
import { useSpotStore } from "@/stores/tourism/spotStore";
import { notify } from "@/utils/notification";
import {
  type ComponentSize,
  type FormInstance,
  type FormRules,
} from "element-plus";
import { defineEmits, defineProps, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const spotStore = useSpotStore();

const policeStore = usePoliceStore();
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

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    props.ruleForm.image = tempImg.value ? tempImg.value : "";
    let form = {
      id: props.ruleForm.id,
      // image: tempImg.value ? tempImg.value : null,
      spot_parent_id: props.ruleForm.police_parent_id,
      data: props.ruleForm.police,
    };
    if (valid) {
      const { data } = props.ruleForm.id
        ? await policeStore.updatePolice(form)
        : await policeStore.createPolice(props.ruleForm);
      data.status_code == 200
        ? (notify("Congratulations!", data.message, "success", "top-right"),
          emit("tableDataEmit"))
        : "";
      data.status_code == 200 ? router.push({ name: "policeList" }) : "";
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
}

const spotDropdown = ref([]);
const getSpotDropdown = async () => {
  const { data } = await spotStore.getSpotDropdown();
  spotDropdown.value = data.data;
};

const bankDropdown = ref([]);

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

onMounted(() => {
  getSpotDropdown();
});
</script>

<style scoped>
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
