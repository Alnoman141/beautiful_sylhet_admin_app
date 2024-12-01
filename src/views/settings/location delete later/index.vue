<template>
  <ElCard shadow="always" class="mt-3 mb-5">
    <div class="d-flex justify-space-between">
      <h3>Location List</h3>
      <ElButton type="primary" @click="openCreateModal"> Add New </ElButton>
    </div>
  </ElCard>

  <ElCard>
    <div class="mb-5">
      <el-input
        v-model="query.name"
        v-debounce:300="getLocations"
        style="width: 240px"
        placeholder="Search by Name"
      />
      <el-button
        @click.prevent="getLocations"
        :disabled="!query.name"
        class="mx-3"
        type="primary"
        >Search</el-button
      >
    </div>
    <ElTable
      v-loading="loading"
      :data="locations"
      border
      style="width: 100%"
      :row-style="configStore.getRowStyle"
      :header-cell-style="configStore.getHeaderRowStyle"
      element-loading-background="rgba(122, 122, 122, 0.8)"
    >
      <ElTableColumn prop="id" label="ID" width="180" sortable />
      <ElTableColumn prop="name" label="Name" sortable min-width="300" />

      <ElTableColumn label="Action" prop="name">
        <template #default="scope">
          <ElButton size="small" type="info" @click="getLocation(scope.row.id)">
            Edit
          </ElButton>
          <!-- <ElButton
          size="small"
          type="danger"
        >
          Delete
        </ElButton> -->
        </template>
      </ElTableColumn>
    </ElTable>
  </ElCard>
  <v-card v-if="total > query.per_page" class="d-flex justify-end mt-5 mx-auto py-3">
    <ElPagination
      v-model:current-page="query.page"
      v-model:page-size="query.per_page"
      background
      :pager-count="pagerCount"
      :page-sizes="[20, 50, 100, 250, 500, 1000]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </v-card>
  <ElDialog
    v-model="dialogFormVisible"
    :title="`${form.id ? 'Update' : 'Create New'} Location`"
    width="500"
  >
    <ElForm
      ref="ruleFormRef"
      v-loading="loading"
      style="max-width: 600px"
      :model="form"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
      clearable
      label-position="left"
    >
      <ElFormItem label="Location name" prop="name">
        <ElInput v-model="form.name" placeholder="Enter location name" />
      </ElFormItem>
      <ElFormItem label="Search a place">
        <LocationSearchComponent
          :address="form.address"
          @selectedLocation="getSelectedLocation"
        />
      </ElFormItem>
      <GoogleMap
        api-key="AIzaSyATCiD_BBbQxtpz3zxJ2oBXk4wBU3dQc4g"
        style="width: 100%; height: 500px"
        :center="center"
        :zoom="zoom"
        map-type-id="terrain"
      >
        <Marker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :options="{ position: center, clickable: true, draggable: true }"
          @dragend="getMarker($event)"
        />
      </GoogleMap>
      <ElFormItem label="Location latitude" prop="latitude" class="mt-5">
        <ElInput v-model="form.lat" disabled placeholder="Enter location name" />
      </ElFormItem>
      <ElFormItem label="Location longitude" prop="longitude">
        <ElInput v-model="form.long" disabled placeholder="Enter location name" />
      </ElFormItem>
    </ElForm>
    <template #footer>
      <div class="dialog-footer">
        <ElButton @click="dialogFormVisible = false"> Cancel </ElButton>
        <ElButton type="primary" @click="onSubmit"> Confirm </ElButton>
      </div>
    </template>
  </ElDialog>
</template>

<script lang="ts" setup>
import { useConfigStore } from "@/@core/stores/config";
import { useLocationStore } from "@/stores/locationStore";
import { notify } from "@/utils/notification";
import { onMounted, reactive, ref } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";
import LocationSearchComponent from "./Components/LocationSearchComponent.vue";

component: {
  LocationSearchComponent;
}

const center = ref({ lat: 6.5244, lng: 3.3792 });
const zoom = ref(15);
const apiKey = ref(null);

let markers = ref([]);

const configStore = useConfigStore();
const locationStore = useLocationStore();
const locations = ref([]);
const loading = ref(false);

const pagerCount = ref(5);
const total = ref(0);

const dialogFormVisible = ref(false);

const form = reactive({
  name: "",
  lat: null,
  long: null,
  id: null,
  address: null,
});

const query = reactive({
  per_page: 20,
  page: 1,
  name: "",
});

const formLabelWidth = "140px";
const formSize = ref("default");
const ruleFormRef = ref();

// Validation rules
const rules = reactive({
  name: [
    { required: true, message: "Please input the location name", trigger: "blur" },
    { min: 3, message: "Length should be more than 3", trigger: "blur" },
  ],
});

// Methods - open modal
const openCreateModal = () => {
  form.name = "";
  form.id = null;
  form.lat = null;
  form.long = null;
  form.address = null;
  dialogFormVisible.value = true;
};

// Methods - get locations from the server and set to the locations variable
// it will call from mounted
const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      center.value = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      markers.value = [{ position: center.value }];
    });
  }
};

// Methods - get all locations from the database
const getLocations = async () => {
  loading.value = true;
  try {
    const { data } = await locationStore.getLocations(query);

    locations.value = data.data.data;
    total.value = data.data.total;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
};

// Methods - handle page size change
const handleSizeChange = (val: number) => {
  query.per_page = val;
  getLocations();
};

// Methods - handle current page change. It will call when the user changes the page (pagination)
const handleCurrentChange = (val: number) => {
  query.page = val;
  getLocations();
};

// Methods - get selected location from the search component
const getSelectedLocation = (location) => {
  const position = {
    lat: location.lat,
    lng: location.lng,
  };
  center.value = position;
  markers.value = [{ position }];

  if (!form.name) {
    form.name = location.name;
  }

  form.lat = location.lat;
  form.long = location.lng;
  form.address = location.name;
};

// Methods - get marker position
const getMarker = (event) => {
  const position = {
    lat: event.latLng.lat(),
    lng: event.latLng.lng(),
  };
  center.value = position;
  markers.value = [{ position }];

  form.lat = event.latLng.lat();
  form.long = event.latLng.lng();
};

// Methods - submit form and create/update location
const onSubmit = () => {
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        loading.value = true;
        let res = null;
        if (form.id) {
          res = await locationStore.updateLocation(form);
        } else {
          res = await locationStore.createLocation(form);
        }

        if (res.status === 200) {
          dialogFormVisible.value = false;
          getLocations();
          notify("Success", res.data.message, "success", "top-right");

          // Reset form
          form.name = "";
          form.id = null;
          form.lat = null;
          form.long = null;
          form.address = null;
        }
        loading.value = false;
      } catch (error) {
        notify(
          error?.response?.data?.message,
          error?.response?.data?.error,
          "error",
          "top-right"
        );
        loading.value = false;
      }
    }
  });
};

// Methods - get location by id
const getLocation = async (id) => {
  loading.value = true;
  const { data } = await locationStore.getLocation(id);

  if (data.status_code === 200) {
    form.name = data.data.name;
    form.id = data.data.id;
    form.lat = data.data?.lat;
    form.long = data.data?.long;
    form.address = data.data?.address;
    dialogFormVisible.value = true;

    if (form.lat && form.long) {
      const position = {
        lat: Number(form.lat),
        lng: Number(form.long),
      };
      markers.value = [{ position }];
      center.value = position;
    } else {
      getCurrentLocation();
    }
  }

  loading.value = false;
};

// Methods - get google map api key
const getMapKey = async () => {
  loading.value = true;
  const res = await locationStore.getGoogleMapsApiKey();
  console.log(res, "res");

  loading.value = false;
};

onMounted(() => {
  getMapKey();
  getLocations();
  getCurrentLocation();
});
</script>
