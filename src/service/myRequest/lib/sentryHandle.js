
function _manualTrack ({ name, message, tags = {} } = {}) {
  if (name && message) {
    const trackData = new Error(message)
    trackData.name = name
    window.Sentry && window.Sentry.withScope(function (scope) {
      const { level, ...otherTags } = tags
      level && scope.setLevel(level)
      scope.setTags(otherTags)
      window.Sentry.captureException(trackData)
    })
  } else {
    throw Error(`打点传递参数格式不对，正确格式为：{name: ${name}, message: ${message}}`)
  }
}

function _getAbnormalTrackData (res) {
  const { url, data } = res?.config || {}
  const { status } = res || {}
  const apiName = url.split('?')[0]
  return {
    name: `Abnormal res: ${apiName}`,
    message: JSON.stringify({
      params: data,
      status,
      originMsg: res?.data
    })
  }
}

function _getErroTrackData (res) {
  const originMsg = res?.response?.data
  const status = res?.response?.status
  const params = res?.config?.data
  const url = res?.config?.url || 'Api error'
  const apiName = url.split('?')[0]
  return {
    name: `Error res: ${apiName}`,
    message: JSON.stringify({
      err: res?.message || res,
      params,
      status,
      originMsg
    })
  }
}

function sentryTrack (res, type) {
  let sentryData
  switch (type) {
    case 'abnormal':
      sentryData = _getAbnormalTrackData(res)
      break;

    case 'error':
      sentryData = _getErroTrackData(res)
      break;

    default:
      throw Error('Unknown response type')
  }
  _manualTrack(sentryData)
}


export {
  sentryTrack
}