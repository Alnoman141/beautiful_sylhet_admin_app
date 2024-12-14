import request from "@/utils/request"

// get all awareness
export
function getRole(query) {
  return request({
    url: "/role-list",
    method: "post",
    params: query,
  })
}

export function selfRolePermission(query) {
  return request({
    url: "/self-permissions",
    method: "post",
    params: query,
  })
}






// edit a awareness
export function getSingleRole(query) {
  return request({
    url: "/get-single-role",
    method: "post",
    params: query,
  })
}



// // update a industry
export function rolePermissionAssign(data) {
  return request({
    url: "/role-permission-assign",
    method: "post",
    data,
  })
}






