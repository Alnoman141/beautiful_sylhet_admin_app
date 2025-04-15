<template>
  <div>
    <!-- Table Toolbar -->
    <div v-if="tableMode" class="table-toolbar">
      <button @click.prevent="insertTable">Insert Table</button>
      <button @click.prevent="addRow">Add Row</button>
      <button @click.prevent="addColumn">Add Column</button>
      <button @click.prevent="deleteRow">Delete Row</button>
      <button @click.prevent="deleteColumn">Delete Column</button>
      <button @click.prevent="deleteTable">Delete Table</button>
      <button @click.prevent="exitTableMode">Exit Table Mode</button>
    </div>

    <div v-if="!tableMode && !previewMode" style="margin-block-end: 8px;">
      <button @click.prevent="activateTableMode">Table Mode</button>
    </div>

    <!-- Editor -->
    <div :class="{ 'preview-mode': previewMode }">
      <div
        ref="editorContainer"
        :class="!previewMode ? customClass : ''"
      />
    </div>
  </div>
</template>
<script setup>
import Quill from 'quill'
import 'quill/dist/quill.bubble.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import { defineEmits, defineProps, onMounted, ref, watch } from 'vue'

const props = defineProps({
  modelValue: String,
  customClass: { type: String, default: 'quill-editor' },
  Placeholder: { type: String, default: 'Type here...' },
  previewMode: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])

const editorContainer = ref(null)
let quillInstance = null

const tableMode = ref(false)
let currentTable = null

const activateTableMode = () => {
  tableMode.value = true
}

const exitTableMode = () => {
  tableMode.value = false
}

const insertTable = () => {
  const table = document.createElement('table')
  table.border = '1'
  table.style.width = '100%'
  table.style.borderCollapse = 'collapse'
  table.style.margin = '10px 0'

  const tbody = document.createElement('tbody')

  for (let i = 0; i < 2; i++) {
    const tr = document.createElement('tr')
    for (let j = 0; j < 2; j++) {
      const td = document.createElement('td')
      td.contentEditable = 'true'
      td.innerText = `Cell ${i * 2 + j + 1}`
      td.style.border = '1px solid #000'
      td.style.padding = '8px'
      tr.appendChild(td)
    }
    tbody.appendChild(tr)
  }

  table.appendChild(tbody)
  editorContainer.value.querySelector('.ql-editor').appendChild(table)
  currentTable = table
}

const addRow = () => {
  const tables = editorContainer.value.querySelectorAll('table')
  if (!tables.length) return

  currentTable = tables[tables.length - 1]

  const colCount = currentTable.rows[0]?.cells.length || 2
  const newRow = document.createElement('tr')

  for (let i = 0; i < colCount; i++) {
    const td = document.createElement('td')
    td.contentEditable = 'true'
    td.innerText = `New Cell`
    td.style.border = '1px solid #000'
    td.style.padding = '8px'
    newRow.appendChild(td)
  }

  currentTable.querySelector('tbody').appendChild(newRow)
}

const addColumn = () => {
  if (!currentTable) return
  for (const row of currentTable.rows) {
    const cell = document.createElement('td')
    cell.contentEditable = 'true'
    cell.innerText = 'New Cell'
    cell.style.border = '1px solid #000'
    cell.style.padding = '8px'
    row.appendChild(cell)
  }
}

const deleteRow = () => {
  if (!currentTable || currentTable.rows.length === 0) return
  currentTable.deleteRow(currentTable.rows.length - 1)
}

const deleteColumn = () => {
  if (!currentTable || currentTable.rows[0]?.cells.length === 0) return
  for (const row of currentTable.rows) {
    row.deleteCell(row.cells.length - 1)
  }
}

const deleteTable = () => {
  if (!currentTable) return
  currentTable.remove()
  currentTable = null
}

onMounted(() => {
  quillInstance = new Quill(editorContainer.value, {
    theme: 'snow',
    placeholder: props.Placeholder,
    modules: {
      toolbar: [
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ align: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image', 'video'],
        ['clean'],
      ],
    },
  })

  quillInstance.root.innerHTML = props.modelValue || ''

  quillInstance.on('text-change', () => {
    emit('update:modelValue', quillInstance.root.innerHTML)
  })
})

watch(
  () => props.modelValue,
  newValue => {
    if (quillInstance && quillInstance.root.innerHTML !== newValue) {
      quillInstance.root.innerHTML = newValue
    }
  }
)
</script>

<style scoped>
.table-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-block-end: 10px;
}

.preview-mode .ql-editor {
  display: none !important;
}

.customClass {
  block-size: 300px;
}

/* Responsive Editor */
@media (min-width: 320px) {
  .quill-editor {
    block-size: 300px;
    inline-size: 70vw;
  }
}

@media (min-width: 375px) {
  .quill-editor {
    inline-size: 75vw;
  }
}

@media (min-width: 425px) {
  .quill-editor {
    inline-size: 80vw;
  }
}

@media (min-width: 430px) and (max-width: 500px) {
  .quill-editor {
    inline-size: 82vw;
  }
}

@media (min-width: 510px) and (max-width: 600px) {
  .quill-editor {
    inline-size: 85vw;
  }
}

@media (min-width: 610px) and (max-width: 768px) {
  .quill-editor {
    inline-size: 88vw;
  }
}

@media (min-width: 780px) and (max-width: 1022px) {
  .quill-editor {
    inline-size: 90vw;
  }
}

@media (min-width: 1024px) {
  .quill-editor {
    inline-size: 34.1vw;
  }
}

@media (min-width: 1920px) {
  .quill-editor {
    inline-size: 39vw;
  }
}
</style>
