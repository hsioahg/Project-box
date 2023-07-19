import axios from "axios";
import store from '../store/index'

//axios二次封装
function getTokenByLocal(){
  let token = localStorage.getItem('token');
  return token
}

const service = axios.create({
  baseURL: '/api',
  timeout: 5000
})

//请求拦截
service.interceptors.request.use(
  config => {
    if (getTokenByLocal()) {
      //让每一个接口都带token => 保证安全性
      config.headers['token'] = getTokenByLocal();
      config.headers['Authorization'] = `Bearer ${getTokenByLocal()}`
    } else {
      store.commit('initloginState', false)
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

//响应拦截
service.interceptors.response.use(
  response => {
    let res = response.data;
    //code => 200 201 203 500 502
    if (res.errno == '-2') {
      // 更改登录状态为false
      store.commit('initloginState', false)
    }
    if (res.errno == '2') {
      // 更改登录状态为true
      store.commit('initloginState', true)
    }
    return Promise.resolve(res)
  },
  error => {
    return Promise.reject(error)
  }
)
export default service;