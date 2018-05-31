<template>
    <div>
      <Upload @show="showImg"  :files="files" @changeImages="changeImages"></Upload>
      <el-dialog
        title="图片预览"
        :visible.sync="dialogImgVisible">
        <img :src="file.url" :alt="file.name" style="width: 100%">
      </el-dialog>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
      <el-steps :active="stepActive" align-center>
        <el-step title="第一步" description="这是描述性文字"></el-step>
        <el-step title="第二步" description="这是描述性文字"></el-step>
        <el-step title="第三步" description="这是描述性文字"></el-step>
        <el-step title="第四步" description="这是描述性文字"></el-step>
      </el-steps>

    </div>
</template>

<script>
  import baseUrls from './../../static/config/baseURL.js'
  import Upload from './common/Upload'
    export default {
      name: "Detail",
      components:{
        Upload
      },
      data(){
          return {
            stepActive:2,
            files:[],
            file:{},
            dialogImgVisible:false
          }
      },
      methods:{
        showImg: function (file) {
          this.file = file;
          this.dialogImgVisible = true;
        },
        changeImages:function (arg) {
          this.files = arg[1];
        }
      }
    }
</script>

<style scoped>

</style>
