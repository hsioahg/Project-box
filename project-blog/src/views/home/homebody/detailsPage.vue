<template>
  <div class="detailblog">
    <div class="blog-title">
      <div class="blog-title-font">{{detailbody.title}}</div>
      <div class="blog-author">
        <div class="blog-author-font">作者：{{detailbody.nickname}}</div>
        <div class="blog-author-font">发布时间：{{detailbody.createtime | formatTimer}}</div>
      </div>
    </div>
    <div class="blog-body">
      <Editor
        style="overflow-y: hidden;"
        v-model="detailbody.content"
        :mode="mode"
        @onCreated="onCreated"
      />
    </div>
  </div>
</template>

<script>
import { Editor } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
import axios from 'axios'
export default {
  components: { Editor },
  data() {
    return {
      detailbody: [],
      editor: null,
      mode: 'default',
      id: ''
    }
  },
  created() {
    this.detaildata()
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    disableHandler() {
      const editor = this.editor
      if (editor == null) return
      editor.disable()
    },
    async detaildata() {
      const { data:res } = await axios.get('/api/blog/home/details', {params: {
        id: this.$route.query.id
      }})
      if (res.errno === 0) {
        this.detailbody = res.data
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.disableHandler()
    })
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  },
  filters: {
    formatTimer: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      return y + "-" + MM + "-" + d + " " + h + ":" + m;
    }
  },
}
</script>

<style lang="less">
.el-main{
  padding: 0;
  margin: 0;
}
.detailblog{
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
  background-color: #D5CABD;
  .blog-title{
    height: 160px;
    display: flex;
    justify-content: center;
    position: relative;
    border-bottom: 1px solid rgb(199, 199, 199);
    .blog-title-font{
      margin-top: 40px;
      font-size: 30px;
    }
    .blog-author{
      position: absolute;
      bottom: 25px;
      display: flex;
      font-size: 17px;
      .blog-author-font{
        margin: 0 20px;
      }
    }
  }
  .blog-body{
    border: 1px solid rgb(199, 199, 199);
  }
}
</style>