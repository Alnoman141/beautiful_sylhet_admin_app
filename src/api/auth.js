import request from "@/utils/request"

// user login
export function login(data) {
  return request({
    url: "/login",
    method: "post",
    data: data,
  })
}

// get user permissions
export function getUserPermissions() {
  return request({
    url: "/user-permissions",
    method: "post",
  })
}

// reset password
export function resetPassword(data) {
  return request({
    url: "/forgot-password",
    method: "post",
    data: data,
  })
}

export function updatePassword(data) {
  return request({
    url: "/update-password",
    method: "post",
    data: data,
  })
}

// user logout
export function logout() {
  return request({
    url: "/logout",
    method: "post",
  })
}
