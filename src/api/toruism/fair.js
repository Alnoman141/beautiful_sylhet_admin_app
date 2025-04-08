import request from "@/utils/request"

// get all awareness
export
function getFair(query) {
  return request({
    url: "/fair-board/list",
    method: "post",
    params: query,
  })
}




export function createFair(data) {
  return request({
    url: "/fair-board/store",
    method: "post",
    data,
  })
}

// edit a awareness
export function editFair(query) {
  return request({
    url: "/fair-board/edit",
    method: "post",
    params: query,
  })
}



// // update a industry
export function updateFair(data) {
  return request({
    url: "/fair-board/update",
    method: "post",
    data,
  })
}


// createNews

export function deleteFair(data) {
  return request({
    url: "/fair-board/delete",
    method: "post",
    data,
  })
}




