import request from "@/utils/request"

// get all awareness
export function getDoctor(query) {
  return request({
    url: "/doctor/list",
    method: "post",

    // params: query,
    params: { language_id: 2 },
  })
}
export function createDoctor(data) {
  return request({
    url: "/doctor/store",
    method: "post",
    data,
  })
}

// edit a awareness
export function editDoctor(query) {
  return request({
    url: "/doctor/edit",
    method: "post",
    params: query,
  })
}



// // update a industry
export function updateDoctor(data) {
  return request({
    url: "/doctor/update",
    method: "post",
    data,
  })
}


// createNews

export function deleteDoctor(data) {
  return request({
    url: "/doctor/delete",
    method: "post",
    data,
  })
}




