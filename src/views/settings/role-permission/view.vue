<template>
  <ElCard
    shadow="always"
    class="mt-3 mb-5"
  >
    <div class="d-flex justify-space-between">
      <h3>
        Permissions List of <span class="text-capitalize">{{ role.name }}</span>
      </h3>
      <RouterLink
        class="create-btn"
        :to="{ name: 'rolePermissions' }"
      >
        Role Permission List
      </RouterLink>
    </div>
  </ElCard>

  <ElCard class="mb-3">
    <ElForm
      :model="role"
      label-width="auto"
      style="max-inline-size: 600px"
    >
      <ElFormItem label="Role Name">
        <ElSelect
          v-model="role.name"
          placeholder="Filter permissions by role"
          size="large"
          style="inline-size: 240px"
          class="text-capitalize"
          @change="getPermissions($event)"
        >
          <ElOption
            v-for="item in roles"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            class="text-capitalize"
          />
        </ElSelect>
      </ElFormItem>
    </ElForm>   
  </ElCard>
  <MasonryWall
    v-loading="loading"
    :items="permissions"
    :ssr-columns="1"
    :column-width="300"
    :padding="16"
  >
    <template #default="{ item, index }">
      <ElCard>
        <template #header>
          <div class="card-header">
            <span class="text-capitalize text-h5">{{ `Module Name - ${item.module}` }}</span>
          </div>
        </template>
        
        <ElCheckbox
          v-for="(permission, idx) in item.permission"
          :key="idx"
          v-model="permission.checked"
          :label="permission.name"
          class="text-capitalize d-block"
          size="large"
        />
      </ElCard>
    </template>
  </MasonryWall>
  <ElDivider />
  <div class="text-center">
    <ElTooltip
      class="item"
      effect="dark"
      content="Assign Permissions"
      placement="top-start"
    >
      <ElButton
        type="primary"
        @click="assignPermission"
      >
        Assign Permissions
      </ElButton>
    </ElTooltip>
  </div>
</template>

<script lang="ts" setup>
import { useRoleStore } from "@/stores/roleStore"
import { notify } from "@/utils/notification"
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"

const roleStore = useRoleStore()

const route = useRoute()

const roleName = ref(route.query.name)
const roleId = ref(route.query.id)

const loading = ref(false)
const roles = ref([])
const permissions = ref([])

const role = ref({
  name: null,
  id: null,
})

const getRoles = async () => {
  loading.value = true

  const { data } = await roleStore.getRoles()

  roles.value = data.data

  loading.value = false
}

const getPermissions = async roleId => {
  // get permissions by role id
  loading.value = true

  const  { data } = await roleStore.getRole(roleId)

  const allPermissions = data.data.permissions
  const rolePermissions = data.data.role.permissions

  role.value = {
    name: data.data.role.name,
    id: data.data.role.id,
  }

  let Arr = []
  allPermissions.forEach(element => {
    let newName = element.name + "-" + element.id
    let arr = newName.split("-")

    // make an object group by module name
    let obj = {
      module: arr[0],
      permission: {
        name: arr[1],
        id: arr[2],
        checked: rolePermissions.some(e => e.id === element.id),
      },
    }
    Arr.push(obj)
  })

  // group by module name
  let obj = {
    module: "",
    permission: [],
  }
  let newArr = []
  Arr.forEach((element, index) => {
    if (obj.module === element.module) {
      obj.permission.push(element.permission)
    } else {
      // if module name already exist in newArr  without loop
      if (newArr.some(e => e.module === element.module)) {
        newArr.forEach(e => {
          if (e.module === element.module) {
            e.permission.push(element.permission)
          }
        })
      } else {
        // if module name not exist in newArr
        obj = {
          module: element.module,
          permission: [element.permission],
        }
        newArr.push(obj)
      }
    }
  })

  permissions.value = newArr

  loading.value = false
}

const assignPermission = () => {
  loading.value = true

  // assign permission to role
  const permissionIds = permissions.value
    .map(item => item.permission)
    .flat()
    .filter(item => item.checked)
    .map(item => item.id)

  const data = {
    // eslint-disable-next-line camelcase
    id: role.value.id,
    // eslint-disable-next-line camelcase
    permissions: permissionIds,
  }

  roleStore.assignPermission(data).then(res => {
    if (res.status === 200) {
      notify("Success", res.data.message, "success", "top-right")
    }
    loading.value = false
  }).catch(error => {
    notify(
      'Error!',
      error?.response?.data?.message,
      "error",
      "top-right",
    )
    loading.value = false
  })

}

onMounted(() => {
  role.value = {
    name: roleName.value,
    id: roleId.value,
  }

  getRoles()

  getPermissions(roleId.value)

})
</script>

<style scoped>
/* Main CSS */
.create-btn{
  border-radius: 5px;
  background-color: rgb(var(--v-theme-primary));
  color: #fff;
  padding-block: 6px;
  padding-inline: 10px;
}
</style>
