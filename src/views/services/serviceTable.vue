<template>
  <div>
    <ElCard class="my-4">
      <h4 class="text-h4">
        Description 
      </h4>
      <hr class="mb-4">

      <div class=" my-2 d-flex">
        <div
          :style="route.name == 'Tourism Corporation' || route.name == 'DC Activities' ?'inline-size:45% !important':'inline-size:50% !important'"
          class="border"
        > 
          <p class="px-2 my-2">
            Description
          </p>
          <hr class="text-muted">
          <p
            class="px-2 py-2"
            v-html="descriptions?.descriptions?.name"
          />
        </div>
        <div
          v-if="
            route.name !== 'Tourism Corporation' && route.name !== 'DC Activities'
          "
          style="inline-size:40% !important"
          class="border"
        > 
          <p class="px-2 my-2">
            Fare
          </p>
          <hr class="border-muted">
          <p class="px-2 py-2">
            {{ descriptions?.descriptions?.fare }}
          </p>
        </div>
        <div
          v-if="route.name == 'Tourism Corporation' || route.name == 'DC Activities'"
          :style="route.name == 'Tourism Corporation' || route.name == 'DC Activities' ?'inline-size:45% !important':'inline-size:30% !important'"
          class="border"
        > 
          <p class="px-2 my-2">
            Website Link
          </p>
          <hr class="text-muted">
          <div class="px-4 py-4">
            <p class="px-2 py-2  link-wrap">
              {{ descriptions.link }}
            </p>
          </div>
        </div>
        <div
          style="inline-size:10% !important"
          class="border"
        > 
          <p class="px-2 my-2">
            Action
          </p>
          <hr class="text-muted">
          <div class="my-4">
            <RouterLink
              class="mx-2 "
              style="color: white"
              :underline="false"
              :to="
                route.name == 'Tourism Corporation'
                  ? { name: 'editTourismDescription', params: { type: 1 } }
                  : route.name == 'DC Activities'
                    ? { name: 'editDcDescription', params: { type: 2 } }
                    : route.name == 'busService'
                      ? { name: 'editBusDescription', params: { type: 3 } }
                      : { name: 'editKitkotDescription', params: { type: 4 } }
              "
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
          </div>
        </div>
      </div>
    </ElCard>
    <ElCard>
      <h4 class="text-h4">
        {{ route.name !== 'Tourism Corporation' && route.name !== 'DC Activities' ? 'Spot Wise Contact Information' : 'Officer Contact Information' }}
      </h4>
      <hr class="mb-4">
      <ElTable
        :data="filterTableData"
        style="inline-size: 100%"
        border
      >
        <ElTableColumn
          label="S.L"
          prop="id"
          width="50"
        >
          <template #default="scope">
            {{ scope.$index + 1 }}
          </template>
        </ElTableColumn>
        <ElTableColumn
          v-if="route.name !== 'Tourism Corporation' && route.name !== 'DC Activities'"
          label="Spot Name"
        >
          <template #default="scope">
            {{ scope.row.spots.name }}
          </template>
        </ElTableColumn>

        <ElTableColumn
          :label="route.name !== 'Tourism Corporation' &&
            route.name !== 'DC Activities' ? 'Booking Person Information' : 'Officer Informations'"
        >
          <template #default="scope">
            <div
              v-for="(item, index) in scope.row.booking_numbers"
              :key="index"
            >
              <VRow>
                <VCol cols="12">
                  Name : {{ item.name }}
                </VCol>
                <VCol>
                  <p class="my-0">
                    Phone No
                  </p>
                  <div
                    v-for="(number, idx) in item.numbers"
                    :key="idx"
                    class=" "
                  >
                    <p class="  ">
                      {{ number }}
                    </p>
                  </div>
                </VCol>
              </VRow>
            </div>
          </template>
        </ElTableColumn>

        <ElTableColumn
          v-if="
            route.name !== 'Tourism Corporation' &&
              route.name !== 'DC Activities' &&
              route.name !== 'kitkotChair'
          "
          label="Supervisor Informations"
        >
          <template #default="scope">
            <div
              v-for="(item, index) in scope.row.supervisor_numbers"
              :key="index"
            >
              <VRow>
                <VCol cols="12">
                  Name : {{ item.name }}
                </VCol>
                <VCol>
                  <p class="my-0">
                    Phone No
                  </p>
                  <div
                    v-for="(number, idx) in item.numbers"
                    :key="idx"
                    class=" "
                  >
                    <p class="  ">
                      {{ number }}
                    </p>
                  </div>
                </VCol>
              </VRow>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn
          align="left"
          width="180"
        >
          <template #header>
            <div class="text-start">
              Actions
            </div>
          </template>
          <template #default="scope">
            <RouterLink
              class="mx-2"
              style="color: white"
              :to="{
                name:
                  route.name == 'Tourism Corporation'
                    ? 'editTourism'
                    : route.name == 'DC Activities'
                      ? 'editDc'
                      : route.name == 'busService'
                        ? 'editBus'
                        : 'editKitkot',
                params: { id: scope.row.id },
              }"
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
            </RouterLink>

            <ElButton
              size="small"
              type="danger"
              @click="showAlert(scope.row.id)"
            >
              <VIcon
                icon="tabler-trash"
                size="15"
              />
              <!--  v-if="scope.row.status == 0" -->
            </ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/@core/stores/config"
import { useServiceStore } from "@/stores/tourism/serviceStore"
import { defineEmits, defineProps, ref } from "vue"
import { useRoute } from "vue-router"

const props = defineProps({
  filterTableData: {
    type: Array,
    default: () => [],
  },
  descriptions: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(["tableDataEmit"])

const route = useRoute()

const serviceStore = useServiceStore()

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

const deleteLocker = async item => {
  let arr = []
  arr.push(item)
  try {
    const { data } = await serviceStore.deleteService({ id: item })

    data.status_code == 200
      ? notify("Deleted!", data.message, "error", "top-right")
      : notify("Error", data.message, "error", "top-right")

    emit("tableDataEmit")
  } catch (err) {
    console.log(err)
  }
}

import { ElMessage, ElMessageBox } from "element-plus"

const showAlert = item => {
  ElMessageBox.alert(
    "Are you sure that you want to delete this news ?",
    "Delete",
    {
      confirmButtonText: "Delete",
      confirmButtonClass: "el-button--danger",
      callback: action => {
        ElMessage({
          type: "info",
          message: `action: ${action}`,
        })

        console.log("action", action)
        action == "confirm" ? deleteLocker(item) : ""
      },
    },
  )
}
</script>

<style scoped>
.create-btn {
  border-radius: 5px;
  background-color: rgb(var(--v-theme-primary));
  color: #fff;
  padding-block: 6px;
  padding-inline: 10px;
}

.link-wrap{
  overflow: hidden !important;   
  text-overflow: ellipsis !important;
  word-wrap: break-word !important;
}
</style>
