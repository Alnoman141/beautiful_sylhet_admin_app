import request from "@/utils/request"

// get all awareness
export function getUser(query) {
  return request({
    url: "/user/list",
    method: "post",
    params: query,
  })
}

export function getUserActivity(query) {
  return request({
    url: "/user/activity",
    method: "post",
    params: query,
  })
}




export function createUser(data) {
  return request({
    url: "/user/store",
    method: "post",
    data,
  })
}

// edit a awareness
export function editUser(query) {
  return request({
    url: "/user/edit",
    method: "post",
    params: query,
  })
}



// // update a industry
export function updateUser(data) {
  return request({
    url: "/user/update",
    method: "post",
    data,
  })
}

// createNews

export function deleteUser(data) {
  return request({
    url: "/user/delete",
    method: "post",
    data,
  })
}




