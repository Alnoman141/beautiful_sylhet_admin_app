import request from "@/utils/request"

// get all awareness
export function getSpotRating(query) {
  return request({
    url: "/tourist-spot-rating/list",
    method: "post",
    params: query,
  })
}

export function publishSpotRating(id, status) {
  return request({
    url: `/tourist-spot-rating/change-status`,
    method: "post",
    data: { id, status },
  })
}
