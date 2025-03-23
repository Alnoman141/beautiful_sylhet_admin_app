import request from "@/utils/request"

// get all awareness
export function getRestaurantCategory(query) {
  return request({
    url: "/restaurant/category/list",
    method: "post",
    params: { language_id: 2 },
  })
}
export function getRestaurantCategoryDropdown(query) {
  return request({
    url: "/restaurant/category/dropdown",
    method: "post",
    params: { language_id: 2 },
  })
}

export function createRestaurantCategory(data) {
  return request({
    url: "/restaurant/category/store",
    method: "post",
    data,
  })
}

// edit a hotel
export function editRestaurantCategory(query) {
  return request({
    url: "/restaurant/category/edit",
    method: "post",
    params: query,
  })
}





// update a hotel
export function updateRestaurantCategory(data) {
  return request({
    url: "/restaurant/category/update",
    method: "post",
    data,
  })
}

// createNews

export function deleteRestaurantCategory(data) {
  return request({
    url: "/restaurant/category/delete",
    method: "post",
    data,
  })
}





