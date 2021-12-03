import { message } from 'ant-design-vue'
import { API_BASE_URL, isNoDev, VUE_APP_ENV } from '../config/common'
import store from '@/store'
import MyRequest from './myRequest'

export default new MyRequest(API_BASE_URL, {
  environment: VUE_APP_ENV,
  headers: {},
  timeout: isNoDev ? 5000 : 20000,
  setRequestDefaultHeaders () {
    const header = {}
    return header
  },
  resFormat: '[err,response.data]',
  errorResolve: true, // 接口报错，是否使用 return Promise.resolve(errorData)
  loading: {
    show () {},
    hide () {}
  },
  toast (msg) { // 显示toast函数
    message.error(msg)
  },
  defaultErrorToast: '出错啦',
  requestIsSuccess (response) { // 判断接口请求是否是成功的
    const data = response.data
    if (data) {
      return true
    } else {
      return false
    }
  },
  responseErrorHandle (status, code, err) {
    if (status === 401 || code === 103) {
      if (!window.sessionStorage.getItem('needlogin')) {
        window.sessionStorage.setItem('needlogin', '1')
        message.error(err.data?.msg || '出错啦')
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    } else if (status === 200) {
      if (code !== 0) {
        message.error(err.data?.msg || '出错啦')
      }
    } else if (err.message) {
      if (err.message.includes('timeout')) {
        if (isNoDev) {
          message.error(`接口请求超时`)
        } else {
          message.error(`${err?.config.url}接口请求超时`)
        }
      } else {
        message.error(err.message)
      }
    } else {
      message.error(err?.data?.msg || err?.response.data?.msg || '出错啦')
    }
  }
}, {
  CToast: false,
  CLoading: false
})
