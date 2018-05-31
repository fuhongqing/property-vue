<template>
  <div>
    <header class="clear">
        <div class="gt">
            <span class="btn btnActive">列表模式</span><span class="btn">地图模式</span>
        </div>
        <h2>楼盘搜索</h2>
        <div class="tabs"><span>轩天实业&gt;</span><span>项目开发</span></div>
    </header>
    <div class="page clear">
        <div id="filter">
            <ul class="area clear">
                <li class="label">地区：</li>
                <li :class="{activeLi:tblParams.cityId===''}" @click="filterCity('');showBorough=!showBorough">不限</li>
                <li :class="{activeLi:tblParams.cityId===item.ID}" @click="filterCity(item.ID)" v-for="item in citiesData" :key="item.ID">{{item.CityName}}</li>
                <li :class="{activeLi:tblParams.cityId===item.ID}" @click="filterCity(item.ID)" v-show="!moreCity" v-for="item in moreCitiesData" :key="item.ID">{{item.CityName}}</li>
                <li class="showMore" @click="cityMore()" v-if="cityMoreData"><span>更多</span>
                  <img v-show="moreCity" src="../assets/img/down.png" alt="">
                  <img  v-show="!moreCity" src="../assets/img/up.png" alt="">
                </li>
            </ul>
            <ul class="borough clear" v-show="showBorough">
                <li>
                    <ul id="borough" class="lf">
                      <li class="label">区域：</li>
                      <li class="all" @click="filterBorough('');showBorough=!showBorough">不限</li>
                      <li :class="{activeLi:tblParams.areaId===item.id}" v-for="item in boroughData" @click="filterBorough(item.id)" class="boroughName" :key="item.id">{{item.boroughName}}</li>
                    </ul>
                </li>
            </ul>
            <ul class="buildingType clear">
                <li class="label">类型：</li>
                <li @click="filterBuild(item.order)" :class="{activeLi:tblParams.buildType===item.order}" v-for="item in buildData" :key="item.order">{{item.name}}</li>
            </ul>
            <ul class="saleStatus clear">
                <li class="label">状态：</li>
                <li @click="filterSale(item.order)" :class="{activeLi:tblParams.saleStates===item.order}" v-for="item in saleData" :key="item.order">{{item.name}}</li>
            </ul>
            <ul class="moreUl followStatus clear" v-show="!hasMore">
                <li class="label">跟进状态：</li>
                <li @click="filterFollow(item.order)" :class="{activeLi:tblParams.followStatus===item.order}" v-for="item in followData" :key="item.order">{{item.name}}</li>
            </ul>
            <ul class="moreUl totalCount clear" v-show="!hasMore">
                <li class="label">货值：</li>
                <li @click="filterValue(item.order)" :class="{activeLi:tblParams.saleValue===item.order}" v-for="item in saleValueData" :key="item.order">{{item.name}}</li>
            </ul>
          <div v-show="!hasMore">
            <span class="label">维护时间：</span>
            <el-date-picker
              v-model="startTime"
              type="date"
              size="mini"
              :clearable="false"
              @change="changeStartDate()"
              placeholder="开始日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd">
            </el-date-picker>
            &nbsp;至&nbsp;
            <el-date-picker
              v-model="endTime"
              type="date"
              size="mini"
              @change="changeEndDate()"
              :clearable="false"
              placeholder="结束日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>
          <div style="margin-top: 20px" v-show="!hasMore">
            <span class="label" style="width: 70px;display: inline-block">维护人：</span>
            <el-select @change="filterWH" v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId">
              </el-option>
            </el-select>
          </div>

            <div id="fold" @click="showMore()">
                <span>展开选项</span>
                <img src="../assets/img/doubleDown.png" v-if="hasMore" alt="">
                <img src="../assets/img/doubleUp.png" v-else alt="">
            </div>
        </div>
        <!--搜索框和按钮-->
        <div id="search">
          <a class="btn" @click="$goRoute('/add')">新增开发楼盘</a>
          <el-button style="width: 50px;height: 36px;float: right" slot="append" icon="el-icon-search" @click="searchData"></el-button>
          <input type="text" v-model="searchVal"  placeholder="请输入楼盘名/地址进行搜索" :style="searchStyle" @keyup.enter="searchData">
          <!--<div class="demo-input-suffix gt">-->
            <!--<el-input-->
              <!--v-model="searchVal"-->
              <!--placeholder="请输入楼盘名/地址进行搜索"-->
              <!--suffix-icon="el-icon-search"-->
              <!--style="width: 300px;height: 36px">-->
            <!--</el-input>-->
          <!--</div>-->
        </div>
        <!--项目列表-->
      <template>
        <el-table
          :data="tableData"
          stripe
          border
          @row-click="linkToDetail"
          @sort-change="handleChange"
          style="width: 100%;margin: 20px 0">
          <el-table-column
            prop="name buildingType saleStatus developerShortName"
            label="项目名"
            width="280">
            <template slot-scope="scope" class="clear">
              <span class="gt" :style="soldStyle">{{saleState(scope.row.saleStatus)}}</span>
              <span class="gt" :style="spanStyle" v-for="(item,index) in buildingTypeNum(scope.row.buildingType)" :key="index">{{item}}</span>
              <div>{{scope.row.name}}</div>
              <div style="font-size: 12px;color: #BABABA">{{scope.row.developerShortName}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="CityName BoroughName"
            label="区域"
            width="139">
            <template slot-scope="scope">
              {{ scope.row.CityName}}-{{scope.row.BoroughName}}
            </template>
          </el-table-column>
          <el-table-column
            prop="followStatus"
            label="状态"
            width="120">
            <template slot-scope="scope">
              {{ followStatus(scope.row.followStatus)}}
            </template>
          </el-table-column>
          <el-table-column
            sortable="custom"
            prop="saleHouse"
            label="剩余体量"
            width="120">
            <template slot-scope="scope">
              {{ scope.row.saleHouse }}套
            </template>
          </el-table-column>
          <el-table-column
            sortable="custom"
            prop="saleValue"
            label="剩余货值"
            width="120">
            <template slot-scope="scope">
              {{ scope.row.saleValue }}亿
            </template>
          </el-table-column>
          <el-table-column
            prop="saleType"
            label="销售类型"
            width="120">
            <template slot-scope="scope">
              {{ saleType(scope.row.saleType)}}
            </template>
          </el-table-column>
          <el-table-column
            sortable="custom"
            prop="maintainerTime"
            label="最近维护"
            width="140">
          </el-table-column>
          <el-table-column
            prop="FullName"
            label="维护人"
            width="120">
          </el-table-column>
        </el-table>
      </template>
        <!--分页器-->
      <el-pagination
        class="gt"
        background
        layout="prev, pager, next"
        @size-change="pageSizeChange"
        @current-change="pageSizeChange"
        :current-page='currentPage'
        :total="pagesTotal">
      </el-pagination>
    </div>
</div>
</template>
<script>
import baseUrls from './../../static/config/baseURL.js';
export default {
  name: 'Select',
  data () {
    return {
      cityMoreData:false,
      buildData:[
        {
          'name':'不限',
          'order':0
        },
        {
          'name':'别墅',
          'order':1
        },
        { 'name':'住宅',
          'order':2},
        { 'name':'商铺',
          'order':3},
        { 'name':'其他',
          'order':4}
      ],
      saleData:[
        {
          'name':'不限',
          'order':0
        },
        {
          'name':'待售',
          'order':1
        },
        { 'name':'在售',
          'order':2},
        { 'name':'售罄',
          'order':3}
      ],
      followData:[
        //1待扫盘 2 扫盘中 3 维护中 4 已提报 5 商务谈判 6 合同签订 7 无效盘
        {
          'name':'不限',
          'order':0
        },
        {
          'name':'待扫盘',
          'order':1
        },
        { 'name':'扫盘中',
          'order':2},
        { 'name':'维护中',
          'order':3},
        {
          'name':'已提报',
          'order':4
        },
        {
          'name':'商务谈判',
          'order':5
        },
        { 'name':'合同签订',
          'order':6},
        { 'name':'无效盘',
          'order':7}
      ],
      //1为1亿以下,2为1-3亿,3为3-10亿,4为10亿以上
      saleValueData:[
        {
          'name':'不限',
          'order':0
        },
        {
          'name':'1亿以下',
          'order':1
        },
        { 'name':'1-3亿',
          'order':2},
        { 'name':'3-10亿',
          'order':3},
        { 'name':'10亿以上',
          'order':4}
      ],
      showBorough:false,
      pagesTotal:5,
      searchStyle:{
        'width': '300px',
        'height': '36px',
        'float': 'right',
        'border': '1px solid #eee',
        'border-radius': '4px',
        'padding-left':'5px'
      },
      spanStyle:{
        'display': 'inline-block',
        'width': '30px',
        'height': '16px',
        'line-height': '14px',
        'text-align': 'center',
        'border': '1px solid #ed9127',
        'border-radius': '2px',
        'color': '#ed9127',
        'margin-right': '4px',
        'font-size': '10px'
      },
      soldStyle:{
        'display': 'inline-block',
        'width': '30px',
        'height': '16px',
        'line-height': '14px',
        'text-align': 'center',
        'border': '1px solid #ed9127',
        'border-radius': '2px',
        'margin-right': '4px',
        'font-size': '10px',
        'border-color':'#90C46C',
        'color':'#90C46C'
      },
      initUrl:baseUrls,
      citiesData:[],
      allCity:[],
      moreCitiesData:[],
      startTime:'',
      endTime:'',
      searchVal: '',
      hasMore:true,
      moreCity:true,
      value7: '',
      tableData: [],
      options: [],
      value: '',
      tblParams:{
        state	:1,//是	Integer	//权限是否为管理员 1为个人 2为管理员
        sortType	:1,//是	Integer	排序类型（1默认排序 2剩余体量从大到小3剩余体量从小到大4剩余货值从大到小5剩余货值从小到大6最近维护时间从大到小7最近维护时间从小到大）
        cityId	:'',//否	Integer	检索条件(地区城市ID)
        areaId	:'',//否	Integer	检索条件(区域ID)
        buildType:0,//	否	Integer	检索条件(建筑类型:1别墅 2住宅 3商业 4其他
        saleStates	:0,//否	Integer	检索条件(在售状态: 1 待售 2 在售 3 售罄)
        followStatus	:0,//否	Integer	检索条件(跟进状态:1待扫盘 2 扫盘中 3 维护中 4 已提报 5 商务谈判 6 合同签订 7 无效盘)
        saleValue	:0,//否	Integer	检索条件(货值区间:1为1亿以下,2为1-3亿,3为3-10亿,4为10亿以上)
        search	:'',//否	string	检索条件(输入楼盘名/地址)
        maintainerTimeBeg:'',//	否	Date	检索条件(最新维护时间从:2018-04-13)
        maintainerTimeEnd	:'',//否	Date	检索条件(最新维护时间到:2018-04-14)
        maintainerId	:'',//否	Integer	检索条件(维护人ID)
        pageNum	:1,//是	Integer	检索条件(起始页码:1为第1页)
        pageSize	:20//是	Integer	检索条件(页长:20为每页显示20条信息)
      },
      currentPage:1,
      boroughData:[]
    }
  },
  created(){
    var that = this;
    this.$axios.get(this.initUrl.floorUrl + 'api/property/v1/cityList',{})
      .then(Response => {
        //console.log(Response);
        if (Response.status == '200') {
          that.$message('加载成功!');
          this.allCity=Response.data.data;
          if(this.allCity.length>13){
            this.cityMoreData=true;
            this.citiesData=Response.data.data.slice(0,14);
            this.moreCitiesData=Response.data.data.slice(14);
          }else{
            this.cityMoreData=false;
            this.citiesData=this.allCity;
          }
        } else {
          that.$message('获取城市失败!')
        }
      })
      .catch(error => {
        that.$message.error('服务器内部错误!')
      });
    this.$axios.get(this.initUrl.weihuUrl + 'api/outside/dept-users.do',{params:{'departmentType':'大客户服务部'}})
      .then(Response => {
        //console.log(Response);
        if (Response.status == '200') {
          that.$message('加载成功!');
          that.options=Response.data.data;
        } else {
          that.$message('获取城市失败!')
        }
      })
      .catch(error => {
        that.$message.error('服务器内部错误!')
      });
    this.tblList();//获取列表数据
  },
  methods:{
    showMore:function(){
      this.hasMore=!this.hasMore;
    },
    cityMore:function(){
      this.moreCity=!this.moreCity;
    },
    tblList:function(){
      var that = this;
      this.$axios.get(this.initUrl.floorUrl + 'api/property/v1/propertyList',{params:this.tblParams})
        .then(Response => {
          //console.log(Response);
          if (Response.status == '200') {
            that.$message('加载成功!');
            that.tableData=Response.data.data.propertyList;
            that.pagesTotal=that.tableData.length;
          } else {
            that.$message('加载失败!')
          }
        })
        .catch(error => {
          that.$message.error('服务器内部错误!')
        })
    },
    followStatus:function(t) {
      switch (t) {
        case 1:
          return t = '待扫盘';
          break;
        case 2:
          return t = '扫盘中';
          break;
        case 3:
          return t = '维护中';
          break;
        case 4:
          return t = '已提报';
          break;
        case 5:
          return t = '商务谈判';
          break;
        case 6:
          return t = '合同签订';
          break;
        case 7:
          return t = '无效盘';
          break;
        default:
          return t = '其他';
          break;
      }
    },
    saleType:function(t) {
      switch (t) {
        case 1:
          return t = '独家代理';
          break;
        case 2:
          return t = '自销';
          break;
        case 3:
          return t = '联合代理';
          break;
        default:
          return t = '其他';
          break;
      }
    },
    saleState:function(t) {
      switch (t) {
        case 1:
          return t = '待售';
          break;
        case 2:
          return t = '在售';
          break;
        case 3:
          return t = '售罄';
          break;
        default:
          return t = '其他';
          break;
      }
    },
    buildingTypeNum:function(t) {
      var indexArr=t.split(',');
      var valArr=[];
      for(var i=0;i<indexArr.length;i++){
        switch (indexArr[i]) {
          case '1':
            valArr.push('别墅');
            break;
          case '2':
            valArr.push('住宅');
            break;
          case '3':
            valArr.push('商铺');
            break;
          case '4':
            valArr.push('其他');
            break;
          default:
            valArr.push('其他');
            break;
        }
      }
      return valArr;
    },
    changeStartDate(){
      if(new Date(this.startTime).getTime() >new Date(this.endTime).getTime() ){
        this.$message.error('结束时间不能大于开始时间！');
      }else{
        this.tblParams.maintainerTimeBeg=this.startTime;
        this.tblList();
      }

    },
    changeEndDate(){
      if(new Date(this.startTime).getTime() >new Date(this.endTime).getTime() ){
        this.$message.error('结束时间不能大于开始时间！');
      }else{
        this.tblParams.maintainerTimeEnd=this.endTime;
        this.tblList();
      }

    },
    linkToDetail:function (row) {
      //console.log(row);
      this.$goRoute('/detail/'+row.id);
    },
    handleChange:function (data) {
      //console.log(data);
      switch (data.prop){
        case 'saleHouse':
          if(data.order=='ascending'){
            this.tblParams.sortType=3;
            this.tblList();
          }else if(data.order=='descending'){
            this.tblParams.sortType=2;
            this.tblList();
          }else{
            this.tblParams.sortType=1;
            this.tblList();
          }
          break;
        case 'saleValue':
          if(data.order=='ascending'){
            this.tblParams.sortType=5;
            this.tblList();
          }else if(data.order=='descending'){
            this.tblParams.sortType=4;
            this.tblList();
          }else{
            this.tblParams.sortType=1;
            this.tblList();
          }
          break;
        case 'maintainerTime':
          if(data.order=='ascending'){
            this.tblParams.sortType=7;
            this.tblList();
          }else if(data.order=='descending'){
            this.tblParams.sortType=6;
            this.tblList();
          }else{
            this.tblParams.sortType=1;
            this.tblList();
          }
          break;
      }

    },
    searchData:function () {
      this.tblParams.search=this.searchVal;
      this.tblList();
    },
    pageSizeChange:function (num) {
      this.currentPage = num;
      //console.log(data);
      this.tblList();
    },
    filterCity:function (data) {
      this.showBorough=true;
      this.tblParams.cityId=data;
      this.tblList();
      var that = this;
      this.$axios.get(this.initUrl.cityUrl + 'api/property/v1/borough',{params:{cityId:data}})
        .then(Response => {
          //console.log(Response);
          if (Response.status == '200') {
            that.$message('加载成功!');
            that.boroughData=Response.data.data;
          } else {
            that.$message('加载失败!')
          }
        })
        .catch(error => {
          that.$message.error('服务器内部错误!')
        })
    },
    filterBorough:function (data) {
      this.tblParams.areaId=data;
      this.tblList();
    },
    filterBuild:function (data) {
      this.tblParams.buildType=data;
      this.tblList();
    },
    filterSale:function (data) {
      this.tblParams.saleStates=data;
      this.tblList();
    },
    filterFollow:function (data) {
      this.tblParams.followStatus=data;
      this.tblList();
    },
    filterValue:function (data) {
      this.tblParams.saleValue=data;
      this.tblList();
    },
    filterWH:function () {
      this.tblParams.maintainerId=this.value;
      this.tblList();
    }
  }
}
</script>
<style scoped>
/*lang="less"*/
.page{
    width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    background: #fff;
}
.activeLi{
  color: #ed9127;
}
/*面包屑导航*/
div.tabs{
    height: 36px;
    line-height: 36px;
}
div.tabs>span{
    font-size: 12px;
}
header{
    background: #fff;
    width: 1200px;
    padding: 10px 20px 0 20px;
    margin: 0 auto;
}
header>h2{
    border-bottom: 1px solid #DDDDDD;
    padding-bottom: 10px;
}
/*.btn样式*/
.btn{
    display: inline-block;
    width: 90px;
    height: 32px;
    line-height: 32px;
    color:#333333;
    border: 1px solid #DDDDDD;
    background: #F8F8F8;
    border-radius: 4px;
    text-align: center;
    margin-left: 20px;
    cursor: pointer;
}
.btnActive{
    background: #fff;
    color:#ED9127;
    border-color:  #ED9127;
}
/*筛选列表*/
#filter{
    background: #F8F8F8;
    margin-bottom: 12px;
    padding:20px 10px;
    position: relative;
}
#filter>.borough{
    width: 566px;
    position: absolute;
    z-index: 10;
    left: 200px;
    top: 80px;
    padding: 10px;
    background: #fff;
}
#filter>.borough>li{
    margin-bottom: 5px;
}
#borough>li{
    float: left;
    margin-right: 25px;
    margin-bottom: 5px;
    cursor: pointer;
}

#filter>ul.area{
  position: relative;
}
#filter>.area>.showMore{
  position: absolute;
  right: 0;
  top: 0;
  color: #BABABA;
}
#filter>ul>li{
    float: left;
    margin-right: 25px;
    margin-bottom: 20px;
    cursor: pointer;
}
#filter>ul>li:hover{
  color: #ed9127;
}
#filter li.label{
    width: 70px;
    margin-right: 0;
    cursor: default;
}
#filter>.weihuTime>li{
    height: 36px;
}
#filter>.weihuTime .controls{
    position: relative;
}
#filter .control-label{
    text-align: left;
    font-size: 14px;
    width: 70px;
    height: 36px;
}
#fold{
    text-align: center;
    cursor: pointer;
    color: #BABABA;
    font-size: 12px;
}
  #search{
    padding-bottom: 5px;
  }
#search .btn{
  color: #fff;
  background: #ED9127;
  margin-left: 0;
  border: none;
}
</style>
