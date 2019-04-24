<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}
/*  全局修改button为primary的时候的颜色*/
.el-button--primary{
  background-color: #4C83FF;
}
/*全局修改分页的背景颜色*/
.el-pagination.is-background .el-pager li:not(.disabled).active{
  background-color: #4383DC;
}
</style>
