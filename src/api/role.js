import request from "@/utils/request"

// get all roles
export function getRoles(query) {
  return request({
    url: "/role-list",
    method: "post",
    params: query,
  })
}

// get a role by id with its permissions
export function getRole(id) {
  return request({
    url: `/get-single-role`,
    method: "post",
    params: { id },
  })
}

// assign a permission to a role
export function assignPermission(data) {
  return request({
    url: "/role-permission-assign",
    method: "post",
    data,
  })
}
