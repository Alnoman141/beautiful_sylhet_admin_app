<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol :cols="info.length == 0 ?'6' : '12'">
          <b> Beach Volunteer List</b>
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
        <ElTable
          v-loading="loading"
          :data="info"
          style="inline-size: 100%"
          border
        >
          <ElTableColumn label="Description">
            <template #default="scope">
              <div class="">
                <div class="text-end">
                  <RouterLink
                    v-if="$can('edit', 'info')"
                    :to="{ name: 'infoEdit' }"
                    style="
                      color: white !important;
                      text-decoration: none !important;
                    "
                  >
                    <ElTooltip
                      class="item"
                      effect="dark"
                      content="Edit"
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

                <div v-html="scope.row.description" />
              </div>
            </template>
          </ElTableColumn>
        </ElTable>
      </div>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/@core/stores/config"
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
    const { data } = await infoStore.getInfoDetail()

    loading.value = false
    info.value.push(data.data)

    
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
</style>
