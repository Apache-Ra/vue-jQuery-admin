<template>
  <div id="Init">
    {{msg_1}}
    <router-view></router-view>
    {{msg_2}}
  </div>
</template>

<script>
  export default {
    data () {
      return {
        msg_1: '通用头部组件',
        msg_2: '通用底部组件'
      }
    }
  }
</script>
