<template>
  <div>
    
     <ElCard>
      <div class="mb-5">
        <RootFormOne />
        <RootFormTwo />
           <UserTable :columns="columns" :filterTableData="filterTableData"/>

        <div class="d-flex justify-end py-4">
    
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[100, 200, 300, 400]"
            :size="size"
            :disabled="disabled"
            :background="background"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </ElCard>

    
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/@core/stores/config";
import UserTable from "@/components/tourism/rooTable.vue";
import RootFormOne from "@/components/tourism/rootFormDynamicOne.vue";
import RootFormTwo from "@/components/tourism/rootFormDynamicTwo.vue";
import { useTestStore } from "@/stores/tourism/usersStore";
import { computed, onMounted, ref } from "vue";
const currentPage = ref(4)
const pageSize = ref(100)
const configStore = useConfigStore()
const testStore = useTestStore()
const size = ref<ComponentSize>('default')
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
const loading = ref(false)

const search = ref('')

const filterTableData = computed(() =>
  users.value.filter(
    data =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase()) || data.email.toLowerCase().includes(search.value.toLowerCase()),
  ),
)

const columns = ref( [
        { label: 'S.L', prop: 'id', sortable: false },
        { label: 'Name', prop: 'name', sortable: false },
        { label: 'Email', prop: 'email', sortable: false },
        { label: 'Phone', prop: 'phone', sortable: false },
        {
          label: 'Avatar',
          prop: 'avatar',
          sortable: false,
          align: 'center',
          slot: 'ElImage',
          slotProps: (scope) => ({
            src: scope.row.avatar, // Avatar from filterTableData
            previewSrcList: [scope.row.avatar],
            style: 'border-radius: 50%; block-size: 40px; inline-size: 40px;',
          }),
        },
      ])

const users = ref([])

const getUsers = async () => {
  loading.value = true
  try {
    const { data } = await testStore.getTestUserList()
    loading.value = false
    users.value = data
    
    

    // users.value = data.data
  } catch (error) {
    loading.value = false
    console.log(error)
  }
  
}


const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}

onMounted(() => {
  getUsers()
})
</script>
