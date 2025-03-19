import request from "@/utils/request"

// get all awareness
export
function getHotelType(query) {
  return request({
    url: "/hotel/type-list",
    method: "post",
    params: query,
  })
}

// getHotelTypeDropdown
export function getHotelTypeDropdown(query) {
  return request({
    url: "/hotel/type-dropdown",
    method: "post",
    params: { language_id: 2 },
  })
}
export function createHotelType(data) {
  return request({
    url: "/hotel/type-store",
    method: "post",
    data,
  })
}

// edit a hotel
export function editHotelType(query) {
  return request({
    url: "/hotel/type-edit",
    method: "post",
    params: query,
  })
}





// update a hotel
export function updateHotelType(data) {
  return request({
    url: "/hotel/type-update",
    method: "post",
    data,
  })
}

// createNews

export function deleteHotelType(data) {
  return request({
    url: "/hotel/type-delete",
    method: "post",
    data,
  })
}





