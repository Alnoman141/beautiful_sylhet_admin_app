<script setup>
import Quill from "quill"
import "quill/dist/quill.snow.css"

/* Import Quill styles */
import "quill/dist/quill.bubble.css"
import "quill/dist/quill.core.css"
import { defineEmits, defineProps, onMounted, ref, watch } from "vue"

const props = defineProps({
  modelValue: String, // For v-model binding
  customClass: { type: String, default: "quill-editor" }, // Custom classes for the editor
  Placeholder: {
    type: String,
    default: "Type here...",
  },
  previewMode: { type: Boolean, default: false }, // New prop for preview mode
})

const emit = defineEmits(["update:modelValue"])

const editorContainer = ref(null)
let quillInstance = null

onMounted(() => {
  quillInstance = new Quill(editorContainer.value, {
    theme: "snow",
    placeholder: props.Placeholder,

    modules: {
      toolbar: [
        [{ size: [] }], // Font & Size
        ["bold", "italic", "underline", "strike"], // Text styles
        [{ color: [] }, { background: [] }], // Text color & Background
        [{ script: "sub" }, { script: "super" }], // Subscript/Superscript
        [{ header: [1, 2, 3, 4, 5, 6, false] }], // Headers
        [{ align: [] }], // Alignment
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ], // Lists & Indent
        // ['blockquote', 'code-block'], // Block types
        ["link", "image", "video"], // Media
        ["clean"], // Clear formatting
      ],
    },
  })

  // Set initial content
  quillInstance.root.innerHTML = props.modelValue || ""

  // Listen for changes and emit updates
  quillInstance.on("text-change", () => {
    emit("update:modelValue", quillInstance.root.innerHTML)
  })
})

// Helper: Get currently selected table element
const getSelectedTable = () => {
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return null
  const node = selection.anchorNode
  if (!node) return null
  
  return node.parentElement?.closest('table')
}

// Insert clean 2x2 table
const insertTable = () => {
  const range = quillInstance.getSelection()
  if (!range) return

  const tableHTML = `
    <table border="1" style="border-collapse: collapse; width: 100%; table-layout: fixed;">
      <tbody>
        <tr style="display: table-row;">
          <td style="border: 1px solid #ccc; padding: 8px;">Row 1 Col 1</td>
          <td style="border: 1px solid #ccc; padding: 8px;">Row 1 Col 2</td>
        </tr>
        <tr style="display: table-row;">
          <td style="border: 1px solid #ccc; padding: 8px;">Row 2 Col 1</td>
          <td style="border: 1px solid #ccc; padding: 8px;">Row 2 Col 2</td>
        </tr>
      </tbody>
    </table><p><br></p>
  `

  quillInstance.clipboard.dangerouslyPasteHTML(range.index, tableHTML)
}




// Add row to selected table
// const addRow = () => {
//   const table = getSelectedTable()
//   if (!table) return
//   const tbody = table.querySelector('tbody')
//   const colCount = table.rows[0]?.cells.length || 2
//   const row = document.createElement('tr')
//   for (let i = 0; i < colCount; i++) {
//     const cell = document.createElement('td')

//     cell.textContent = `Row`
//     row.appendChild(cell)
//   }
//   tbody.appendChild(row)
// }
const addRow = () => {
  const table = getSelectedTable()
  if (!table) return

  const tbody = table.querySelector('tbody')
  const firstRow = tbody?.rows[0]
  if (!firstRow) return

  const newRow = document.createElement('tr')

  newRow.style.display = 'table-row'

  for (let i = 0; i < firstRow.cells.length; i++) {
    const td = document.createElement('td')

    td.textContent = ''
    td.style.border = '1px solid #ccc'
    td.style.padding = '8px'
    newRow.appendChild(td)
  }

  tbody.appendChild(newRow)
}





// Add column to selected table
// const addColumn = () => {
//   const table = getSelectedTable()
//   if (!table) return
//   for (const row of table.rows) {
//     const cellTag = row.parentElement.tagName.toLowerCase() === 'thead' ? 'th' : 'td'
//     const cell = document.createElement(cellTag)

//     cell.textContent = cellTag === 'th' ? 'Header' : 'Col'
//     row.appendChild(cell)
//   }
// }
const addColumn = () => {
  const table = getSelectedTable()
  if (!table) return

  const rows = table.querySelectorAll('tbody tr')

  rows.forEach(row => {
    const newCell = document.createElement('td')

    newCell.textContent = ''
    row.appendChild(newCell)
  })
}



// Delete current column (based on selection)
const deleteColumn = () => {
  const table = getSelectedTable()
  if (!table) return
  const selection = window.getSelection()
  const cell = selection.anchorNode?.parentElement.closest('td, th')
  if (!cell) return
  const colIndex = Array.from(cell.parentNode.children).indexOf(cell)
  for (const row of table.rows) {
    if (row.cells[colIndex]) {
      row.deleteCell(colIndex)
    }
  }
}

// Delete current row
const deleteRow = () => {
  const table = getSelectedTable()
  if (!table) return
  const selection = window.getSelection()
  const cell = selection.anchorNode?.parentElement.closest('td, th')
  const row = cell?.parentElement
  if (row) {
    row.remove()
  }
}

// Delete the entire table
const deleteTable = () => {
  const table = getSelectedTable()
  if (table) table.remove()
}


// 🔁 Toggle Header
const toggleHeader = () => {
  const table = getSelectedTable()
  if (!table) return

  const thead = table.querySelector("thead")
  if (thead) {
    // Remove header
    table.removeChild(thead)
  } else {
    const newThead = table.createTHead()
    const newRow = newThead.insertRow(0)
    for (let i = 0; i < table.rows[0].cells.length; i++) {
      const th = document.createElement("th")

      th.textContent = `Header ${i + 1}`
      newRow.appendChild(th)
    }
  }
}

// Watch for external changes
watch(
  () => props.modelValue,
  newValue => {
    if (quillInstance && quillInstance.root.innerHTML !== newValue) {
      quillInstance.root.innerHTML = newValue
    }
  },
)
</script>

<template>
  <div :class="{ 'preview-mode': previewMode }">
    <!-- <div class="editor-wrapper"> -->
    <!-- Custom Table Controls -->
    <div class="table-controls">
      <button @click.prevent="insertTable">
        Insert Table
      </button>
      <button @click.prevent="addRow">
        Add Row
      </button>
      <button @click.prevent="addColumn">
        Add Column
      </button>
      <button @click.prevent="deleteColumn">
        ❌ Delete Column
      </button>
      <button @click.prevent="deleteTable">
        🧹 Delete Table
      </button>
      <button @click.prevent="toggleHeader">
        Toggle Header
      </button>
    </div>
    <div
      ref="editorContainer"
      :class="previewMode == false ? customClass : ''"
    />
  </div>
  <!-- </div> -->
</template>

<style scoped>
.editor-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.table-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-block-end: 10px;
}

.table-controls button {
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  font-size: 14px;
  padding-block: 6px;
  padding-inline: 10px;
}

/* Hide the toolbar when previewMode is active */

.customClass {
  block-size: 300px;

  /* inline-size: 90vw; */
}

.customClassInfo {
  block-size: 100dvh !important;

  /* inline-size: 90vw; */
}

/* media query for 320px */
@media (min-width: 320px) {
  .quill-editor {
    block-size: 300px;
    inline-size: 70vw;
  }
}

/* media query for 375px */
@media (min-width: 375px) {
  .quill-editor {
    block-size: 300px;
    inline-size: 75vw;
  }
}

/* media query for 425px */
@media (min-width: 425px) {
  .quill-editor {
    block-size: 300px;
    inline-size: 80vw;
  }
}

/* media query for min width 430 px to max widh 768 */
@media (min-width: 430px) and (max-width: 500px) {
  .quill-editor {
    block-size: 300px;

    /* inline-size: 90vw; */
    inline-size: 82vw;
  }
}

@media (min-width: 510px) and (max-width: 600px) {
  .quill-editor {
    block-size: 300px;
    inline-size: 85vw;
  }
}

@media (min-width: 610px) and (max-width: 768px) {
  .quill-editor {
    block-size: 300px;

    /* inline-size: 90vw; */
    inline-size: 88vw;
  }
}

@media (min-width: 780px) and (max-width: 1022px) {
  .quill-editor {
    block-size: 300px;

    /* inline-size: 90vw; */
    inline-size: 90vw;
  }
}

/* media query for 1024px */

@media (min-width: 1024px) {
  .quill-editor {
    block-size: 300px;
    inline-size: 34.1vw;
  }
}

/* media query for 1920px */
@media (min-width: 1920px) {
  .quill-editor {
    block-size: 300px;
    inline-size: 39vw;
  }
}
</style>
