import request from "@/utils/request"

// get all locations
export function getLocations(query) {
  return request({
    url: "/location/list",
    method: "post",
    params: query,
  })
}

// get a location by id
export function getLocation(id) {
  return request({
    url: "/location/info",
    method: "post",
    params: { id },
  })
}

// create a location
export function createLocation(data) {
  return request({
    url: "/location/store",
    method: "post",
    data,
  })
}

// update a location
export function updateLocation(data) {
  return request({
    url: "/location/update",
    method: "post",
    data,
  })
}

// get google map api key
export function getGoogleMapsApiKey() {
  return request({
    url: "/get-map-key",
    method: "post",
  })
}
