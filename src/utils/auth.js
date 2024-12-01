const TokenKey = "accessToken"
const userData = "userData"
const apiDomain = "api_domain"
const userAbilityRules = "userAbilityRules"

export function getToken() {
  return useCookie(TokenKey).value
}
  
export function setToken(token) {
  return useCookie(TokenKey).value = token
}
  
export function removeToken() {
  return useCookie(TokenKey).value = null
}

export function getUserData() {
  return useCookie(userData).value
}

export function setUserData(data) {
  return useCookie(userData).value = data
}

export function removeUserData() {
  return useCookie(userData).value = null
}

export function getApiDomain() {
  return useCookie(apiDomain).value
}

export function setApiDomain(data) {
  return useCookie(apiDomain).value = data
}

export function removeApiDomain() {
  return useCookie(apiDomain).value = null
}

export function getUserAbilityRules() {
  return localStorage.getItem(userAbilityRules)
}

export function setUserAbilityRules(data) {
  return localStorage.setItem(userAbilityRules, data)
}

export function removeUserAbilityRules() {
  return localStorage.removeItem(userAbilityRules)
}
