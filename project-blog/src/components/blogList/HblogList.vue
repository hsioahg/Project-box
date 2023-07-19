<template>
  <div class="listbody" @click="goDetail">
    <p class="blogtitle">{{title}}</p>
    <div class="blog-mation">
      <p class="mation">作者：{{nickname}}</p>
      <p class="mation">发布时间：{{createtime | formatTimer}}</p>
    </div>
    <div class="blogbody" v-html="content"></div>
  </div>
</template>

<script>
export default {
 // 时间格式化
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
  props: {
    // 文章标题
    title: {
      default: '',
      type: String
    },
    // 文章主体
    content: {
      default: '',
      type: String
    },
    // 作者
    nickname: {
      default: '',
      type: String
    },
    // 时间
    createtime: {
      Object: '',
      type: Number
    },
    item: {
      default: () => {
        return {}
      },
      type: Object
    }
  },
  methods: {
    goDetail () {
      this.$router.push({name: 'details', query: {id: this.item.id}})
      // console.log(this.item.id)
    }
  }
}
</script>

<style lang="less">
div img{
  display: none;
}
p{
  margin: 0;
}
.listbody{
  background-color: rgb(253, 253, 253);
  height: 138px;
  width: 95%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin: 10px 0;
  border-radius: 10px;
  padding: 5px 0;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  .blogtitle{
    font-size: 22px;
    margin: 10px 20px;
  }
  .blog-mation{
    display: flex;
    .mation{
      margin: 0 20px;
    }
  }
  .blogbody{
    // background-color: aliceblue;
    margin: 0 13px;
    height: 67px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    margin-top: 5px;
  }
}
</style>