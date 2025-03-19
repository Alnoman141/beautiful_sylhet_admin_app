import request from "@/utils/request"

// get all awareness
export function getSpot(query) {
  return request({
    url: "/spot/list",
    method: "post",
    params: query,
  })
}
export function getSpotDropdown(query) {
  return request({
    url: "/spot/dropdown",
    method: "post",
    params: { language_id: 2 },
  })
}

// edit a awareness
export function editSpot(query) {
  return request({
    url: "/spot/edit",
    method: "post",
    params: query,
  })
}


// get awareness by id
export function getSpotById(id) {
  return request({
    url: "/spot/details",
    method: "post",
    params: { id },
  })
}

// // update a industry
export function updateSpot(data) {
  return request({
    url: "/spot/update",
    method: "post",
    data,
  })
}

// createSpot
export function createSpot(data) {
  return request({
    url: "/spot/store",
    method: "post",
    data,
  })
}
export function deleteSpot(data) {
  return request({
    url: "/spot/delete",
    method: "post",
    data,
  })
}
export function deleteImage(query) {
  return request({
    url: "/spot/delete-images",
    method: "post",
    params: query,
  })
}


