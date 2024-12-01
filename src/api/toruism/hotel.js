import request from "@/utils/request"

// get all awareness
export
function getHotel(query) {
  return request({
    url: "/hotel/list",
    method: "post",
    params: query,
  })
}



// edit a hotel
export function editHotel(query) {
  return request({
    url: "/hotel/edit",
    method: "post",
    params: query,
  })
}





// update a hotel
export function updateHotel(data) {
  return request({
    url: "/hotel/update",
    method: "post",
    data,
  })
}

// createNews
export function createHotel(data) {
  return request({
    url: "/hotel/store",
    method: "post",
    data,
  })
}
export function deleteHotel(data) {
  return request({
    url: "/hotel/delete",
    method: "post",
    data,
  })
}


export function publishHotel(data) {
  return request({
    url: "/hotel/publish",
    method: "post",
    data,
  })
}


