import request from "@/utils/request"

// get all awareness
export
function getRestaurant(query) {
  return request({
    url: "/restaurant/list",
    method: "post",
    params: query,
  })
}




export function createRestaurant(data) {
  return request({
    url: "/restaurant/store",
    method: "post",
    data,
  })
}

// edit a awareness
export function editRestaurant(query) {
  return request({
    url: "/restaurant/edit",
    method: "post",
    params: query,
  })
}



// // update a industry
export function updateRestaurant(data) {
  return request({
    url: "/restaurant/update",
    method: "post",
    data,
  })
}


// createNews

export function deleteRestaurant(data) {
  return request({
    url: "/restaurant/delete",
    method: "post",
    data,
  })
}




