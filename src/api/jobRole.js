import request from "@/utils/request"

// get all jobRoles
export function getJobRoles(query) {
  return request({
    url: "/duty/list",
    method: "post",
    params: query,
  })
}

// create a duty
export function createJobRole(data) {
  return request({
    url: "/duty/store",
    method: "post",
    data,
  })
}

// update a duty
export function updateJobRole(data) {
  return request({
    url: "/duty/update",
    method: "post",
    data,
  })
}
