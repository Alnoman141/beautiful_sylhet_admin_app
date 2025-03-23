import request from "@/utils/request"

// get all awareness
export function getPolice(query) {
  return request({
    url: "/police/list",
    method: "post",

    // params: query,
    params: { language_id: 2 },
  })
}




export function createPolice(data) {
  return request({
    url: "/police/store",
    method: "post",
    data,
  })
}

// edit a awareness
export function editPolice(query) {
  return request({
    url: "/police/edit",
    method: "post",
    params: query,
  })
}



// // update a industry
export function updatePolice(data) {
  return request({
    url: "/police/update",
    method: "post",
    data,
  })
}


// createNews

export function deletePolice(data) {
  return request({
    url: "/police/delete",
    method: "post",
    data,
  })
}




