<template>
  <div>
    <div class="upload">
      <el-upload
        action="#"
        :file-list="files"
        :limit="9"
        :http-request='submitUpload'
        :on-change='changeUpload'
        :on-exceed="handleExceed"
        :on-preview="show"
        :on-remove="remove"
        list-type="picture-card" multiple>
        <i class="el-icon-upload" style="font-size: 60px;"></i>
        <div class="el-upload__text" style="line-height: 24px">将文件拖到此处，或<em style="font-style: normal;color: #ED9127">点击上传</em>
        </div>
      </el-upload>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Upload",
    data() {
      return {
        filesPath: []
      }
    },
    props: ['files'],
    methods: {
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 9 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      changeUpload: function (file, fileList) {
        // 每上传一张触发一次
        // console.log(file);
        // console.log(fileList)
      },
      submitUpload: function (content) {
        // 每上传一张触发一次
        var _this = this;
        let param = new FormData();
        param.append("files", content.file);
        let file = {};
        let filePath = {};
        this.$axios.post("http://www.ehaofang.com:8888/publicshow/qiniuUtil/fileToQiniu", param).then(function (res) {
          file.name = res.data.fileNames;
          file.url = "http://images.ehaofang.com/" + res.data.pathUrls;
          _this.files.unshift(file);
          filePath.name = res.data.fileNames;
          filePath.url = res.data.pathUrls;
          filePath.type = 6;
          _this.filesPath.unshift(filePath);
          _this.$emit('changeImages', [_this.filesPath, _this.files])
        })
      },
      show(file) {
        // 点击已上传文件时上传
        this.$emit('show', file)
      },
      remove(file, fileList) {
        var _this = this;
        this.files.forEach(function (f, i, arr) {
          if (f.url === file.url) {
            arr.splice(i, 1);
            _this.filesPath.splice(i, 1);
            _this.$emit('changeImages', [_this.filesPath, _this.files])
          }
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

  .el-upload-list--picture-card .el-upload-list__item {
    width: 200px;
    em {
      font-style: normal;
    }
  }

  .el-upload--picture-card {
    line-height: 1;
    width: 200px;
    padding: 30px 0;
    font-size: 12px;
  }
  .el-upload--picture-card:hover{
    color: #333;
  }

</style>
