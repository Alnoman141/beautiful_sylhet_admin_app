import request from "@/utils/request"

// get all awareness
export
function getRedZoneCategory(query) {
  return request({
    url: "/red-zone/category/list",
    method: "post",
    params: query,
  })
}




export function createRedZoneCategory(data) {
  return request({
    url: "/red-zone/category/store",
    method: "post",
    data,
  })
}

// edit a awareness
export function editRedZoneCategory(query) {
  return request({
    url: "/red-zone/category/edit",
    method: "post",
    params: query,
  })
}



// // update a industry
export function updateRedZoneCategory(data) {
  return request({
    url: "/red-zone/category/update",
    method: "post",
    data,
  })
}


// createNews

export function deleteRedZoneCategory(data) {
  return request({
    url: "/red-zone/category/delete",
    method: "post",
    data,
  })
}




