<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol :cols="info.length == 0 ?'6' : '12'">
          <b> About Cox's Bazar</b>
        </VCol>
        <VCol
          v-if="info.length == 0" 
          :cols="info.length == 0 ?'6' : '12'"
          class="text-right"
        >
          <RouterLink
            v-if="$can('create', 'info')"
            type="primary"
            :underline="false"
            :to="{ name: 'infoCreate' }"
            class="create-btn"
          >
            <ElTooltip
              content="Create Beach Volunteer"
              placement="top"
            >
              Create Cox's Bazar Info
            </ElTooltip>
          </RouterLink>
        </VCol>
      </VRow>
    </ElCard>
    <ElCard>
      <!-- infoCreate -->
      <div class="">
        <div class="text-end">
          <RouterLink
            v-if="$can('edit', 'info')"
            :to="{ name: 'infoEdit' }"
            style=" color:white !important;text-decoration: none !important;"
          >
            <ElTooltip
              class="box-item"
              effect="dark"
              content="Edit Info"
              placement="top-start"
            >
              <ElButton
                type="primary"
                size="small"
              >
                <VIcon
                  icon="tabler-edit"
                  size="15"
                />
              </ElButton>
            </ElTooltip>
          </RouterLink>
        </div>
        
        <VRow class="my-2 mx-2">
          <VCol
            v-for="(information, index) in info"
            :key="index"
            :class="index == 0? ' border-s border-t border-b' : 'border-s border-t border-b border-e'"
          >
            <div class="border ps-1">
              <p class="mx-0 my-0 px-0 py-0">
                {{ index == 0 ? "নির্দেশনা বাংলা" : "Instruction English" }}
              </p>
            </div>
           
            
            <!--
              <QuillEditor
              id="preview-quill-editor"
              v-model="information.description"
              content-type="html"
              theme="snow"
              toolbar="full"                                
              style=" overflow: scroll !important;block-size: 100dvh !important;"
              preview-mode
              class="preview-quill"
              /> 
            -->
            <div class="quill-scroll-wrapper">
              <QuillEditor
                id="preview-quill-editor"
                v-model="information.description"
                content-type="html"
                theme="snow"
                toolbar="full"
                preview-mode
                class="preview-quill"
              />
            </div>
          </VCol>
        </VRow>
      </div>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/@core/stores/config"
import QuillEditor from "@/components/quill/QuillEditor.vue"
import { useInfoStore } from "@/stores/tourism/infoStore"

const loading = ref(true)
const configStore = useConfigStore()

const infoStore = useInfoStore()

const info = ref([])

const columns = ref([
  { label: "S.L", prop: "id", sortable: false },
  { label: "Description", prop: "description", sortable: false },
])

const getInfo = async () => {
  loading.value = true
  try {
    const { data } = await infoStore.editInfo()

    loading.value = false
    info.value= data.data

    
  } catch (error) {
    loading.value = false
    console.log(error)
  }
}

onMounted(() => {
  getInfo()
})
</script>

<style scoped>
.create-btn {
  border-radius: 5px;
  background-color: rgb(var(--v-theme-primary));
  color: #fff;
  padding-block: 6px;
  padding-inline: 10px;
}

.quill-scroll-wrapper {
  box-sizing: border-box;
  padding: 0.5rem;
  max-block-size: 70vh;
  overflow-y: auto;
}

.preview-quill {
  pointer-events: none;
}

/* Optional: tighten spacing inside the preview editor */
.preview-quill .ql-editor {
  padding: 0;
}
</style>
