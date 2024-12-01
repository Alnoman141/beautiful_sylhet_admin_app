import request from "@/utils/request"

// get all skills
export function getSkills(query) {
  return request({
    url: "/skill/list",
    method: "post",
    params: query,
  })
}

// create a skill
export function createSkill(data) {
  return request({
    url: "/skill/store",
    method: "post",
    data,
  })
}

// update a skill
export function updateSkill(data) {
  return request({
    url: "/skill/update",
    method: "post",
    data,
  })
}
