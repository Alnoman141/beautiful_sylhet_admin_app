import request from "@/utils/request"

// get all categories
export function getCategories(query) {
  return request({
    url: "/category/list",
    method: "post",
    params: query,
  })
}

// create a category
export function createCategory(data) {
  return request({
    url: "/category/store",
    method: "post",
    data,
  })
}

// update a category
export function updateCategory(data) {
  return request({
    url: "/category/update",
    method: "post",
    data,
  })
}
