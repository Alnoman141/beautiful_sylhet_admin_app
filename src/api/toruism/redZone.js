import request from "@/utils/request"

// get all awareness
export
function getRedZone(query) {
  return request({
    url: "/red-zone/list",
    method: "post",
    params: query,
  })
}




export function createRedZone(data) {
  return request({
    url: "/red-zone/store",
    method: "post",
    data,
  })
}

// edit a awareness
export function editRedZone(query) {
  return request({
    url: "/red-zone/edit",
    method: "post",
    params: query,
  })
}



// // update a industry
export function updateRedZone(data) {
  return request({
    url: "/red-zone/update",
    method: "post",
    data,
  })
}


// createNews

export function deleteRedZone(data) {
  return request({
    url: "/red-zone/delete",
    method: "post",
    data,
  })
}




