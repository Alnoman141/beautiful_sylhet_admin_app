import axios from "axios"
import { getApiDomain, getToken, removeToken, removeUserAbilityRules, removeUserData } from "./auth"



// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 5000, // request timeout
})



// request interceptor
service.interceptors.request.use(
  config => {
    let token = getToken()
    const name = getApiDomain()

    // do something before request is sent
    if (token) {
      // let each request carry token
      // please modify it according to the actual situation
      (config.headers["Access-Control-Allow-Headers"] = "*"),
      (config.headers["Access-Control-Allow-Origin"] = "*"),
      (config.headers["Accept"] = "application/json"),
      (config.headers["Content-Type"] = "application/json"),
      (config.headers["Authorization"] = "Bearer " + token),
      (config.headers["Content-Type"] = "multipart/form-data"),
      (config.headers["name"] = name)
    }
   
    
    return config
  },
  error => {
    // do something with request error
    console.log("error", error) // for debug
    error.response.data.status_code == 401 ? (removeUserAbilityRules(), removeToken(), removeUserData()) : '' 
    
    
    return Promise.reject(error)
  },
)

export default service
