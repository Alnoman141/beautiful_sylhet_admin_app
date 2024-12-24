<template>
  <div>
    <ElCard>
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

        <ElTableColumn label="Booking Person Name & Numbers">
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
                  <p class="my-0 px-2">
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
          v-if="route.name !== 'tourismHelpline' && route.name !== 'dcHelpline'"
          label="Supervisor Name & Numbers"
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
                  <p class="my-0 px-2">
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
                  route.name == 'tourismHelpline'
                    ? 'editTourism'
                    : route.name == 'dcHelpline'
                      ? 'editDc'
                      : route.name == 'busService'
                        ? 'editBus'
                        : 'editKitkat',
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
    <ElCard class="my-4">
      <div class="text-end my-4">
        <RouterLink
          type="primary"
          :underline="false"
          :to="
            route.name == 'tourismHelpline'
              ? { name: 'editTourismDescription', params: { type: 1 } }
              : route.name == 'dcHelpline'
                ? { name: 'editDcDescription', params: { type: 2 } }
                : route.name == 'busService'
                  ? { name: 'editBusDescription', params: { type: 3 } }
                  : { name: 'editKitkatDescription', params: { type: 4 } }
          "
          class="create-btn"
        >
          <VIcon
            icon="tabler-edit"
            size="15"
          />
          <span class="mx-2">Edit Description</span>
        </RouterLink>
      </div>
      
      <VRow>
        <VCol>
          <div class="border py-2 h-100">
            <b class="px-2 py-2"> Description</b>
            <hr>
            <p
              class="px-2 py-2"
              v-html="descriptions?.descriptions?.name"
            />
          </div>
        </VCol>
        <VCol v-if="route.name !== 'tourismHelpline' && route.name !== 'dcHelpline'">
          <div class="border py-2 h-100">
            <b class="px-2 py-2"> Fare</b>
            <hr>
            <p class="px-2 py-2">
              {{ descriptions?.descriptions?.fare }}
            </p>
          </div>
        </VCol>
        <VCol>
          <div class="border py-2 h-100">
            <b class="px-2 py-2"> Link</b>
            <hr>
            <p
              class="px-2 py-2"
              v-html="descriptions.link"
            />
          </div>
        </VCol>
      </VRow>
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
</style>
