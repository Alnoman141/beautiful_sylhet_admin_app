import request from "@/utils/request"

// get all subLocations
export function getSubLocations(query) {
  return request({
    url: "/sub-location/list",
    method: "post",
    params: query,
  })
}

// create a sub-location
export function createSubLocation(data) {
  return request({
    url: "/sub-location/store",
    method: "post",
    data,
  })
}

// update a sub-location
export function updateSubLocation(data) {
  return request({
    url: "/sub-location/update",
    method: "post",
    data,
  })
}
