let Export = {}
/**
 * 获取URL参数
 */
Export.getUrlParam = function () {
  let query = window.location.search
  let start = query.indexOf('?')
  if (start > -1) {
    query = query.substring(start + 1)
  }

  let paras = {}
  if (query) {
    let queryParams = query.split('&')
    for (let k in queryParams) {
      let param = queryParams[k].split('=')
      paras[param[0]] = decodeURIComponent(param[1]) || ""
    }
  }

  return paras
}
/**
 * 重置URL信息
 */
Export.createUrlParam = function(para) {
  let uri = []
  for (let k in para) {
    uri.push(k + "=" + encodeURIComponent(para[k]))
  }

  return "?" + uri.join("&")
}
export default Export
