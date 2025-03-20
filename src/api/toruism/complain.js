import request from "@/utils/request"

// complain
export function getComplainList(query) {
  return request({
    url: "/complain/list",
    method: "post",
    params: query,
  })
}

export function submitComplain(data) {
  return request({
    url: "/complain/submit",
    method: "post",
    data,
  })
}

// complain/reply
export function replyComplain(data) {
  return request({
    url: "/complain/reply",
    method: "post",
    data,
  })
}
export function editComplain(query) {
  return request({
    url: "/complain/details",
    method: "post",
    params: query,
  })
}

export function changeStatus(query) {
  return request({
    url: "/complain/status-update",
    method: "post",
    params: query,
  })
}





