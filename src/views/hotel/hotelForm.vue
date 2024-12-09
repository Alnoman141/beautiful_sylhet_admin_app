<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol>
          <b> Hotel {{ mode == "update" ? "Edit" : "Create" }} </b>
        </VCol>
        <VCol class="text-right">
          <RouterLink
            type="primary"
            :underline="false"
            :to="{ name: 'hotelList' }"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="3"
            class="create-btn"
          >
            Hotel List</RouterLink
          >
        </VCol>
      </VRow>
    </ElCard>
    <ElCard>
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
                v-model="ruleForm.spot_parent_id"
                placeholder="Select Tourist Spot"
                prop="spot_parent_id"
                :rules="{
                  required: true,
                  message: 'Please select Tourist Spot',
                  trigger: 'change',
                }"
              >
                <el-option
                  v-for="(item, index) in spotDropdownData"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </ElFormItem>
          </VCol>
          <VCol cols="12" md="6">
            <ElFormItem
              label="Hotel Type"
              prop="hotel_type_parent_id"
              :rules="{
                required: true,
                message: 'Please select hotel type',
                trigger: 'change',
              }"
            >
              <el-select
                v-model="ruleForm.hotel_type_parent_id"
                placeholder="Select Hotel Type"
                prop="hotel_type_parent_id"
                :rules="{
                  required: true,
                  message: 'Please select Hotel Type',
                  trigger: 'change',
                }"
              >
                <el-option
                  v-for="(item, index) in hotelTypeData"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </ElFormItem>
          </VCol>
          <VCol cols="12" md="6">
            <ElFormItem
              label="Hotel Category"
              prop="hotel_category_parent_id"
              :rules="{
                required: true,
                message: 'Please select hotel type',
                trigger: 'change',
              }"
            >
              <el-select
                v-model="ruleForm.hotel_category_parent_id"
                placeholder="Select Hotel Type"
              >
                <el-option
                  v-for="(item, index) in hotelCategoryData"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </ElFormItem>
          </VCol>
          <VCol cols="12" md="6">
            <ElFormItem label="Website Link" prop="website_link">
              <ElInput v-model="ruleForm.website_link" />
            </ElFormItem>
          </VCol>
          <VCol cols="12" md="6">
            <ElFormItem label="Map Link" prop="map_link">
              <ElInput v-model="ruleForm.map_link" />
            </ElFormItem>
          </VCol>
        </VRow>

        <VRow>
          <VCol
            v-for="(item, index) in ruleForm && ruleForm.hotels
              ? ruleForm.hotels
              : ruleForm.data"
            :key="index"
            cols="12"
            md="6"
          >
            <fieldset class="rounded py-2 px-2">
              <legend class="mx-4">
                <b> {{ index == 0 ? "Bangla" : "English" }} </b>
              </legend>
              <VRow>
                <VCol cols="12" md="6">
                  <ElFormItem label="Name"   :prop="
                      ruleForm.hotels
                        ? 'hotels.' + index + '.name'
                        : 'data.' + index + '.name'
                    "
                    :rules="{
                      required: true,
                      message: 'name is required',
                      trigger: 'blur',
                    }">
                    <ElInput v-model="item.name" />
                  </ElFormItem>
                </VCol>
                <VCol cols="12" md="6">
                  <ElFormItem label="Phone"   :prop="
                      ruleForm.hotels
                        ? 'hotels.' + index + '.phone'
                        : 'data.' + index + '.phone'
                    "
                    :rules="{
                      required: true,
                      message: 'phone number is required',
                      trigger: 'blur',
                    }">
                    <ElInput v-model="item.phone" />
                  </ElFormItem>
                </VCol>
                <VCol cols="12" md="6">
                  <ElFormItem label="Address" prop="address">
                    <ElInput v-model="item.address" />
                  </ElFormItem>
                </VCol>
                <VCol cols="12" md="6">
                  <ElFormItem label="Description" prop="description">
                    <ElInput v-model="item.description" />
                  </ElFormItem>
                </VCol>
              </VRow>
            </fieldset>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12" md="6" class="my-2">
            <ElFormItem label="Image" prop="image">
              <el-upload class="upload-section" drag :on-change="onFileChange">
                <div class="el-upload__text">
                  <el-icon v-if="!ruleForm.image" class="el-icon--upload"
                    ><upload-filled
                  /></el-icon>
                  <img
                    :src="previewImage ? previewImage : ruleForm.image"
                    alt=""
                    height="60"
                    width="60"
                    class="border mt-2"
                  />
                  <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
                  <br />
                  Drop file here or <em>click to upload</em>
                </div>
                <template #tip>
                  <div class="el-upload__tip">
                    jpg/png files with a size less than 500kb
                  </div>
                </template>
              </el-upload>
            </ElFormItem>
          </VCol>
        </VRow>

        <div class="py-4 ">
          <ElButton class="submit" type="primary" @click="submitForm(ruleFormRef)">
            {{ mode }}
          </ElButton>
          <!-- reset button -->
          <ElButton @click="resetForm(ruleFormRef)">Reset</ElButton>
        </div>
      </ElForm>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
import { useHotelCategoryStore } from "@/stores/tourism/hotelCategoryStore";
import { useHotelStore } from "@/stores/tourism/hotelStore";
import { useHotelTypeStore } from "@/stores/tourism/hotelTypeStore";
import { useSpotStore } from "@/stores/tourism/spotStore";
import { notify } from "@/utils/notification";
import {
  type ComponentSize,
  type FormInstance,
  type FormRules,
} from "element-plus";
import { defineEmits, defineProps, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const emit = defineEmits(["getEmit"]);
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
const hotelStore = useHotelStore();
const spotStore = useSpotStore();
const categoryStore = useHotelCategoryStore();
const typeStore = useHotelTypeStore();
const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules<RuleForm>>({
  // name: [
  //   { required: true, message: 'Please input Activity name', trigger: 'blur' },
  //   { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  // ],
});
const spotDropdownData = ref([]);
const getSpotDropdownList = async () => {
  try {
    const { data } = await spotStore.getSpotDropdown();

    spotDropdownData.value = data.data;
  } catch (e) {
    console.log(e);
  }
};
const hotelCategoryData = ref([]);
const getCategoryDropdownList = async () => {
  try {
    const { data } = await categoryStore.getHotelCategoryDropdown();

    hotelCategoryData.value = data.data;
  } catch (e) {
    console.log(e);
  }
};
const hotelTypeData = ref([]);
const getTypeDropdownList = async () => {
  try {
    const { data } = await typeStore.getHotelTypeDropdown();

    hotelTypeData.value = data.data;
  } catch (e) {
    console.log(e);
  }
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    let data = [];
    props.mode == "update" ? (data = props.ruleForm.news) : "";
    let form = {
      id: props.ruleForm.id,
      spot_parent_id: props.ruleForm.spot_parent_id,
      image: tempImg.value ? tempImg.value : "",
      hotel_type_parent_id: props.ruleForm.hotel_type_parent_id,
      hotel_category_parent_id: props.ruleForm.hotel_category_parent_id,
      link: props.ruleForm.link,
      data: props.ruleForm.hotels,
    };
    props.ruleForm.image = tempImg.value ? tempImg.value : "";
    props.ruleForm.parent_spot_id = props.ruleForm.spot_parent_id;
    if (valid) {
      const { data } = props.ruleForm.id
        ? await hotelStore.updateHotel(form)
        : await hotelStore.createHotel(props.ruleForm);
      data.status_code == 200
        ? notify(
            "Congratulations!",
            data.message,
            "success",
            "top-right",
            emit("getEmit")
          )
        : "";
      router.push({ name: "hotelList" });
    } else {
      console.log("error submit!", fields);
    }
  });
};
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

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
}

const typeList = ref([]);

onMounted(() => {
  getSpotDropdownList();
  getCategoryDropdownList();
  getTypeDropdownList();
});
</script>

<style scoped>
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

.create-btn {
  border-radius: 5px;
  background-color: rgb(var(--v-theme-primary));
  color: #fff;
  padding-block: 6px;
  padding-inline: 10px;
}

.submit{
  text-transform: capitalize;
}
</style>
