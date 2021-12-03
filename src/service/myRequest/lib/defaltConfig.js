import { showToast, showLoading, hideLoading } from './domFuction'


//默认的 axios初始化配置
export const defaltConfig = {
  environment: 'production', // 运行环境 production 、rc、 develop
  timeout: 5000,
  headers: { // axios实例初始化时，配置的headers
    version: 1
  },
  setRequestDefaultHeaders () { // 动态配置request的headers，这些将于api调用时传入的 extra.headers 合并
    return {}
  },
  resFormat: 'response', // 接口成功，返回的数据格式 response、 response.data、response.data.data、[err,response]、[err,response.data.data]、[err,response.data]
  loading: { // loading 显示、影藏 函数
    show() {
      showLoading()
    },
    hide() {
      hideLoading()
    }
  },
  toast(msg) { // 显示toast函数
    showToast(msg)
  },
  defaultErrorToast: '接口异常',
  requestIsSuccess (response) { // 判断接口请求是否是成功的
    const data = response.data
    if (data.code === 0) {
      return true
    } else {
      return false
    }
  },
  successHandle() {}, // 接口成功走的统一处理
  responseErrorHandle: { // 请求错误的处理
    statusHandle(status, code, errorResponse) {
      console.log(status, code, errorResponse)
      // return errorResponse
    },
    codesHandle: {
      502(errorResponse) {
        console.log('微信授权凭证已过有效期,请重新授权', errorResponse)
      },
      103(errorResponse) {
        console.log('登录过期', errorResponse)
      }
    }
  },
  errorResolve: false, // 接口报错，是否使用 return Promise.resolve(errorData)，默认为false，即默认使用return Promise.reject(errorData)
  sentryConfig: {
    isOpen: true // 是否开启sentry上报
  }
}


// 默认的 接口调用的扩展参数配置
export const defaultExtra = {
  CLoading: true, // 是否显示loading
  CToast: true, // 报错时，是否显示toast
  preventResponseErrorHandle: false // 是否阻止默认或者配置的错误处理，可让api接口编写特殊的独立处理逻辑 默认false(不阻止)
}