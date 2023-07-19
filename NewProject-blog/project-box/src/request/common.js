import service from "./service";

//post请求
export function requestOfPost(url, data) {
  return service.post(url, data)
}

//get请求
export function requestOfGet(url, data) {
  if (data) {
    return service.get(url, data)
  } else {
    return service.get(url)
  }
}