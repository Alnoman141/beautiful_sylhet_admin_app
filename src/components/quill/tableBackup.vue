<template>
  <div class="editor-container">
    <div class="editor-toolbar">
      <ElButton
        size="small"
        @click="insertTable"
      >
        Insert Table
      </ElButton>
    </div>
    <div
      ref="quillEditor"
      class="quill-editor"
    />
  </div>
</template>

<script setup>
import { ElForm, ElFormItem, ElInputNumber, ElMessage, ElMessageBox } from 'element-plus'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { h, nextTick, onMounted, ref } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const quillEditor = ref(null)
let quill
let initialColumns = 0  // Store the first column input
let columnSetOnce = false

onMounted(() => {
  quill = new Quill(quillEditor.value, {
    theme: 'snow',
    modules: {
      toolbar: false,
    },
  })

  quill.root.innerHTML = props.modelValue || ''

  quill.on('text-change', () => {
    emit('update:modelValue', quill.root.innerHTML)
    styleTables()
  })

  quill.root.addEventListener('keydown', handleKeyPress)
  styleTables()
})

const handleKeyPress = e => {
  console.log('Key pressed:', e.key)
  if ((e.key === 'Enter' || e.key === 'Tab')) {
    const selection = window.getSelection()
    if (!selection.rangeCount) return

    const range = selection.getRangeAt(0)
    const currentNode = range.startContainer
    const cell = findParentTag(currentNode, 'TD')

    if (!cell) return

    const row = cell.parentElement
    const table = findParentTag(cell, 'TABLE')

    if (!row || !table) return

    const isLastRow = table.rows[table.rows.length - 1] === row
    const isLastCell = row.cells[row.cells.length - 1] === cell

    if (isLastRow && isLastCell) {
      e.preventDefault()

      if (!columnSetOnce && initialColumns === 0 && row.cells.length) {
        initialColumns = row.cells.length
        columnSetOnce = true
      }

      // Call insertTable directly but skip MessageBox and use preset rows/columns
      insertTableDirectly()

      nextTick(() => {
        const newTables = quillEditor.value.querySelectorAll('table')
        const lastTable = newTables[newTables.length - 1]
        const firstCell = lastTable?.rows?.[0]?.cells?.[0]
        if (firstCell) {
          const range = document.createRange()

          range.selectNodeContents(firstCell)
          range.collapse(true)

          const sel = window.getSelection()

          sel.removeAllRanges()
          sel.addRange(range)
        }
      })
    }
  }
}

const findParentTag = (el, tag) => {
  while (el && el.tagName !== tag) {
    el = el.parentElement
  }
  
  return el?.tagName === tag ? el : null
}

const insertTable = async () => {
  const form = ref({ rows: 2, columns: 2 })

  try {
    await ElMessageBox({
      title: 'Insert Table',
      message: () =>
        h('div', { style: 'padding: 10px 0' }, [
          h(
            ElForm,
            {
              labelPosition: 'top',
              labelWidth: '100px',
              size: 'small',
              style: 'width: 100%; max-width: 300px; margin: auto;',
            },
            () => [
              h(
                ElFormItem,
                { label: 'Number of Rows' },
                () =>
                  h(ElInputNumber, {
                    modelValue: form.value.rows,
                    'onUpdate:modelValue': val => (form.value.rows = val),
                    min: 1,
                    controlsPosition: 'right',
                    style: 'width: 100%;',
                  }),
              ),
              h(
                ElFormItem,
                { label: 'Number of Columns' },
                () =>
                  h(ElInputNumber, {
                    modelValue: form.value.columns,
                    'onUpdate:modelValue': val => {
                      form.value.columns = val
                      if (!columnSetOnce) {
                        initialColumns = val
                        columnSetOnce = true
                      }
                    },
                    min: 1,
                    controlsPosition: 'right',
                    style: 'width: 100%;',
                  }),
              ),
            ],
          ),
        ]),
      confirmButtonText: 'Insert',
      cancelButtonText: 'Cancel',
      beforeClose: (action, instance, done) => {
        if (action === 'confirm') {
          if (!form.value.rows || !form.value.columns) {
            ElMessage.error('Please enter valid row and column numbers.')
            
            return
          }
        }
        done()
      },
    })

    const table = createTable(form.value.rows, form.value.columns)

    insertNodeAtCursor(table)
    styleTables()
  } catch {
    // cancelled
  }
}

const insertTableDirectly = () => {
  const rows = 1
  const columns = initialColumns || 2
  const table = createTable(rows, columns)

  insertNodeAtCursor(table)
  styleTables()
}

const createTable = (rows, columns) => {
  const table = document.createElement('table')
  for (let i = 0; i < rows; i++) {
    const row = document.createElement('tr')
    for (let j = 0; j < columns; j++) {
      const cell = document.createElement('td')

      cell.innerText = 'Cell'
      row.appendChild(cell)
    }
    table.appendChild(row)
  }
  
  return table
}

const insertNodeAtCursor = node => {
  

  const range = quill.getSelection(true)
  const temp = document.createElement('div')

  temp.appendChild(node)

  const html = temp.innerHTML

  quill.clipboard.dangerouslyPasteHTML(range.index + 1, html)
}

const styleTables = () => {
  const tables = quillEditor.value.querySelectorAll('table')

  tables.forEach(table => {
    table.style.width = '100%'
    table.style.borderCollapse = 'collapse'
    table.style.margin = '10px 0'

    const cells = table.querySelectorAll('td, th')

    cells.forEach(cell => {
      cell.style.border = '1px solid #aaa'
      cell.style.padding = '6px'
      cell.style.textAlign = 'center'
      cell.style.cursor = 'auto'
    })
  })
}
</script>

<style scoped>
.editor-container {
  overflow: hidden;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.editor-toolbar {
  padding: 8px;
  background-color: #f3f3f3;
  border-block-end: 1px solid #ccc;
}

.quill-editor {
  padding: 10px;
  min-block-size: 250px;
}

table td:last-child:last-of-type:hover {
  background-color: #f0f9eb;
}
</style>
