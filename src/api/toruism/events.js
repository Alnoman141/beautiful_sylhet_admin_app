import request from "@/utils/request"

// get all awareness
export
function getEvents(query) {
  return request({
    url: "/event/list",
    method: "post",
    params: query,
  })
}
export function createEvents(data) {
  return request({
    url: "/event/store",
    method: "post",
    data,
  })
}

// edit a awareness
export function editEvents(query) {
  return request({
    url: "/event/edit",
    method: "post",
    params: query,
  })
}



// // update a industry
export function updateEvents(data) {
  return request({
    url: "/event/update",
    method: "post",
    data,
  })
}

export function geteventType(query) {
  return request({
    url: "/event/type",
    method: "post",
    params: query,
  })
}

// createNews

export function deleteEvents(data) {
  return request({
    url: "/event/delete",
    method: "post",
    data,
  })
}




