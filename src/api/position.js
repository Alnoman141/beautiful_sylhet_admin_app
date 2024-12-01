import request from "@/utils/request"

// get all positions
export function getPositions(query) {
  return request({
    url: "/position/list",
    method: "post",
    params: query,
  })
}

// create a position
export function createPosition(data) {
  return request({
    url: "/position/store",
    method: "post",
    data,
  })
}

// update a position
export function updatePosition(data) {
  return request({
    url: "/position/update",
    method: "post",
    data,
  })
}
