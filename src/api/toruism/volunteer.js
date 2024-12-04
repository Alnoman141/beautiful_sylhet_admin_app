import request from "@/utils/request"

// get all awareness
export function getVolunteer(query) {
  return request({
    url: "/beach-volunteer/list",
    method: "post",
    params: query,
  })
}




export function createVolunteer(data) {
  return request({
    url: "/beach-volunteer/store",
    method: "post",
    data,
  })
}

// edit a awareness
export function editVolunteer(query) {
  return request({
    url: "/beach-volunteer/edit",
    method: "post",
    params: query,
  })
}



// // update a industry
export function updateVolunteer(data) {
  return request({
    url: "/beach-volunteer/update",
    method: "post",
    data,
  })
}


// createNews

export function deleteVolunteer(data) {
  return request({
    url: "/beach-volunteer/delete",
    method: "post",
    data,
  })
}




