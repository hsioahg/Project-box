import { requestOfPost,requestOfGet } from "./common"

export function postRequest(url, data) {
  return new Promise((resolve, reject) => {
    requestOfPost(url, data).then(res => resolve(res))
    .catch(error => reject(error))
  })
}

export function getRequest(url, data) {
  return new Promise((resolve, reject) => {
    requestOfGet(url, data).then(res => resolve(res))
    .catch(error => reject(error))
  })
}
