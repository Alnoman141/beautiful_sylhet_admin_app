<template>
  <ElCard>
    <div class="">
      <ElTable
        :data="info"
        style="inline-size: 100%"
        border
      >
        <ElTableColumn label="Description">
          <template #default="scope">
            <div class="">
              <div class="text-end">
                <ElButton
                  type="success"
                  size="small"
                >
                  <RouterLink
                    :to="{ name: 'infoEdit' }"
                    style=" color:white !important;text-decoration: none !important;"
                  >
                    <VIcon
                      icon="tabler-edit"
                      size="20"
                    />
                  </RouterLink>
                </ElButton>
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

const configStore = useConfigStore()

const infoStore = useInfoStore()

const info = ref([])

const columns = ref( [
  { label: 'ID', prop: 'id', sortable: true },
  { label: 'Description', prop: 'description', sortable: true },        
])

const getInfo = async () => {
  try {
    const { data } = await infoStore.getInfoDetail()

    info.value.push(data.data)

    console.log(info.value)
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  
  getInfo()
})
</script>
