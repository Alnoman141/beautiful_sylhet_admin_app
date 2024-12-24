import request from "@/utils/request"

// get all awareness
export
function getService(query) {
  return request({
    url: "/service/list",
    method: "post",
    params: query,
  })
}
export function getDescription(query) {
  return request({
    url: "/service/get-service",
    method: "post",
    params: query,
  })
}
export function createService(data) {
  return request({
    url: "/service/store",
    method: "post",
    data,
  })
}

// edit a awareness
export function editService(query) {
  return request({
    url: "/service/edit",
    method: "post",
    params: query,
  })
}



// // update a industry
export function updateService(data) {
  return request({
    url: "/service/update",
    method: "post",
    data,
  })
}
export function updateDescription(data) {
  return request({
    url: "/service/update-service",
    method: "post",
    data,
  })
}

// createNews

export function deleteService(data) {
  return request({
    url: "/service/delete",
    method: "post",
    data,
  })
}




