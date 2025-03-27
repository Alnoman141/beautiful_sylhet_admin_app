<template>
  <div>
    <div class="text-end">
      <RouterLink
        v-if="$can('edit', 'guideline')"
        :to="{ name: 'edit-guideline', params: { id: 1 } }"
        style="color: white !important; text-decoration: none !important"
      >
        <ElTooltip
          class="box-item"
          effect="dark"
          content="Edit Instructions"
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
        v-for="(guideline, index) in filterTableData"
        :key="index"
        :class="
          index == 0
            ? ' border-s border-t border-b'
            : 'border-s border-t border-b border-e'
        "
        class="px-4"
      >
        <div class="border ps-1 px-4">
          <p class="mx-0 my-0 px-0 py-0">
            {{ index == 0 ? "নির্দেশনা বাংলা" : "Instruction English" }}
          </p>
        </div>
       

        <QuillEditor
          id="preview-quill-editor"
          v-model="guideline.name"
          content-type="html"
          theme="snow"
          toolbar="full"                  
          custom-class="customClass"
          preview-mode
          class="preview-quill "
        />
      </VCol>
    </VRow>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/@core/stores/config"
import QuillEditor from "@/components/quill/QuillEditor.vue"
import { useAwarenessStore } from "@/stores/tourism/awarenessStore"
import { defineEmits, defineProps, ref } from "vue"

const props = defineProps({
  filterTableData: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(["tableDataEmit"])
const previewMode = ref(true)
const editorContent = ref("") // Reactive variable to store the editor content

const awarenessStore = useAwarenessStore()

const configStore = useConfigStore()
const search = ref("")

const filterTableData = computed(() =>
  props.filterTableData.filter(
    data =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase()),
  ),
)
</script>

<style scoped>
.ql-toolbar {
  display: none !important;
}
</style>
