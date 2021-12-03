export const VUE_APP_ENV = process.env.VUE_APP_ENV

export const isNoDev = ['production', 'rc'].includes(VUE_APP_ENV)
export const isProduction = VUE_APP_ENV === 'production' || VUE_APP_ENV === 'rc'
export const isDevelop = VUE_APP_ENV === 'develop'

// api baseUrl
const API_BASE_URL_MAP = {
  develop: '//c74ef8b5-7d33-4b15-ba20-a7e2a838eefc.bspapp.com',
  production: '//c74ef8b5-7d33-4b15-ba20-a7e2a838eefc.bspapp.com'
}
export const API_BASE_URL = API_BASE_URL_MAP[VUE_APP_ENV]
