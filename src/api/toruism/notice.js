import request from "@/utils/request"

// get all awareness
export
function getNotice(query) {
  return request({
    url: "/notice/list",
    method: "post",
    params: query,
  })
}
export function createNotice(data) {
  return request({
    url: "/notice/store",
    method: "post",
    data,
  })
}

// edit a awareness
export function editNotice(query) {
  return request({
    url: "/notice/edit",
    method: "post",
    params: query,
  })
}



// // update a industry
export function updateNotice(data) {
  return request({
    url: "/notice/update",
    method: "post",
    data,
  })
}

export function getnoticeType(query) {
  return request({
    url: "/notice/type",
    method: "post",
    params: query,
  })
}

// createNews

export function deleteNotice(data) {
  return request({
    url: "/notice/delete",
    method: "post",
    data,
  })
}




