
<template>
  <div>
    <ElCard class="my-4">
      <VRow align="center">
        <VCol>
          <b>Tea Estate {{ mode === 'update' ? 'Edit' : 'Create' }}</b>
        </VCol>

        <VCol class="text-right">
          <RouterLink
            :to="{ name: 'teaEstateList' }"
            class="create-btn"
          >
            Tea Estate List
          </RouterLink>
        </VCol>
      </VRow>
    </ElCard>

    <ElForm
      ref="ruleFormRef"
      v-loading="loading"
      :model="ruleForm"
      :rules="rules"
      label-position="top"
      label-width="auto"
      status-icon
    >
      <!-- Bengali and English fields -->
      <VRow>
        <VCol
          v-for="(item, index) in ruleForm.data"
          :key="item.language_id"
          cols="12"
          md="6"
        >
          <ElCard class="my-2">
            <b>{{ index === 0 ? 'বাংলা' : 'English' }}</b>
            <hr class="my-2" />

            <VRow>
              <!-- Name -->
              <VCol cols="12">
                <ElFormItem
                  :label="index === 0 ? 'চা বাগানের নাম' : 'Tea Estate Name'"
                  :prop="`data.${index}.name`"
                  :rules="[
                    {
                      required: true,
                      message: index === 0
                        ? 'চা বাগানের নাম আবশ্যক'
                        : 'Tea estate name is required',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <ElInput
                    v-model="item.name"
                    :placeholder="index === 0 ? 'চা বাগানের নাম' : 'Tea Estate Name'"
                  />
                </ElFormItem>
              </VCol>

              <!-- Location -->
              <VCol cols="12">
                <ElFormItem
                  :label="index === 0 ? 'অবস্থান' : 'Location'"
                  :prop="`data.${index}.location`"
                  :rules="[
                    {
                      required: true,
                      message: index === 0
                        ? 'অবস্থান আবশ্যক'
                        : 'Location is required',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <ElInput
                    v-model="item.location"
                    :placeholder="index === 0 ? 'অবস্থান লিখুন' : 'Enter location'"
                  />
                </ElFormItem>
              </VCol>

              <!-- Description -->
              <VCol cols="12">
                <ElFormItem
                  :label="index === 0 ? 'বিবরণ' : 'Description'"
                  :prop="`data.${index}.description`"
                  :rules="[
                    {
                      required: true,
                      message: index === 0
                        ? 'বিবরণ আবশ্যক'
                        : 'Description is required',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <ElInput
                    v-model="item.description"
                    type="textarea"
                    :rows="4"
                    :placeholder="index === 0 ? 'বিবরণ লিখুন' : 'Enter description'"
                  />
                </ElFormItem>
              </VCol>

              <!-- Distance -->
              <VCol cols="12">
                <ElFormItem
                  :label="index === 0 ? 'দূরত্ব' : 'Distance'"
                  :prop="`data.${index}.distance`"
                >
                  <ElInput
                    v-model="item.distance"
                    :placeholder="index === 0 ? 'যেমন: ৫ কিলোমিটার' : 'e.g. 5 km'"
                  />
                </ElFormItem>
              </VCol>

              <!-- Contact Information -->
              <VCol cols="12">
                <ElFormItem
                  :label="index === 0 ? 'যোগাযোগের তথ্য' : 'Contact Information'"
                  :prop="`data.${index}.contact_info`"
                >
                  <ElInput
                    v-model="item.contact_info"
                    :placeholder="index === 0 ? 'যোগাযোগের তথ্য লিখুন' : 'Enter contact information'"
                  />
                </ElFormItem>
              </VCol>
            </VRow>
          </ElCard>
        </VCol>
      </VRow>

      <!-- Image and expiry -->
      <ElCard class="my-4">
        <VRow>
          <VCol cols="12" md="6" class="my-2">
            <ElFormItem label="Map Link" prop="map">
              <ElInput
                type="url"
                placeholder="https://www.xyz.com"
                v-model="ruleForm.map"
              />
            </ElFormItem>
          </VCol>
          <!-- Single Image -->
          <VCol cols="12" md="6">
            <ElFormItem label="Single Image" prop="image">
              <ElUpload
                class="upload-section"
                drag
                accept="image/jpeg,image/png,image/webp"
                :auto-upload="false"
                :show-file-list="false"
                :on-change="onFileChange"
                :on-remove="onFileRemove"
                :limit="1"
              >
                <div class="el-upload__text">
                  <ElIcon
                    v-if="!previewImage && !ruleForm.image"
                    class="el-icon--upload"
                  >
                    <UploadFilled />
                  </ElIcon>

                  <img
                    v-if="previewImage || ruleForm.image"
                    :src="previewImage || ruleForm.image"
                    alt="Tourist Tea Estate preview"
                    class="image-preview"
                  />

                  <br />
                  Drop file here or <em>click to upload</em>
                </div>

                <template #tip>
                  <div class="el-upload__tip">
                    JPG, PNG or WebP. Maximum size: 2 MB.
                    <div
                      v-if="imgUploadValidation"
                      class="error-text"
                    >
                      Please select a valid image smaller than 2 MB.
                    </div>
                  </div>
                </template>
              </ElUpload>
            </ElFormItem>
          </VCol>
        </VRow>

        <!-- Actions -->
        <div class="mt-4">
          <ElButton
            type="primary"
            :loading="loading"
            @click="submitForm"
          >
            {{ mode === 'update' ? 'Update' : 'Create' }}
          </ElButton>

          <ElButton
            v-if="mode !== 'update'"
            @click="resetForm"
          >
            Reset
          </ElButton>

          <ElButton
            type="info"
            @click="router.go(-1)"
          >
            Back
          </ElButton>
        </div>
      </ElCard>
    </ElForm>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  ElMessage,
  type FormInstance,
  type FormRules,
  type UploadFile,
} from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import { useTeaEstateStore } from '@/stores/tourism/teaEstateStore'

interface TeaEstateLanguage {
  id: number | null
  name: string
  language_id: number
  location: string
  description: string
  distance: string
  contact_info: string
  map: string
}

interface TeaEstateForm {
  id?: number | null
  expiry: string
  image: string
  data: TeaEstateLanguage[]
}

const props = withDefaults(
  defineProps<{
    ruleForm: TeaEstateForm
    mode?: 'create' | 'update'
  }>(),
  {
    mode: 'create',
  },
)

const emit = defineEmits<{
  getEmit: []
}>()

const router = useRouter()
const teaEstateStore = useTeaEstateStore()

const loading = ref(false)
const ruleFormRef = ref<FormInstance>()

const selectedImage = ref<File | null>(null)
const previewImage = ref('')
const imgUploadValidation = ref(false)

const ruleForm = computed(() => props.ruleForm)

const rules: FormRules = {
  expiry: [
    {
      required: true,
      message: 'Expiry date and time is required',
      trigger: 'change',
    },
  ],
}

const onFileChange = (uploadFile: UploadFile) => {
  imgUploadValidation.value = false

  const file = uploadFile.raw

  if (!file) return

  const validTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
  ]

  if (
    !validTypes.includes(file.type) ||
    file.size > 2 * 1024 * 1024
  ) {
    imgUploadValidation.value = true
    selectedImage.value = null

    if (previewImage.value) {
      URL.revokeObjectURL(previewImage.value)
      previewImage.value = ''
    }

    ElMessage.error(
      'Please select a JPG, PNG, or WebP image smaller than 2 MB.',
    )

    return
  }

  selectedImage.value = file

  if (previewImage.value) {
    URL.revokeObjectURL(previewImage.value)
  }

  previewImage.value = URL.createObjectURL(file)
}

const onFileRemove = () => {
  selectedImage.value = null

  if (previewImage.value) {
    URL.revokeObjectURL(previewImage.value)
    previewImage.value = ''
  }
}

const submitForm = async () => {
  if (!ruleFormRef.value) return

  try {
    await ruleFormRef.value.validate()
  } catch {
    return
  }

  if (imgUploadValidation.value) {
    ElMessage.error('Please select a valid image.')
    return
  }

  loading.value = true

  try {
    const formData = new FormData()

    if (ruleForm.value.id != null) {
      formData.append('id', String(ruleForm.value.id))
    }

    // Send the image only when a new file has been selected.
    if (selectedImage.value) {
      formData.append('image', selectedImage.value)
    }

    // Laravel receives data[0][name], data[1][name], etc.
    ruleForm.value.data.forEach((item, index) => {
      formData.append(`data[${index}][id]`, item.id !== null ? String(item.id) : '')
      formData.append(`data[${index}][name]`, item.name)
      formData.append(
        `data[${index}][language_id]`,
        String(item.language_id),
      )
      formData.append(
        `data[${index}][location]`,
        item.location,
      )
      formData.append(
        `data[${index}][description]`,
        item.description,
      )
      formData.append(
        `data[${index}][distance]`,
        item.distance,
      )
      
      formData.append(
        `data[${index}][contact_info]`,
        item.contact_info,
      )
      formData.append(`data[${index}][map]`, item.map)
    })

    // Change these method names if your store uses different names.
    const response = ruleForm.value.id
      ? await teaEstateStore.updateTeaEstate(formData)
      : await teaEstateStore.createTeaEstate(formData)

    if (response?.status_code === 200) {
      ElMessage.success(
        response.data.message || 'Tourist tea estate saved successfully.',
      )

      emit('getEmit')
      await router.push({ name: 'teaEstateList' })
    } else {
      ElMessage.error(
        response?.data?.message || 'Unable to save tourist tea estate.',
      )
    }
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      'Something went wrong while saving the tourist tea estate.'

    ElMessage.error(message)
    console.error('Tourist tea estate submission failed:', error)
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  ruleFormRef.value?.resetFields()
  selectedImage.value = null
  imgUploadValidation.value = false

  if (previewImage.value) {
    URL.revokeObjectURL(previewImage.value)
    previewImage.value = ''
  }

  props.ruleForm.image = ''
}

onBeforeUnmount(() => {
  if (previewImage.value) {
    URL.revokeObjectURL(previewImage.value)
  }
})
</script>

<style scoped>
.upload-section {
  display: block;
  width: 100%;
  text-align: center;
}

.image-preview {
  display: block;
  width: 100px;
  height: 100px;
  margin: 12px auto;
  border: 1px solid #ddd;
  border-radius: 6px;
  object-fit: cover;
}

.error-text {
  margin-top: 5px;
  color: #fc6767;
  font-size: 12px;
}

.create-btn {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 5px;
  background-color: rgb(var(--v-theme-primary));
  color: white;
  text-decoration: none;
}
</style>
