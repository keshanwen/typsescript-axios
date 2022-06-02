import { AxiosRequestConfig } from './types'
import { processHeaders } from './helpers/headers'
import { transformRequest, transformResponse } from './helpers/data'

const defaults: AxiosRequestConfig = {
  method: 'get',

  timeout: 0,

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
      // Accept 代表发送端（客户端）希望接收的数据类型
      // 比如： Accept: text/xml 代表客户端希望接收的数据类型是 xml 类型
    }
  },

  transformRequest: [
    function(data: any,headers: any):any {
      processHeaders(headers,data)
      return transformRequest(data)
    }
  ],

  transformResponse: [
    function(data:any): any {
      return transformResponse(data)
    }
  ]
}

const methodsNoData = ['delete', 'get', 'head', 'options']

methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

const methodsWithData = ['post', 'put', 'patch']

methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
    // Content-Type 代表发送端（客户端|服务器）发送的实体数据的数据类型
    // 比如： Content-Type: text/html 代表发送端发送的数据类型格式是html
  }
})

export default defaults


/*
Accept:text/xml
Content-Type:text/html

即代表希望接受的数据类型是xml格式，本次请求发送的数据的数据格式是html
*/
