import request from "@/utils/request"

// get all awareness
export
function getNews(query) {
  return request({
    url: "/news/list",
    method: "post",

    params: query,

    // params: { language_id: 2 },
  })
}

export function getNewsType(query) {
  return request({
    url: "/news/type",
    method: "post",
    params: query,
  })
}

// edit a awareness
export function editNews(query) {
  return request({
    url: "/news/edit",
    method: "post",
    params: query,
  })
}


// get awareness by id
export function getNewsById(id) {
  return request({
    url: "/news/details",
    method: "post",
    params: { id },
  })
}

// // update a industry
export function updateNews(data) {
  return request({
    url: "/news/update",
    method: "post",
    data,
  })
}

// createNews
export function createNews(data) {
  return request({
    url: "/news/store",
    method: "post",
    data,
  })
}
export function deleteNews(data) {
  return request({
    url: "/news/delete",
    method: "post",
    data,
  })
}


export function publishNews(data) {
  return request({
    url: "/news/publish",
    method: "post",
    data,
  })
}


