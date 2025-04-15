<template>
  <div>
    <ElTable
      :data="filterTableData"
      border
      :row-style="configStore.getRowStyle"
      :header-cell-style="configStore.getHeaderRowStyle"
      style="inline-size: 100%"
    >
      <ElTableColumn
        v-for="(column, index) in columns"
        :key="index"
        :label="column.label"
        :prop="column.prop"
        :sortable="column.sortable"
        :align="column.align"
        :width="column.prop == 'id' ? '100' : ''"
      >
        <template #default="scope">
          <!-- <div v-html="scope.row[column.prop]" /> -->
          <div
            v-html="
              column.prop !== 'id'
                ? scope.row[column.prop] && scope.row[column.prop].name
                  ? scope.row[column.prop].name
                  : scope.row[column.prop]
                : pageNo == 1
                  ? index++
                  : (pageNo - 1) * pageSize + index++
            "
          />
        </template>
      </ElTableColumn>
      <ElTableColumn
        align="left"
        width="200"
      >
        <template #header>
          <div class="text-start">
            Status
          </div>
        </template>
        <template #default="scope">
          <ElTooltip
            class="item"
            effect="dark"
            content="Delete"
            placement="top-start"
          >
            <ElButton
              :type="
                scope.row.status == 0
                  ? 'info'
                  : scope.row.status == 1
                    ? 'primary'
                    : scope.row.status == 2
                      ? 'success'
                      : scope.row.status == 3
                        ? 'danger'
                        : 'warning'
              "
              disabled
              size="small"
            >
              {{
                scope.row.status == 0
                  ? "Submitted"
                  : scope.row.status == 1
                    ? "In-Progress"
                    : scope.row.status == 2
                      ? "Resolved"
                      : scope.row.status == 3
                        ? "Rejected"
                        : "In-Review"
              }}
            </ElButton>
          </ElTooltip>
        </template>
      </ElTableColumn>

      <!-- Action Buttons Column -->
      <ElTableColumn
        align="left"
        width="100"
      >
        <template #header>
          <div class="text-start">
            Actions
          </div>
        </template>
        <template #default="scope">
          <RouterLink
            v-if="$can('edit', 'user') && scope.row.id !== 1"
            class="mx-2"
            style="color: white"
            :to="{ name: 'editComplain', params: { id: scope.row.id } }"
          >
            <ElTooltip
              class="item"
              effect="dark"
              content="Edit"
              placement="top-start"
            >
              <ElButton
                size="small"
                type="primary"
              >
                <VIcon
                  icon="tabler-edit"
                  size="15"
                />
              </ElButton>
            </ElTooltip>
          </RouterLink>
        </template>
      </ElTableColumn>
    </ElTable>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/@core/stores/config"
import { useUserStore } from "@/stores/tourism/userStore"
import { ElMessage, ElMessageBox } from "element-plus"
import { defineEmits, defineProps, ref } from "vue"
import { useRoute } from "vue-router"

const props = defineProps({
  filterTableData: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Array,
    default: () => [],
  },
  pageNo: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
})

const emit = defineEmits(["tableDataEmit"])
const route = useRoute()
const userStore = useUserStore()

const editorContent = ref("") // Reactive variable to store the editor content

const configStore = useConfigStore()
const search = ref("")

const filterTableData = computed(() =>
  props.filterTableData.filter(
    data =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase()),
  ),
)

const deleteTransport = async item => {
  let arr = []
  arr.push(item)
  try {
    const { data } = await userStore.deleteUser({ id: item })

    data.status_code == 200
      ? notify("Deleted!", data.message, "error", "top-right")
      : notify("Error", data.message, "error", "top-right")

    emit("tableDataEmit")
  } catch (err) {
    console.log(err)
  }
}

const showAlert = item => {
  ElMessageBox.alert(
    "Are you sure that you want to delete this User ?",
    "Delete",
    {
      confirmButtonText: "Delete",
      confirmButtonClass: "el-button--danger",
      callback: action => {
        ElMessage({
          type: "info",
          message: `action: ${action}`,
        })

        
        action == "confirm" ? deleteTransport(item) : ""
      },
    },
  )
}
</script>
