import request from "@/utils/request"

// get all industries
export function getIndustries(query) {
  return request({
    url: "/industry/list",
    method: "post",
    params: query,
  })
}

// create a industry
export function createIndustry(data) {
  return request({
    url: "/industry/store",
    method: "post",
    data,
  })
}

// update a industry
export function updateIndustry(data) {
  return request({
    url: "/industry/update",
    method: "post",
    data,
  })
}
