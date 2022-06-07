import { AxiosInstance,AxiosRequestConfig } from './types'
import Axios from './core/Axios'
import defaults from './defaults'
import { extend } from './helpers/util'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'


function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance(defaults)

axios.create = function(config) {
  return createInstance(mergeConfig(defaults,config))
}

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

export default axios

