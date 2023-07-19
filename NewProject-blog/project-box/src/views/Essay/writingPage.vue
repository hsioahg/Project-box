<template>
  <div class="writing">
    <div class="writingL">
      <div class="writingLnei">
        <input type="text" placeholder="请输入标题" class="textDemo" v-model="blog.title"><br>
        <el-upload
          action="/api/essay/coverimg"
          list-type="picture-card"
          :auto-upload="true"
          :limit = filenum
          :class="{styleA:file_list === 0,styleB:file_list === 1}"
          name="coverfile"
          ref="upload"
          :on-success="succseimg"
          :on-remove="handleRemove"
          :headers="jwthead">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url" alt=""
              >
              <span class="el-upload-list__item-actions">
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                <i class="el-icon-delete"></i>
              </span>
            </span>
            </div>
          </el-upload>
        <div class="Schoice">
          <div class="position">
            <p>发布位置：</p>
            <el-radio-group v-model="blog.radio1">
              <el-radio label="1">发布到博客</el-radio>
              <el-radio label="2">问题求助</el-radio>
              <el-radio label="3">发布到笔记</el-radio>
            </el-radio-group>
          </div>
          <div class="range">
            <p>可见范围：</p>
            <el-radio-group v-model="blog.radio2">
              <el-radio label="1">全部可见</el-radio>
              <el-radio label="2">仅自己可见</el-radio>
            </el-radio-group>
          </div>
        </div>
          
        <button class="publish" @click="publish">发&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;布</button>
      </div>
    </div>
    <div class="writingR">
        <div class="Toolbar">
          <Toolbar
            :editor="editor"
            :defaultConfig="toolbarConfig"
          />
        </div>
        <div class="Editor">
          <Editor
            v-model="blog.html"
            :defaultConfig="editorConfig"
            @onCreated="onCreated"
            class="editorCss"
          />
        </div>
    </div>
  </div>
</template>

<script>
import { postRequest } from '../../request/api'
import url from '@/request/url.js'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
import {mapState} from 'vuex'
export default {
  components: { Editor, Toolbar },
  data () {
    return {
      blog:{
        radio1: '1',
        radio2: '1',
        title:'',
        html:null,
        imgUrl:'',
      },
      file_list: 0,
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      editor: null,
      jwthead:{
        Authorization: 'Bearer '+localStorage.getItem('token'),
        token: localStorage.getItem('token')
      },
      toolbarConfig: { 
        excludeKeys: [
          'italic',
          'group-video',
          'fullScreen',
          'insertTable',
          'emotion'
        ]
      },
      editorConfig: {
        placeholder: '请输入内容...',
        MENU_CONF: {
          ['uploadImage']: {
            server: '/api/essay/blogimg',
            allowedFileTypes: [],
            fieldName: 'blogfile',
            base64LimitSize: 20 * 1024,
            meta: {
              token: localStorage.getItem('token')
            },
            headers: {
              Authorization: 'Bearer '+localStorage.getItem('token')
            }
          },
          ['insertImage']: {
            onInsertedImage(imageNode) {
              var imageList1 = []
              imageList1.push(imageNode.src)
              console.log(imageList1.length);
            }
          }
          
        }
      }
    };
  },
  props: {
    filenum: {
      default: 3,
      type: Number
    }
  },
  computed: {
	...mapState(['userlog'])
  },
  methods: {
    publish(){
      if (this.blog.title === '') {
        this.$message.error('请输入标题！');
        return
      }else if (this.blog.title.length >= 20) {
        this.$message.error('标题字数超出限制！');
        return
      } else if (this.blog.html === '<p><br></p>') {
        this.$message.error('请输入内容！');
        return
      } else {
        postRequest(url.setblog,{
          title: this.blog.title,
          imgurl: this.blog.imgUrl,
          radio1:this.blog.radio1,
          radio2:this.blog.radio2,
          essaybody:this.blog.html,
          nickname: this.userlog.nickname
        }).then(res => {
          if (res.errno === 0) {
            this.blog = {}
            this.blog.radio1 = '1'
            this.blog.radio2 = '1'
            this.$message('发布成功！');
            this.$router.push('/home')
          }
        })
      }
      
    },
    handleRemove(file) {
      postRequest(url.delcoverimg,{
        filename: file.response.name
      }).then(res => {
        if (res.errno === 0) {
          this.$refs.upload.clearFiles();
          this.file_list = 0
          this.imgUrl = null
        }
      })
    },
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    succseimg(file) {
      this.file_list = 1
      this.imgUrl = file.url
    },
    
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  }
}
</script>

<style lang="less" scoped>
*{
  margin: 0;
  padding: 0;
}
.writing{
  height: 100%;
  background-color: rgb(253, 234, 225);
  display: flex;
  justify-content: space-around;
  .writingL{
    width: 440px;
    height: 100%;
    border-right: 3px solid #000;
    background-color:rgba(255, 255, 255, 0.7);
    .writingLnei{
      
      display: inline-block;
      position: relative;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      margin-left: 10px;
      .textDemo{
        width: 405px;
        height: 36px;
        font-size: 17px;
        outline: none;
        border: none;
        border-bottom: 1px solid #000;
        margin-bottom: 30px;
        background-color:rgba(255, 255, 255, 0.7);
        text-indent: 10px;
      }
      .Schoice{
        display: inline-block;
        .position{
          margin: 20px 0;
        }
      }
      .publish{
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        width: 200px;
        height: 40px;
        font-size: 20px;
        margin-top: 60px;
        cursor: pointer;
        border-radius: 10px;
        border: none;
        background-color: rgb(251, 251, 251);
        color: rgb(253, 47, 47);
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
      }
    }
  }
  .writingR{
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 10px;
    .Toolbar{
      align-self: flex-start;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      margin: 25px 10px;
      border-radius: 15px;
      background-color: rgba(255, 255, 255, 0.7);
      z-index: 1;
    }
    .Editor{
      margin: 0px 10px 20px 10px;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      background-color: rgba(255, 255, 255, 0.7);
      border-radius: 15px;
      flex: 1;
      
      .editorCss{
        z-index: 1;
        height: 690px;
      }
    }
  }
}
</style>
<style lang="less">
.el-main{
  margin: 0;
  padding: 0;
}
.upload-demo{
  // display: inline-block;
  .el-upload-dragger{
    width: 238px;
    height: 120px;
    .el-icon-upload{
      margin: 13px 0 16px;
    }
  }
}
.el-radio{
  margin: 17px 22px 0 22px;
}
.w-e-bar{
  background-color: rgba(255, 255, 255, 0);
}
.w-e-text-container{
  background-color: rgba(255, 255, 255, 0);
  border-radius: 15px;
}
.styleA .el-upload--picture-card{
  width:146px;
  height:146px;
  line-height:146px;
}
.styleB .el-upload--picture-card{
  width:146px;
  height:146px;
  line-height:146px;
  display: none;
}
.el-upload-list__item {
  transition: none !important;
}
</style>