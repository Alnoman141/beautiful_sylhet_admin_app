import request from "@/utils/request"



// get all awareness
export function getComplainCategory(query) {
  return request({
    url: "/complain/category/list",
    method: "post",
    params: { language_id: 2 },
  })
}

export function createComplainCategory(data) {
  return request({
    url: "/complain/category/store",
    method: "post",
    data,
  })
}

// edit a awareness
export function editComplainCategory(query) {
  return request({
    url: "/complain/category/edit",
    method: "post",
    params: query,
  })
}



// // update a industry
export function updateComplainCategory(data) {
  return request({
    url: "/complain/category/update",
    method: "post",
    data,
  })
}

export function updatePassword(data) {
  return request({
    url: "/password-update",
    method: "post",
    data,
  })
}

// createNews

export function deleteComplainCategory(data) {
  return request({
    url: "/complain/category/delete",
    method: "post",
    data,
  })
}




