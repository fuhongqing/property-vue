// 接口地址
const floorUrl='http://xmkfapi.ehaofang.com/';//'http://192.168.1.223/';//'http://xmkfapi.ehaofang.com/'
const cityUrl='http://xmjyapi.ehaofang.com/';//'http://xmjyapi.ehaofang.net/';//'http://xiangmuglapi.ehaofang.net/';
const weihuUrl='http://hr.ehaofang.com/';
const statesUrl='http://hr.ehaofang.com/';//是否管理员
// 访问跳转地址
// const http_baseUrl = ''
const _getCookie = function (key) {
  var str = document.cookie;
  var arr = str.split("; ");
  for (var i = 0; i < arr.length; i++) {
    var arr2 = arr[i].split("=");
    if (key == arr2[0]) {
      return arr2[1];
    }
  }
  return "";
}
const userName ='张三';// JSON.parse(decodeURIComponent(_getCookie("user").replace(/[\\]/g, ''))).name;
const createUserid = 88;//JSON.parse(decodeURIComponent(_getCookie("user").replace(/[\\]/g, ''))).id;
export default{floorUrl,cityUrl,weihuUrl,statesUrl,_getCookie,userName,createUserid}
