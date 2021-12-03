/**
 * 处理 接口异常
 */

function errorHandle(error, config, type) {
  const response = type === 'responseError' ? error.response : error
  const status = response?.status || 'undefined'
  const code = response?.data?.code || 'undefined'
  const responseErrorHandle = config?.responseErrorHandle
  if (responseErrorHandle) {
    if (typeof responseErrorHandle === 'function') {
      const handleResult = responseErrorHandle(status, code, error)
      if (handleResult) {
        return handleResult
      }
    } else {
      const { statusHandle, codesHandle } = responseErrorHandle
      if (typeof statusHandle === 'function') {
        const handleResult = statusHandle(status, code, error)
        if (handleResult) {
          return handleResult
        }
      } else if (typeof statusHandle === 'object') {
        const handleResult = statusHandle[status] ? statusHandle[status](error) : null
        if (handleResult) {
          return handleResult
        }
      }
  
      if (typeof codesHandle === 'function') {
        const handleResult = codesHandle(status, code, error)
        if (handleResult) {
          return handleResult
        }
      } else if (typeof codesHandle === 'object') {
        const handleResult = codesHandle[code] ? codesHandle[code](error) : null
        if (handleResult) {
          return handleResult
        }
      }
    }
  }
}

export default errorHandle