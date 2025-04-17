<template>
  <div class="editor-container">
    <!--
      <div class="editor-toolbar">
      <div class="text-end">
      <ElButton
      size="small"
      @click="insertTable(0, noOfColumn)"
      >
      Insert Table
      </ElButton>
      </div>
      </div> 
    -->
    <div
      ref="quillEditor"
      class="quill-editor"
    />
  </div>
</template>

<script setup>
import {
  ElForm,
  ElFormItem,
  ElInputNumber,
  ElMessage,
  ElMessageBox,
} from "element-plus"
import Quill from "quill"
import "quill/dist/quill.snow.css"
import { h, onMounted, ref } from "vue"

const props = defineProps(["modelValue"])
const emit = defineEmits(["update:modelValue"])

const quillEditor = ref(null)
let quill
let initialColumns = 0
let columnSetOnce = false

onMounted(() => {
  quill = new Quill(quillEditor.value, {
    theme: "snow",
    placeholder: props.Placeholder,
    modules: {
      toolbar: [
        [{ size: [] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ align: [] }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "video"],
        ["clean"],

        // Custom table button — will be added below
      ],
    },
  })

  // Create the custom insertTable button
  const toolbarContainer = quill.getModule("toolbar").container
  const customButton = document.createElement("button")

  customButton.title = "Add Table"
  customButton.setAttribute("type", "button") // 👈 important!
  customButton.classList.add("ql-insertTable")
  customButton.innerHTML = "🧾" // or an icon/SVG

  // Add the custom button to the toolbar
  toolbarContainer.appendChild(customButton)

  // Add event listener for your custom logic
  customButton.addEventListener("click", e => {
    e.preventDefault()
    insertTable(0, noOfColumn)
  })


  // delete last row button section
  const deleteRowBtn = document.createElement("button")

  deleteRowBtn.innerHTML = "➖"
  deleteRowBtn.title = "Delete Last Row"
  deleteRowBtn.onclick = e => {
    e.preventDefault()
    deleteLastRow()
  }
  toolbarContainer.appendChild(deleteRowBtn)

  // delete last column button section
  const deleteColumnBtn = document.createElement("button")

  // deleteColumnBtn.innerHTML = "➖❌"
  deleteColumnBtn.innerHTML = "┃" // Column + delete
  deleteColumnBtn.title = "Delete Last Column"
  deleteColumnBtn.onclick = e => {
    e.preventDefault()
    deleteLastColumn()
  }
  toolbarContainer.appendChild(deleteColumnBtn)

  // Rest of your setup
  quill.root.innerHTML = props.modelValue || ""

  quill.on("text-change", () => {
    emit("update:modelValue", quill.root.innerHTML)
    styleTables()
  })

  quill.root.addEventListener("keydown", handleKeyPress)
  styleTables()
})


const noOfColumn = ref(0)

// const handleKeyPress = e => {
//   if (e.key === "Enter" || e.key === "Tab") {
//     console.log("Key pressed:", e.key, noOfColumn.value)
//     insertTable(1, noOfColumn)
//   }
// }

const handleKeyPress = e => {
  if (e.key !== "Enter" && e.key !== "Tab") return

  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return

  const range = selection.getRangeAt(0)
  const currentCell = range.startContainer.closest("td")

  if (!currentCell) return

  const currentRow = currentCell.parentElement
  const table = currentRow.closest("table")

  if (!table) return

  const allRows = Array.from(table.querySelectorAll("tr"))
  const isLastRow = currentRow === allRows[allRows.length - 1]

  const currentCells = Array.from(currentRow.querySelectorAll("td"))
  const isLastColumn = currentCell === currentCells[currentCells.length - 1]

  if (isLastRow && isLastColumn) {
    e.preventDefault()
    insertTable(1, noOfColumn)
  }
}


const insertTable = async (noOfRows, noOfColumns) => {
  const columnsInitialValue =
    typeof noOfColumns === "object" && "value" in noOfColumns
      ? noOfColumns.value
      : noOfColumns

  const form = ref({
    rows: 2,
    columns: columnsInitialValue || 2,
  })

  try {
    await ElMessageBox({
      title: "Insert Table",
      message: () =>
        h("div", { style: "padding: 10px 0" }, [
          h(
            ElForm,
            {
              labelPosition: "top",
              labelWidth: "100px",
              size: "small",
              style: "width: 100%; max-width: 300px; margin: auto;",
            },
            () => [
              h(ElFormItem, { label: "Number of Rows" }, () =>
                h(ElInputNumber, {
                  modelValue: form.value.rows,
                  "onUpdate:modelValue": val => (form.value.rows = val),
                  min: 1,
                  controlsPosition: "right",
                  style: "width: 100%;",
                }),
              ),
              h(ElFormItem, { label: "Number of Columns" }, () =>
                h(ElInputNumber, {
                  modelValue: form.value.columns,
                  "onUpdate:modelValue": val => {
                    form.value.columns = val
                    if (!columnSetOnce) {
                      initialColumns = val
                      columnSetOnce = true
                    }
                  },
                  min: 1,
                  controlsPosition: "right",
                  style: "width: 100%;",
                }),
              ),
            ],
          ),
        ]),
      confirmButtonText: "Insert",
      cancelButtonText: "Cancel",
      beforeClose: (action, instance, done) => {
        if (action === "confirm") {
          if (!form.value.rows || !form.value.columns) {
            ElMessage.error("Please enter valid row and column numbers.")
            
            return
          }
        }
        done()
      },
    })

    const table = createTable(form.value.rows, form.value.columns)

    insertNodeAtCursor(table)
    styleTables()

    noOfColumn.value = form.value.columns
  } catch {
    // cancelled
  }
}

const createTable = (rows, columns) => {
  const table = document.createElement("table")
  for (let i = 0; i < rows; i++) {
    const row = document.createElement("tr")
    for (let j = 0; j < columns; j++) {
      const cell = document.createElement("td")

      cell.innerText = ""
      row.appendChild(cell)
    }
    table.appendChild(row)
  }
  
  return table
}

const insertNodeAtCursor = node => {
  const range = quill.getSelection(true)
  const temp = document.createElement("div")

  temp.appendChild(node)

  const html = temp.innerHTML

  quill.clipboard.dangerouslyPasteHTML(range.index + 1, html)
}

const styleTables = () => {
  const tables = quillEditor.value.querySelectorAll("table")

  tables.forEach(table => {
    table.style.width = "100%"
    table.style.borderCollapse = "collapse"
    table.style.margin = "10px 0"

    const cells = table.querySelectorAll("td, th")

    cells.forEach(cell => {
      cell.style.border = "1px solid #aaa"
      cell.style.padding = "6px"
      cell.style.textAlign = "center"
      cell.style.cursor = "auto"
    })
  })
}

function deleteLastRow() {
  const editor = quill.root
  const tables = editor.querySelectorAll("table")

  if (tables.length === 0) return

  const table = tables[tables.length - 1] // Get the last inserted table
  const rows = table.querySelectorAll("tr")

  if (rows.length > 1) {
    const lastRow = rows[rows.length - 1]

    table.deleteRow(lastRow.rowIndex) // Use deleteRow instead of removeChild
  } else {
    // Optionally, if there's only one row left, remove the entire table
    table.remove()
  }
}

function deleteLastColumn() {
  const editor = quill.root
  const tables = editor.querySelectorAll("table")

  if (tables.length === 0) return

  const table = tables[tables.length - 1] // Get the last inserted table
  const rows = table.querySelectorAll("tr")

  if (rows.length > 0) {
    // Loop through all rows to remove the last cell in each
    rows.forEach(row => {
      const cells = row.querySelectorAll("td, th")
      if (cells.length > 0) {
        row.deleteCell(cells.length - 1) // Delete the last cell
      }
    })
  }
}
</script>

<style scoped>
.ql-insertTable {
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  padding-block: 0;
  padding-inline: 6px;
}

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
    block-size: 100dvh;
    inline-size: 34.1vw;
  }
}

@media (min-width: 1920px) {
  .quill-editor {
    block-size: 100dvh !important;
    inline-size: 39vw !important;
  }
}
</style>
