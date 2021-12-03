import requestBase from '../requestBase'
import { isDevelop } from '@/config/common'
import commonMockData from '../mock/common'

const api = {
  /**
   * 申请验证码
  */
  getSmsCaptcha (phone) {
    return requestBase.post(`/api/omo-security-center/authentication/sendCode`, { phone })
  },
  /**
   * 手机号登录
  */
  login (params) {
    return requestBase.post(`/api/omo-security-center/authentication/phoneLogin`, { ...params })
  },
  /**
   * 手机号登录
  */
  phoneRegisterUser (params) {
    return requestBase.post(`/api/omo-security-center/authentication/phoneRegisterUser`, { ...params })
  },
  /**
   * 根据loginToken获取用户登录的缓存信息
  */
  getInfo () {
    return requestBase.get(`/api/omo-security-center/authentication/loadUserAuths`, {})
  },
  /**
   * 登出
  */
  logout () {
    return requestBase.get(`/api/omo-security-center/authentication/logout`, {})
  }
}

let openMock = false // 开发阶段手动控制
if (!isDevelop) { // 非dev环境，mock不开启
  openMock = false
}

// 替换mock方法
if (openMock) {
  api.getSmsCaptcha = commonMockData.getSmsCaptcha
}

export default api
