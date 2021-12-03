import createAxioxInstance from './lib/createAxiosInstance'
import { defaltConfig, defaultExtra } from './lib/defaltConfig'
import storeData from './lib/storeData'
import axios from 'axios'

const CancelToken = axios.CancelToken

class MyRequest {

	constructor(baseURL, config = {}, extra = {}) {
		config = {
			...defaltConfig,
			...config
		}
		
		this.config = {
			baseURL,
			...config
		}
		this.axioxInstance = createAxioxInstance({
			baseURL,
			...config
		})

		this.defaultExtra = {
			...defaultExtra,
			...extra
		}
	}

	/**
	 * 发起请求
	 * @param {string} method 请求方式 post/get/put/delete....
	 * @param {string} url  请求路径
	 * @param {object} apiParams 请求参数
	 * @param {object} extra 扩展参数 {
	 * 	headers 自定义headers，可以让单个api调用自定义headers
	 * 	timeout 接口层设置timeout，这样可以区别设置某些特殊的接口
	 * 	baseURL 接口层自定义baseUrl，防止调用某些接口有不同的baseUrl
	 * 	CLoading 是否显示loading，默认false
	 * 	CToast 接口出错，是否显示toast，默认true
	 * 	preventResponseErrorHandle  是否阻止默认或者配置的错误处理，可让api接口编写特殊的独立处理逻辑 默认false(不阻止)
	 * 	stopRepeatRequest  结束重复请求，默认false（不结束）
	 * }
	 */
	request(method, url, apiParams = {}, extra = {}) {
		const {
			headers = {},
			timeout,
			baseURL,
			CLoading,
			CToast,
			preventResponseErrorHandle,
			stopRepeatRequest = false
		} = extra
		const source = CancelToken.source()
		const defaulHeaders = this.config.setRequestDefaultHeaders() || {}

		const directMergeConfig = { CLoading, CToast, preventResponseErrorHandle }
    for (const [key, value] of Object.entries(directMergeConfig)) {
      value === undefined && delete directMergeConfig[key]
    }
		let storeDataRequestKey = storeData.createKey(method, url, apiParams)
		storeData.cancleRequest(storeDataRequestKey, stopRepeatRequest) // 结束重复的请求
		storeData.addRequest(storeDataRequestKey, source)

		let axioxPromise = this.axioxInstance.request({
			method,
			url,
			baseURL: baseURL || this.config.baseURL,
			headers: {...defaulHeaders, ...headers},
			timeout: timeout || this.config.timeout,
			params: method === 'get' ? (apiParams.params ? apiParams.params : apiParams) : apiParams.params, // 拼接到请求路径上
			data: method != 'get' ? apiParams : {},
			cancelToken: source.token,
			directMergeKeys: { ...this.defaultExtra, ...directMergeConfig, storeDataRequestKey }
		})
		axioxPromise.source = source
		return axioxPromise
	}

	post(url, apiParams = {}, extra = {}) {
		return this.request('post', url, apiParams, extra)
	}
	get(url, apiParams = {}, extra = {}) {
		if (!apiParams.params) {
			apiParams = {
				params: apiParams
			}
		}
		return this.request('get', url, apiParams, extra)
	}
	put(url, apiParams = {}, extra = {}) {
		return this.request('put', url, apiParams, extra)
	}
	delete(url, apiParams = {}, extra = {}) {
		return this.request('delete', url, apiParams, extra)
	}
}

export default MyRequest
