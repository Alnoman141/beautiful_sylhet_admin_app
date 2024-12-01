import request from "@/utils/request"

// get all awareness
export function getHotelCategory(query) {
  return request({
    url: "/hotel/category-list",
    method: "post",
    params: query,
  })
}
export function getHotelCategoryDropdown(query) {
  return request({
    url: "/hotel/category-dropdown",
    method: "post",
    params: query,
  })
}

export function createHotelCategory(data) {
  return request({
    url: "/hotel/category-store",
    method: "post",
    data,
  })
}

// edit a hotel
export function editHotelCategory(query) {
  return request({
    url: "/hotel/category-edit",
    method: "post",
    params: query,
  })
}





// update a hotel
export function updateHotelCategory(data) {
  return request({
    url: "/hotel/category-update",
    method: "post",
    data,
  })
}

// createNews

export function deleteHotelCategory(data) {
  return request({
    url: "/hotel/category-delete",
    method: "post",
    data,
  })
}





