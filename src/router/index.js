import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
/**
 * 加载模板
 */
Vue.use(VueRouter)
/**
 * 配置路由文件
 * @type {VueRouter}
 */
const router = new VueRouter({
  routes:[{
      path:'/init',
      name:'init',
      meta:{title:'通用加载项'},
      component: resolve => require(['../components/init.vue'], resolve),
      children: [
        {
          path:'/init/home',
          name:'home',
          meta:{title:'主页(需要登陆)',requireAuth:true},
          component: resolve => require(['../components/home.vue'], resolve)
        }
      ]
    },{
    path:'/',
    name:'login',
    meta:{title:'登陆',requireAuth:false},
    component: resolve => require(['../components/login.vue'], resolve)
  }
  ]
})

/**
 *  修改网站title的值
 */
router.afterEach((transition) => {
  if (transition.meta.title) {
    document.title = transition.meta.title
  }
})
/**
 * 路由拦截器
 * 监听路由的跳转是否用于权限
 * to: Route: 即将要进入的目标 路由对象
 * from: Route: 当前导航正要离开的路由
 * next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
 * next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。
 * next(false): 中断当前的导航。
 * next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。
 */
router.beforeEach((to, from, next) => {
  // 判断该路由是否需要登录权限
  if (to.meta.requireAuth) {
    // 通过vuex state获取当前的token是否存在
    if (store.state.token) {
      next()
    }
    else {
      next({
        path: '/',
        // 将跳转的路由path作为参数，登录成功后跳转到该路由
        query: {redirectUrl: to.fullPath}
      })
    }
  }
  else {
    next();
  }
})

/**
 * 路由输出
 */
export default router
