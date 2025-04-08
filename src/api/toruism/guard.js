import request from "@/utils/request"

// get all awareness
export function getGuard(query) {
  return request({
    url: "/life-guard/list",
    method: "post",

    params: query,

    // params: { language_id: 2 },
  })
}




export function createGuard(data) {
  return request({
    url: "/life-guard/store",
    method: "post",
    data,
  })
}

// edit a awareness
export function editGuard(query) {
  return request({
    url: "/life-guard/edit",
    method: "post",
    params: query,
  })
}



// // update a industry
export function updateGuard(data) {
  return request({
    url: "/life-guard/update",
    method: "post",
    data,
  })
}


// createNews

export function deleteGuard(data) {
  return request({
    url: "/life-guard/delete",
    method: "post",
    data,
  })
}




