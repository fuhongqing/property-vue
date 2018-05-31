import axios from 'axios'
import qs from 'qs'
import { Loading } from 'element-ui'
// import config from '../../static/config/baseURL'

// console.log(Loading)
var loading
// axios 配置属性
//请求的接口，在请求的时候，如axios.get(url,config);这里的url会覆盖掉config中的url
// url: '/user',
//
//   // 请求方法同上
//   method: 'get', // default
//   // 基础url前缀
//   baseURL: 'https://some-domain.com/api/',
//
//
//   transformRequest: [function (data) {
//   // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
//   data = Qs.stringify({});
//   return data;
// }],
//
//   transformResponse: [function (data) {
//   // 这里提前处理返回的数据
//
//   return data;
// }],
//
//   // 请求头信息
//   headers: {'X-Requested-With': 'XMLHttpRequest'},
//
// //parameter参数
// params: {
//   ID: 12345
// },
//
// //post参数，使用axios.post(url,{},config);如果没有额外的也必须要用一个空对象，否则会报错
// data: {
//   firstName: 'Fred'
// },
//
// //设置超时时间
// timeout: 1000,
//   //返回数据类型
//   responseType: 'json', // default
const Axios = axios.create({
  // baseURL: 'http://daili.ehaofang.com:8099',
  // baseURL: config.request_baseUrl,
  // baseURL: 'http://localhost:8081',
  // baseURL: 'http://qudaoapi.ehaofang.net',
  baseURL: '',
  // baseURL: 'http://192.168.1.42:8080',
  timeout: 8000,
  responseType: 'json',
  // withCredentials: true, // 是否允许带cookie这些
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencodedcharset=utf-8'
    'Content-Type': 'application/json;charset=utf-8'
  }
})
//下面是关于同时发起多个请求时的处理
// axios.all([get1(), get2()])
//   .then(axios.spread(function (res1, res2) {
//     // 只有两个请求都完成才会成功，否则会被catch捕获
//   }));
Axios.interceptors.request.use( // POST传参序列化(添加请求拦截器)
  config => {
    // 在发送请求之前做某件事
    if (
      config.method === 'post' ||
      config.method === 'put' ||
      config.method === 'delete'
    ) {
      // 序列化

      //config.data = qs.stringify(config.data)
    }

    // 若是有做鉴权token , 就给头部带上token
    // if (localStorage.token) {
    //   config.headers.Authorization = localStorage.token
    // }

    loading = Loading.service({
      lock: true
    })
    return config
  },
  error => {
    console.log(error)
    // Toast({
    //   message: error,
    //   position: 'middle',
    //   duration: -1
    // })
    loading.close()
    return Promise.reject(error)
  }
)

Axios.interceptors.response.use( // 响应拦截器
  response => {
    loading.close()
    // if (res.status != 200) {
    //   alert(res.statusText)
    //   return Promise.reject(res)
    // }
    if (response.data == null && response.config.responseType === 'json' && response.request.responseText != null) {
      try {
        // eslint-disable-next-line no-param-reassign
        response.data = JSON.parse(response.request.responseText)
      } catch (e) {
        // ignored
      }
    }
    return response
  },
  error => {
    loading.close()
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)

      // switch (error.response.status) {
      //   case 400: error.message = '请求错误(400)' break
      //   case 401: error.message = '未授权，请重新登录(401)' break
      //   case 403: error.message = '拒绝访问(403)' break
      //   case 404: error.message = '请求出错(404)' break
      //   case 408: error.message = '请求超时(408)' break
      //   case 500: error.message = '服务器错误(500)' break
      //   case 501: error.message = '服务未实现(501)' break
      //   case 502: error.message = '网络错误(502)' break
      //   case 503: error.message = '服务不可用(503)' break
      //   case 504: error.message = '网络超时(504)' break
      //   case 505: error.message = 'HTTP版本不受支持(505)' break
      //   default: error.message = `连接出错(${err.response.status})!` break
      // }
    } else {
      // 一些错误是在设置请求的时候触发
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
    }

    // Toast({
    //   message: error.message,
    //   position: 'middle',
    //   duration: -1
    // })

    return Promise.reject(error)
  }
)

export default {
  install: function (Vue, Option) {
    Object.defineProperty(Vue.prototype, '$axios', { value: Axios })
  }
}
