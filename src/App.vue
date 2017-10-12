<template>
  <div id="app">
      <Lodding v-show="showLoading"></Lodding>
      <router-view></router-view>
  </div>
</template>

<script>

  import Lodding from './components/loading/loading.vue'
  import { mapGetters } from 'vuex'
  import Vue from 'vue'

  export default {
    components: {Lodding},
    computed: mapGetters([ 'showLoading' ]),
    created() {},
    methods:{}
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
