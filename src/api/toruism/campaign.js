import request from "@/utils/request"

// get all awareness
export
function getCampaign(query) {
  return request({
    url: "/campaign/list",
    method: "post",
    params: query,
  })
}
export function createCampaign(data) {
  return request({
    url: "/campaign/store",
    method: "post",
    data,
  })
}

// edit a awareness
export function editCampaign(query) {
  return request({
    url: "/campaign/edit",
    method: "post",
    params: query,
  })
}



// // update a industry
export function updateCampaign(data) {
  return request({
    url: "/campaign/update",
    method: "post",
    data,
  })
}

export function getcampaignType(query) {
  return request({
    url: "/campaign/type",
    method: "post",
    params: query,
  })
}

// createNews

export function deleteCampaign(data) {
  return request({
    url: "/campaign/delete",
    method: "post",
    data,
  })
}




