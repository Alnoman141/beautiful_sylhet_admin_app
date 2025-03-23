import request from "@/utils/request"

export function createInfo(data) {
  return request({
    url: "/cox-bazaar/store",
    method: "post",
    data,
  })
}

// edit a cox-bazaar
export function getInfoDetail(query) {
  return request({
    url: "/cox-bazaar/details",
    method: "post",

    // params: query,
    params: { language_id: 2 },
  })
}
export function editInfo(query) {
  return request({
    url: "/cox-bazaar/edit",
    method: "post",
    params: query,
  })
}



