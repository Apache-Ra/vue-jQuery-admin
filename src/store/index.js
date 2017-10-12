/**
 *  @Actions( 行为 )
 *  @Mutations( 突变 )
 *  @State( 状态 )
 *  Components( 组件 )中 methods 里面一个方法 dispatch （调用）Actions，Actions 然后 commit 对应的Mutations,
 *  只有 Mutations 可以操作 State 中的状态数据，状态一改变，组件中就重新渲染
 */
import Vue from 'vue'
import Vuex from 'vuex'
import LocalStroage from '../kit/LocalStorage'
/**
 * 加载插件
 */
Vue.use(Vuex)
/**
 * 状态监听
 * @type {Store<any>}
 * @LOGIN_STATUS 登陆状态
 * @USER_SINGIN  登陆成功
 * @USER_SIGNOUT 退出登陆
 * 从LocalStroage取出用户信息，如果存在则返回true否则返回false
 */
let LOGIN_STATUS = LocalStroage.getKey('UserInfo').userName ? true : false

const store = new Vuex.Store({
  state: {
    token: LOGIN_STATUS,
    showLoading:false
  },
  mutations:{
    setToken: state => {
      state.token = true
    },
    showLoading: state => {
      state.showLoading = true
    },
    hideLoading: state => {
      state.showLoading = false
    }
  },
  getters: {
    showLoading: state =>{
      return state.showLoading
    }
  },
  actions: {
    showloader ({ commit }) {
      commit('showLoading')
    },
    hideloader ({ commit }) {
      commit('hideLoading')
    }
  },
  moudles: { }
})
/**
 * 出口
 */
export default store
