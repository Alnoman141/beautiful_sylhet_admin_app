<template>
  <ElCard>
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
                  style=" color:white !important;text-decoration: none !important;"
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
</template>

<script setup lang="ts">
import { useConfigStore } from "@/@core/stores/config"
import { useInfoStore } from "@/stores/tourism/infoStore"

const loading = ref(true)
const configStore = useConfigStore()

const infoStore = useInfoStore()

const info = ref([])

const columns = ref( [
  { label: 'S.L', prop: 'id', sortable: false },
  { label: 'Description', prop: 'description', sortable: false },        
])

const getInfo = async () => {
  loading.value = true
  try {
    const { data } = await infoStore.getInfoDetail()

    info.value.push(data.data)

    loading.value = false
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  
  getInfo()
})
</script>
