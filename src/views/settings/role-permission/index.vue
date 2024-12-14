<template>
  <ElCard
    shadow="always"
    class="mt-3 mb-5"
  >
    <div class="d-flex justify-space-between">
      <h3>Role List</h3>
    </div>
  </ElCard>
  <ElCard>
    <ElTable
      v-loading="loading"
      :data="roles"
      border
      style="inline-size: 100%"
      :row-style="configStore.getRowStyle"
      :header-cell-style="configStore.getHeaderRowStyle"
      element-loading-background="rgba(122, 122, 122, 0.8)"
    >
      <ElTableColumn
        prop="id"
        label="ID"
        width="180"
        sortable
      />
      <ElTableColumn
        prop="name"
        label="Name"
        sortable
        min-width="200"
      >
        <template #default="scope">
          <span class="text-capitalize">{{ scope.row.name }}</span>
        </template>
      </ElTableColumn>

      <ElTableColumn
        label="Action"
        prop="name"
        min-width="300"
      >
        <template #default="scope">
          <ElButton
            size="small"
            type="info"
            @click="viewPermissions(scope.row)"
          >
            View Permissions
          </ElButton>
        </template>
      </ElTableColumn>
    </ElTable>
  </ElCard>
</template>

<script lang="ts" setup>
import { useConfigStore } from "@/@core/stores/config"
import { useRoleStore } from "@/stores/roleStore"
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const configStore = useConfigStore()
const roleStore = useRoleStore()

const roles = ref([])
const loading = ref(false)

const getRoles = async () => {
  loading.value = true

  const { data } = await roleStore.getRoles()

  roles.value = data.data

  loading.value = false
}

const viewPermissions = item => {
  // redirect to view permissions page with query params
  router.push({
    name: "rolePermissionView",
    query: {
      id: item.id,
      name: item.name,
    },
  })
}

onMounted(() => {
  getRoles()
})
</script>
