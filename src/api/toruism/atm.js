import request from "@/utils/request"

// get all awareness
export
function getAtm(query) {
  return request({
    url: "/atm/list",
    method: "post",
    params: query,
  })
}




export function createAtm(data) {
  return request({
    url: "/atm/store",
    method: "post",
    data,
  })
}

// edit a awareness
export function editAtm(query) {
  return request({
    url: "/atm/edit",
    method: "post",
    params: query,
  })
}



// // update a industry
export function updateAtm(data) {
  return request({
    url: "/atm/update",
    method: "post",
    data,
  })
}


// createNews

export function deleteAtm(data) {
  return request({
    url: "/atm/delete",
    method: "post",
    data,
  })
}




