import request from "@/utils/request"

// get all awareness
export function getAwareness(query) {
  return request({
    url: "/awareness/list",
    method: "post",
    params: query,
  })
}

// edit a awareness
export function editAwareness(query) {
  return request({
    url: "/awareness/edit",
    method: "post",
    params: query,
  })
}


// get awareness by id
export function getAwarenessById(id) {
  return request({
    url: "/awareness/details",
    method: "post",
    params: { id },
  })
}

// // update a industry
export function updateAwareness(data) {
  return request({
    url: "/awareness/update",
    method: "post",
    data,
  })
}
