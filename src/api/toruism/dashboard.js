import request from "@/utils/request"

// get all awareness
export
function getDashboard(query) {
  return request({
    url: "/dashboard",
    method: "post",
    params: query,
  })
}
