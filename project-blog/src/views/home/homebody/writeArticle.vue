<template>
  <div class="article">
    <div class="article-title">
      <div class="article-input">
        <input type="text" placeholder="请输入标题..." v-model="title">
      </div>
      <button class="article-btn" @click="newBlog">发布</button>
    </div>
    <div style="border: 1px solid #ccc;">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editor"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 630px; overflow-y: hidden;"
        v-model="content"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="onCreated"
      />
    </div>
  </div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
import axios from 'axios'
export default {
  components: { Editor, Toolbar },
  data() {
    return {
      editor: null,
      content: '',
      title:'',
      toolbarConfig: { 
        excludeKeys: [
          'headerSelect',
          'italic',
          'group-video',
          'fullScreen',
          'divider',
          'insertTable',
          'emotion'
        ]
      },
      editorConfig: { 
        placeholder: '请输入内容...',
        MENU_CONF: {
          ['uploadImage']: {
            server: '/api/blog/home/img',
            allowedFileTypes: [],
            fieldName: 'file',
            base64LimitSize: 50 * 1024
          },
        },
      },
      mode: 'default', // or 'simple'
    }
  },
  created() {
    this.detaildata()
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    newBlog() {
      if (this.title === '') {
        this.$message({
          message: '警告,请输入标题',
          type: 'warning'
        });
        return
      }
      if (this.content === '') {
        this.$message({
          message: '警告,请输入内容',
          type: 'warning'
        });
        return
      }
      axios.post('/api/blog/home/newblog', {
        id: this.$route.query.id,
        title: this.title,
        content: this.content
      }).then(res => {
        if (res.data.errno === 0) {
          if (this.$route.query.id === undefined) {
            this.$message({
              message: '恭喜,成功发布博客',
              type: 'success'
            });
            this.$router.push('/home')
          } else {
            this.$message({
              message: '恭喜,成功修改博客',
              type: 'success'
            });
            this.$router.push('/home/adminhome')
          }
        }
      })
    },
    async detaildata() {
      const { data:res } = await axios.get('/api/blog/home/details', {params: {
        id: this.$route.query.id
      }})
      if (res.errno === 0) {
        this.title = res.data.title
        this.content = res.data.content
      }
    }
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  }
}
</script>

<style lang="less">
.el-main{
  padding: 0;
  margin: 0;
}
.article{
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  @media screen and (min-width: 768px) and (max-width: 1820px) {
    width: 1135px;
  }
  @media screen and (min-width: 1820px) and (max-width: 2580px) {
    width: 1335px;
  }
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  background-color: #eaeaea;
  .article-title{
    height: 160px;
    text-align: center;
    .article-input{
      display: inline-block;
      width: 600px;
      margin-top: 20px;
      padding: 10px;
      border-bottom: 1px solid #adadad;
      input{
        margin-top: 40px;
        font-size: 25px;
        width: 530px;
        border: none;
        outline: none;
        background-color: transparent;
      }
    }
    .article-btn{
      width: 100px;
      height: 40px;
      font-size: 17px;
      border-radius: 10px;
      border: 1px solid #adadad;
      margin-left: 20px;
      cursor: pointer;
      background-color: #A4C2DC;
      color: rgb(243, 243, 243);
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }
    .article-btn:active{
      box-shadow: none;
    }
  }
}
</style>