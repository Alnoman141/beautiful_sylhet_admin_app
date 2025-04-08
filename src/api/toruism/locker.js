import request from "@/utils/request"

// get all awareness
export
function getLocker(query) {
  return request({
    url: "/locker/list",
    method: "post",
    params: query,
  })
}

export function getNewsType(query) {
  return request({
    url: "/locker/type",
    method: "post",
    params: query,
  })
}

// edit a awareness
export function editLocker(query) {
  return request({
    url: "/locker/edit",
    method: "post",
    params: query,
  })
}


// get awareness by id
export function getNewsById(id) {
  return request({
    url: "/locker/details",
    method: "post",
    params: { id },
  })
}

// // update a industry
export function updateLocker(data) {
  return request({
    url: "/locker/update",
    method: "post",
    data,
  })
}

// createNews
export function createLocker(data) {
  return request({
    url: "/locker/store",
    method: "post",
    data,
  })
}
export function deleteLocker(data) {
  return request({
    url: "/locker/delete",
    method: "post",
    data,
  })
}


export function publishLocker(data) {
  return request({
    url: "/locker/publish",
    method: "post",
    data,
  })
}


