import request from "@/utils/request"

// get all awareness
export
function getBank(query) {
  return request({
    url: "/bank/list",
    method: "post",
    params: query,
  })
}

export function getBankDropdown(query) {
  return request({
    url: "/bank/dropdown",
    method: "post",
    params: query,
  })
}


export function createBank(data) {
  return request({
    url: "/bank/store",
    method: "post",
    data,
  })
}

// edit a awareness
export function editBank(query) {
  return request({
    url: "/bank/edit",
    method: "post",
    params: query,
  })
}



// // update a industry
export function updateBank(data) {
  return request({
    url: "/bank/update",
    method: "post",
    data,
  })
}


// createNews

export function deleteBank(data) {
  return request({
    url: "/bank/delete",
    method: "post",
    data,
  })
}




