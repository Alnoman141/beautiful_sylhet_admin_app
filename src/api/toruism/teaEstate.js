import request from "@/utils/request"

// get all awareness
export
function getTeaEstate(query) {
  return request({
    url: "/tea-estate/list",
    method: "post",
    params: query,

  })
}

// get awareness by id
export function getTeaEstateById(id) {  
  return request({
    url: "/tea-estate/show",
    method: "post",
    params: id,
  })
}

// // update a industry
export function updateTeaEstate(data) {
  return request({
    url: "/tea-estate/update",
    method: "post",
    data,
  })
}

// createTeaEstate
export function createTeaEstate(data) {
  return request({
    url: "/tea-estate/store",
    method: "post",
    data,
  })
}

