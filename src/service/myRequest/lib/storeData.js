/**
 * 请求发出的过程预存的一些数据
 * 单例
 */

const storeData = {
  requestNow: {}, // 已经发出，但还没有得到相应的请求 key是api链接
  createKey(method, url, apiParams) {
    return `${method}_${url}_${JSON.stringify(apiParams)}`
  },
  addRequest(storeDataRequestKey, source, requestData = {}) {
    // console.log('添加请求', storeDataRequestKey)
    this.requestNow[storeDataRequestKey] = {
      source: source,
      requestData: requestData
    }
  },
  getRequest(storeDataRequestKey) {
    if (this.requestNow[storeDataRequestKey]) {
      return this.requestNow[storeDataRequestKey]
    } else {
      return null
    }
  },
  setRequest(storeDataRequestKey, data) {
    this.requestNow[storeDataRequestKey] = data
  },
  removeRequest(storeDataRequestKey) {
    // console.log('删除请求', storeDataRequestKey)
    delete this.requestNow[storeDataRequestKey]
  },
  cancleRequest(storeDataRequestKey, handleStop = true) {
    if (handleStop && this.requestNow[storeDataRequestKey]) {
      // console.log('结束重复请求', storeDataRequestKey)
      this.requestNow[storeDataRequestKey].source.cancel()
      this.removeRequest(storeDataRequestKey)
    }
  },
}

export default storeData
