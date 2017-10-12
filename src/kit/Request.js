import Vue from 'vue'
import store from '../store'
import router from '../router'

let Export = {}
let vue = new Vue({router})
Export.post = function (options) {
  options.method = 'POST'
  return Request(options)
}
Export.get = function (options) {
  options.method = 'GET'
  return Request(options)
}
Export.put = function (options) {
  options.method = 'PUT'
  return Request(options)
}
Export.del = function (options) {
  options.method = 'DELETE'
  return Request(options)
}
const Request = function (options) {
    let newDef = $.Deferred()
    store.dispatch('showloader')
    /**
     * @url：请求的接口地址
     * @method: 请求方式（GET/POST/PUT/DELETE）
     * @param: 请求参数{key:val} (id:'11',name:'name')
     * @headers: 请求的headers{key:val} (token:aabbccdd)
     * @useCache: 缓存（针对GET方式）
     * @skipValidation：跳过验证
     */
    let url = vue.SERVER_NAME + vue.API_PREFIX + options.url
    let method = options.method
    let param = options.data || true
    let headers = options.headers || true
    let useCache = options.cache || true
    let skipValidation = options.skipValidation || true
    if (method !== "GET") {
      param = (typeof param === "string") ? param : JSON.stringify(param)
    }
    $.ajax({
      url: url,
      type: method.toUpperCase(),
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      headers: headers,
      data: param,
      cache: !!useCache,
      success: (data) => {
        if (skipValidation) {
          store.dispatch('hideloader')
          newDef.resolve(data)
        } else if (handleApiResponseStatus(url, data)) {
          store.dispatch('showloader')
          newDef.resolve(data)
        }
      },
      error:(request, textStatus) => {
        store.dispatch('showloader')
        handleHttpResponseStatus(url, request.status)
      }
    });
    /**
     * 处理接口响应状态
     */
    function handleApiResponseStatus(url, data){
      console.info('handle Api Response Status Error')
      if (!data || (!data.codeText)) {
        console.error(url, data)
        return false
      }
      if (data.codeText == "RESULT_LOGIN_EXPIRED") {
        console.info('哎呦喂！登陆超时')
        return false
      } else if (data.codeText == "RESULT_NEED_ADVANCE_AUTH") {
        console.info('哎呦喂！登陆超时,重新登陆')
      } else if (data.codeText == "RESULT_NEED_BINDPHONE") {
        return true
      } else if (data.codeText == "FORBIDDEN") {
        console.info('哎呦喂！权限验证失败')
        return false
      }
      return true
    }
    /**
     * 处理HTTP相应状态
     */
    function handleHttpResponseStatus(url, status) {
      console.info('handle Http Response Status Error：' + status)
      let statu = Number(status)
      if (statu == 404) {
        console.info('哎呦喂！我找不到页面')
      } else if (statu >= 500) {
        console.info('哎呦喂！服务器异常')
      } else {
        console.info('哎呦喂！网络出现异常')
      }
    }
    return newDef.promise()
}
export default Export
