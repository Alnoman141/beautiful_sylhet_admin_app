<template>
  <div>
    <ElCard class=" my-4">
      <VRow>
        <VCol>
          <b>Tourist Spot Ratings</b>
        </VCol>
      </VRow>
    </ElCard>
    <ElCard>
      <ElTable
        :data="spotRatingList"
        border
        style="width: 100%"
      >
        <ElTableColumn
          prop="name"
          label="Tourist Spot Name"
        >
          <template #default="scope">
            {{ scope.row?.spot_parent?.spot[1]?.name }}
          </template>
        </ElTableColumn>
        <ElTableColumn
          prop="tourist name"
          label="Tourist Name"
        >
          <template #default="scope">
            {{ scope.row?.user?.name }}
          </template>
        </ElTableColumn>
        <ElTableColumn
          prop="rating"
          label="Rating"
        />
        <ElTableColumn
          prop="review"
          label="Review"
        />
        <ElTableColumn
          prop="action"
          label="Action"
        >
          <template #default="scope">
            <ElTooltip
              class="box-item"
              effect="dark"
              :content="scope.row.status == 0 ? 'Publish':'Unpublish'"
              placement="top-start"
            >
              <ElButton
                size="small"
                :type="scope.row.status == 0 ? 'success':''"
                @click="showPublishAlert(scope.row.id ,scope.row.status)"
              >
                <VIcon
                  :icon="scope.row.status == 0 ? 'tabler-check':'tabler-eye-off'"
                  size="15"
                />
              </ElButton>
            </ElTooltip>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useConfigStore } from "@/@core/stores/config"
import { useSpotRatingStore } from "@/stores/tourism/spotRatingStore"
import { ElMessage, ElMessageBox } from 'element-plus'
import { notify } from "@/utils/notification"

const configStore = useConfigStore()

const spotRatingStore = useSpotRatingStore()

const spotRatingList = ref([])

const columns = ref( [
  { label: 'S.L', prop: 'id', sortable: false },
  { label: 'Name', prop: 'name', sortable: false },
  { label: 'Location', prop: 'location', sortable: false },
  { label: 'Distance', prop: 'distance', sortable: false },

])

const totalData = ref(0)
const loading = ref(false)
const page = ref(1)
const size = ref(10)

const getSpotRatingList = async (pageSize, pageNo) => {
  size.value = pageSize
  loading.value = true
  let parameter = {
    page: pageNo,
    per_page: pageSize,
    web: 1,
    language_id: 2,
  }
  try {
    const { data } = await spotRatingStore.getSpotRating(parameter)

    loading.value = false
    page.value = data.data.current_page
    spotRatingList.value = data.data.data

    // convert expiry date to am/pm format and update the spotRatingList
    spotRatingList.value.forEach(item => {
      

      const [datePart24, timePart24] = item.expiry ? item.expiry.split(' ') : ''
      let [hours24, minutes24, seconds24] = timePart24 ? timePart24.split(':') : ''
      const period24 = Number(hours24) >= 12 ? 'pm' : 'am'

      hours24 = Number(hours24) % 12 || 12

      // if date is expired then show Expired else show the date
      item.expiry = item.expiry == null ? ('No expiry')  :  new Date(item.expiry) < new Date() ? `Expired at ${datePart24} ${hours24}:${minutes24}:${seconds24} ${period24}` : `${datePart24} ${hours24}:${minutes24}:${seconds24} ${period24}`
    })
    totalData.value = data.data.total
    loading.value = false
    
  } catch (error) {
    loading.value = false
    console.log(error)
  }
}


const showPublishAlert = (id, status) => {
  ElMessageBox.alert(`Are you sure that you want to ${status == 1 ? 'unpublish' : 'publish'}  this review ?`, `${status == 1 ? 'Unpublish' : 'Publish'}`, {
    confirmButtonText: `${status == 1 ? 'Unpublish' : 'Publish'}`,
    confirmButtonClass: 'el-button--primary',
    callback: action => {
      ElMessage({
        type: 'info',
        message: `action: ${action}`,
      })

      
      action == 'confirm' ? publishSpotRating(id, status) : ''
    },
  })
}



const publishSpotRating = async (id, status) => {
  
  try{
    const { data } = await spotRatingStore.publishSpotRating(id, status == 1 ? 0 : 1)

    data.status_code == 200 ? notify('Published!', data.message, 'success', 'top-right') : notify('Success', data.message, 'success', 'top-right')

    getSpotRatingList(size.value, 1)
  }
  catch(err){
    console.log(err)
  }
}

onMounted(() => {
  
  getSpotRatingList(size.value, 1)
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
