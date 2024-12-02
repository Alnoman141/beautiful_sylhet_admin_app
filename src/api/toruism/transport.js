import request from "@/utils/request"

// get all awareness
export
function getTransport(query) {
  return request({
    url: "/transport/list",
    method: "post",
    params: query,
  })
}
export function createTransport(data) {
  return request({
    url: "/transport/store",
    method: "post",
    data,
  })
}

// edit a awareness
export function editTransport(query) {
  return request({
    url: "/transport/edit",
    method: "post",
    params: query,
  })
}



// // update a industry
export function updateTransport(data) {
  return request({
    url: "/transport/update",
    method: "post",
    data,
  })
}

export function getTransportType(query) {
  return request({
    url: "/transport/type",
    method: "post",
    params: query,
  })
}

// createNews

export function deleteTransport(data) {
  return request({
    url: "/transport/delete",
    method: "post",
    data,
  })
}




