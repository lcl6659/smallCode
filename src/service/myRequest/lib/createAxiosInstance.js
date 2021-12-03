/**
 * 负责创建axios基础实例以及相关的拦截器处理
 */
import axios from 'axios'
import LoadingController from './loadingHandler'
import errorHandle from './errorHandle'
import storeData from './storeData'
import { sentryTrack } from './sentryHandle'

function createAxioxInstance(config) {
  // 创建 axios实例
  const instance = axios.create({
    baseURL: config.baseURL,
    timeout: config.timeout || 5000,
    headers: {...config.headers}
  })

  config.loadingController = new LoadingController(config.loading)

  // 添加请求拦截器
  instance.interceptors.request.use(function (requestConfig) {
    // console.log('request', config)
    config.loadingController.showLoading(requestConfig.directMergeKeys?.CLoading) // 显示loading
    // 请求发出去之前，做一些配置
    return requestConfig
  }, function (error) {
    // 请求发送失败
    return Promise.reject(error)
  })

  // 添加响应拦截器
  instance.interceptors.response.use(function (response) {
    // 任何在2xx范围内的状态代码都会触发此功能
    // 处理响应数据
    // console.log(response)
    config.loadingController.hideLoading(response?.config.directMergeKeys?.CLoading)
    let resData = response
    const data = response.data
    let isSuccess = true
    if (config?.requestIsSuccess) {
      isSuccess = config.requestIsSuccess(response)
    } else {
      isSuccess = data.code === 0
    }
    if (isSuccess) {
      if (config.resFormat) {
        if (config.resFormat === '[err,response.data.data]') {
          resData = [null, data.data]
        } else if (config.resFormat === '[err,response.data]') {
          resData = [null, data]
        } else if (config.resFormat === '[err,response]') {
          resData = [null, response]
        } else if (config.resFormat === 'response.data') {
          resData = data
        } else if (config.resFormat === 'response.data.data') {
          resData = data.data
        }
      }
      if (config?.successHandle) {
        config.successHandle(response)
      }
    } else {
      if (config.resFormat) {
        if (config.resFormat === '[err,response.data.data]') {
          resData = [data.data, null]
        } else if (config.resFormat === '[err,response.data]') {
          resData = [data, null]
        } else if (config.resFormat === '[err,response]') {
          resData = [response, null]
        } else if (config.resFormat === 'response.data') {
          resData = data
        } else if (config.resFormat === 'response.data.data') {
          resData = data.data
        }
      }

      setTimeout(() => {
        if (response?.config.directMergeKeys?.CToast) {
          const errMsg = data?.msg || data?.data?.msg || config?.defaultErrorToast  || '接口异常'
          config.toast(errMsg) // toast错误信息
        }
        if (config?.sentryConfig?.isOpen) {
          sentryTrack(response, 'abnormal') // 错误上报
        }
      }, 1)

      // 处理错误
      if (!response?.config.directMergeKeys?.preventResponseErrorHandle) {
        const handleResult = errorHandle(response, config, 'responseSuccess')
        if (handleResult) {
          resData = handleResult
        }
      }
    }

    storeData.removeRequest(response?.config.directMergeKeys?.storeDataRequestKey) // 删除缓存的请求
    return resData
  }, function (error) {
    // 任何超出2xx范围的状态代码都会触发此功能
    // 处理响应错误
    
    // 确定返回的错误数据格式
    const errInfo = error?.response
    let returnData = errInfo
    if (config.resFormat) {
      if (config.resFormat === '[err,response.data.data]') {
        returnData = [errInfo? errInfo?.data : error, null]
      } else if (config.resFormat === '[err,response.data]') {
        returnData = [errInfo? errInfo : error, null]
      } else if (config.resFormat === '[err,response]') {
        returnData = [errInfo? errInfo : error, null]
      }
    }
    
    // 隐藏loading
    config.loadingController.hideLoading(error.response?.config.directMergeKeys?.CLoading)

    // 删除缓存的请求
    storeData.removeRequest(error.response?.config.directMergeKeys?.storeDataRequestKey)
    
      // 处理错误
    if (!error.response?.config.directMergeKeys?.preventResponseErrorHandle) {
      const handleResult = errorHandle(error, config, 'responseError')
      if (handleResult) {
        returnData = handleResult
      }
    }

    // 一些默认行为处理，toast错误提示
    setTimeout(() => {
      if (error.response?.config.directMergeKeys?.CToast) {
        const errMsg = errInfo?.msg || errInfo?.data?.msg || config?.defaultErrorToast || '接口异常'
        config.toast(errMsg) // toast错误信息
      }
      if (config?.sentryConfig?.isOpen) {
        sentryTrack(error, 'error') // 错误上报
      }
    }, 1)


    if (config?.errorResolve) {
      return Promise.resolve(returnData)
    } else {
      return Promise.reject(returnData)
    }
  })

  return instance
}

export default createAxioxInstance