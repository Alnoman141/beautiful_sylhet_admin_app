import request from "@/utils/request"

// get all awareness
export
function getLandingPage(query) {
  return request({
    url: "/content/list",
    method: "post",
    params: query,
  })
}




export function createLandingPage(data) {
  return request({
    url: "/content/store",
    method: "post",
    data,
  })
}

// edit a awareness
export function editLandingPage(query) {
  return request({
    url: "/content/edit",
    method: "post",
    params: query,
  })
}



// // update a industry
export function updateLandingPage(data) {
  return request({
    url: "/content/update",
    method: "post",
    data,
  })
}


// createNews

export function deleteLandingPage(data) {
  return request({
    url: "/content/delete",
    method: "post",
    data,
  })
}




