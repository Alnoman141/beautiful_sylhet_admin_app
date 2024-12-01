<template>
  <ElAutocomplete
    v-model="searchInput"
    :fetch-suggestions="querySearch"
    :trigger-on-focus="false"
    clearable
    class="inline-input w-100"
    placeholder="Please Input"
    @select="handleSelect"
  />
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from "vue"

const props = defineProps({
  address: String,
})

const emit = defineEmits(["selectedLocation"])

const searchInput = ref(null)
let locations = reactive([])

watch(
  () => props.address,
  () => {
    searchInput.value = props.address
  },
)

onMounted(() => {
  // set initial value of search input to address prop
  if (props.address) {
    searchInput.value = props.address
  } else {
    searchInput.value = ""
  }
})

// get suggestions from google places api
const querySearch = (queryString, cb) => {
  if (!queryString) {
    locations = []

    return
  }

  const service = new google.maps.places.AutocompleteService()

  service.getPlacePredictions({ input: searchInput.value }, (predictions, status) => {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
      return
    }

    if (predictions.length === 0) {
      return
    }

    const results = queryString
      ? predictions.filter(createFilter(queryString))
      : predictions

    const data = results.map(item => {
      return {
        value: item.description,
        placeId: item.place_id,
      }
    })

    // call callback function to return suggestions
    cb(data)
  })
}

// filter suggestions
const createFilter = queryString => {
  return item => {
    return item.description.toLowerCase().indexOf(queryString.toLowerCase()) > -1
  }
}

// handle select event
const handleSelect = item => {
  const placeId = item.placeId

  const placeService = new google.maps.places.PlacesService(
    document.createElement("div"),
  )

  placeService.getDetails({ placeId: placeId, fields: ["geometry"] }, (place, status) => {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
      return
    }

    const location = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      name: searchInput.value,
    }

    // emit event to parent component
    emit("selectedLocation", location)
  })
}
</script>
