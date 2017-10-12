<template>
  <div id="Login">
    <div class="border-1"><br>
      <h4 class="login-title">测试登陆</h4>
      <div class="input-group">
        <label class="input-label">账号：</label>
        <input class="input-cell radius-4" type="text" v-model="userName" name="userName" placeholder="用户名">
      </div>

      <div class="input-group">
        <label class="input-label">密码：</label>
        <input class="input-cell radius-4" type="password" v-model="userPass" name="userPass" placeholder="密码">
      </div>

      <div class="button-group">
        <input class="button-cell radius-4" @click="Login()" type="button" name="button" value="登陆">
      </div>

    </div>
  </div>
</template>

<script>
  import LocalStorage from '../kit/LocalStorage'
  import Cookie from '../kit/Cookie'
  export default {

    components:{  },
    data () {
      return {
        userName:'',
        userPass:''
      }
    },
    created () {
      let vue = this
      vue.userName = 'admin',
      vue.userPass = 'admin'
      /**
       *  @USER_INFO: 用户信息
       */
      let USER_INFO = LocalStorage.getKey('UserInfo')
      if(USER_INFO.userName){
        setTimeout(function () {
          vue.$router.push({name:'home', params:{userName: vue.userName, user_login_Number:'再次登陆'}})
        },1000)
      }

    },
    methods :{
      Login(){
        const vue = this
        /**
         * 登陆成功后修改token状态
         * 存储用户信息
         */
        vue.$store.commit('setToken')
        LocalStorage.setKey('UserInfo',{userName: vue.userName})
        //获取登录成功后要跳转的路由。
        let redirect = decodeURIComponent(vue.$route.query.redirectUrl || 'init/home');
        vue.$router.push({
          path: redirect
        })
      }
    }
  }
</script>

<style scoped>
  #Login{width: 100%;height: 100%;position: absolute;}
  .border-1{
    border:1px solid #C1C1C1;
    border-radius: 4px;
    box-shadow: 0 0 5px #C1C1C1;
    width: 500px;
    height: 200px;
    position: absolute;
    margin:-100px 0 0 -250px;
    top: 50%;
    left:50%;
  }
  .login-title{height: 30px;}
  .radius-4{border-radius: 4px;}
  .input-group{margin: 5px 0;}
  .input-group .input-label{width: 50px;}
  .input-group .input-cell{width: 250px;height: 35px;border:1px solid #C1C1C1;background: #FFF;text-indent: 10px;}
  .button-group .button-cell{width: 207px;height: 35px;border:1px solid #C1C1C1;background: #FFF;cursor: pointer}
</style>
