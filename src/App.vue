<template>
  <div id="app">
    <div id="container">
      <header></header>
      <main>
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </main>
    </div>
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
  color: #2c3e50;
  margin-top: 50px;
}
.el-step__head.is-finish{
  color: #ed9127;
  border-color: #ed9127;
}
.el-step__title.is-finish{
  color: #ed9127;
}
.el-step__description.is-finish{
  color: #ed9127;
}
.el-input--suffix .el-input__inner{
  height: 36px;
  line-height: 36px;
}
.el-pagination.is-background .el-pager li:not(.disabled).active{
  background-color: #ed9127;
}
.el-pagination.is-background .el-pager li.number:not(.active):hover{
  color: #ed9127;
}
body {
	margin: 0;
	padding: 0;
	color: #333333;
	background: #F1F1F1;
	font: 14px PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial;
}
a {
	text-decoration: none;
	cursor: pointer;
}
a:hover{
	text-decoration: none;
}
ul,ol,dl,h1,h2,h3,h4,h5,h6,p {
	margin: 0;
	padding: 0;
	list-style: none;
}
.lf{
  float: left;
}
.gt{
  float: right;
}
.clear::after{
  display: block;
  content: "";
  clear: both;
}
* {
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	-ms-box-sizing: border-box;
	-o-box-sizing: border-box;
	box-sizing: border-box;
}
.page img{
  vertical-align: middle;
  -webkit-transform: scale(.5);
  transform: scale(.5);
  display: inline-block;
}
button{cursor: pointer;outline: none;background: none; border: none;}
input{background: none; border: none;outline: none;}
table { border-collapse:collapse; }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button{
    -webkit-appearance: none !important;
    margin: 0;
  }
input[type="number"]{-moz-appearance:textfield;}

/*::-webkit-scrollbar-track-piece { //滚动条凹槽的颜色，还可以设置边框属性*/
/*background-color:#fff;*/
/*}*/
/*::-webkit-scrollbar {//滚动条的宽度*/
/*width:10px;*/
  /*height:10px;*/
  /*border-radius: 4px;*/
/*}*/
/*::-webkit-scrollbar-thumb {//滚动条的设置*/
/*background-color:#dddddd;*/
  /*background-clip:padding-box;*/
  /*min-height:28px;*/
  /*border-radius: 4px;*/

/*}*/
/*::-webkit-scrollbar-thumb:hover {*/
  /*background-color:#bbb;*/
/*}*/
</style>
