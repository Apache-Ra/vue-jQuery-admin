import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import '../static/css/style.css'



/*
 * 定义常量
 */
const DOMAIN_NAME = 'localhost'
const SERVER_NAME = 'http://cn.edupj.org/eduSchoolWebIf'
const API_PREFIX = '/analytics/'
/**
 * 定义全局通用常量
 */
Vue.prototype.DOMAIN_NAME = DOMAIN_NAME
Vue.prototype.SERVER_NAME = SERVER_NAME
Vue.prototype.API_PREFIX = API_PREFIX
Vue.prototype.HOST = '/api'

/**
 * 日志输出
 * @type {boolean}
 */
Vue.config.productionTip = false
/**
 * 创建实例
 */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
