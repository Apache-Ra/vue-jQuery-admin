<template>
  <div id="Home">
    <hr>
    <p>欢迎，{{userName}} ，{{user_login_Number}}</p>
    <hr><hr>
    <div>
      <ul class="ulFind">
        <li class="li_1">名称</li>
        <li class="li_2">ID</li>
        <li class="li_3">唯一标识</li>
        <li class="li_4">唯一属性</li>
      </ul>
      <ul class="ulFind" v-for="(item, key) in itemList">
        <li class="li_1">{{item.label}}</li>
        <li class="li_2">{{item.menuId}}</li>
        <li class="li_3">{{item.comparableFlag}}</li>
        <li class="li_4">{{item.scriptPath}}</li>
      </ul>
    </div>
    <h4></h4>
  </div>
</template>

<script>
import Request from '../kit/Request'
import LocalStorage from '../kit/LocalStorage'
export default {

  components:{  },
  data () {
    return {
      itemList: [],
      userName: '',
      user_login_Number: ''
    }
  },
  created () {
    let vue = this

    vue.userName = LocalStorage.getKey('UserInfo').userName
    vue.user_login_Number = vue.$route.params.user_login_Number ? '再次登陆' : '用户'

    Request.get({
      url: 'menu/list',
      data:{
        analyticsMethod:'ANALYTICS_QUES',
        analyticsId: '100002'
      },
      headers:{token:'1234567890098765432'},
    }).then((response) =>{
      console.log(response)
      vue.itemList = response.data.menuList
    });

    //console.log(vue.$store.state.token)
  },
  methods :{}
}
</script>

<style scoped>
.ulFind{border:1px solid #C1C1C1;overflow: hidden}
.ulFind li{float: left;list-style: none;height: 30px;line-height:30px;text-align: left}
.ulFind .li_1{width: 200px;}
.ulFind .li_2{width: 100px;}
.ulFind .li_3{width: 200px;}
.ulFind .li_4{width: 100px;}
</style>
