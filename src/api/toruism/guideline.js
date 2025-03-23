import request from "@/utils/request"

// get all guideline
export function getGuideline(query) {
  return request({
    url: "/guideline/list",
    method: "post",

    // params: query,
    params: { language_id: 2 },
  })
}

// edit a guideline
export function editGuideline(query) {
  return request({
    url: "/guideline/edit",
    method: "post",
    params: query,
  })
}
export function createGuideline(query) {
  return request({
    url: "/guideline/store",
    method: "post",
    params: query,
  })
}


// get guideline by id
export function getGuidelineById(id) {
  return request({
    url: "/guideline/details",
    method: "post",
    params: { id },
  })
}

// // update a industry
export function updateGuideline(data) {
  return request({
    url: "/guideline/update",
    method: "post",
    data,
  })
}
