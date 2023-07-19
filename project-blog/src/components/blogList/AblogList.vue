<template>
  <div class="adminlist">
    <p class="admin-title" @click="goDetail">{{title}}</p>
    <p class="admin-time">发布时间：{{createtime | formatTimer}}</p>
    <div class="admin-content" v-html="content"></div>
    <div class="admin-operation">
      <a class="el-icon-edit" @click="goChange">修改</a>
      <a class="el-icon-delete" @click="dialogVisible = true">删除</a>
    </div>
    <el-dialog
      title="删除博客"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      width="30%"
      center>
      <span style="font-size: 18px; color: red;">是否确定删除此博客</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="delblog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      dialogVisible: false
    };
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
    goChange() {
      this.$router.push({name: 'update', query: {id: this.item.id}})
    },
    goDetail () {
      this.$router.push({name: 'details', query: {id: this.item.id}})
    },
    delblog() {
      axios.post('/api/blog/home/delblog', {
        id: this.item.id
      }).then(res => {
        if (res.data.errno === 0) {
          this.$parent.adminblogdate()
          this.$message({
            message: '恭喜,删除成功',
            type: 'success'
          });
        }
      })
    }
  }
}
</script>

<style lang="less">
p{
  margin: 0;
  padding: 0;
}
div img{
  display: none;
  
}
.adminlist{
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  width: 500px;
  display: inline-block;
  margin: 10px;
  height: 130px;
  border-radius: 13px;
  .admin-title{
    font-size: 23px;
    margin-left: 10px;
    cursor: pointer;
  }
  .admin-time{
    margin: 5px 15px;
  }
  .admin-content{
    border-top: 1px solid rgb(164, 164, 164);
    border-bottom: 1px solid rgb(163, 163, 163);
    margin: 0 15px;
    // background-color: aliceblue;
    height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .admin-operation{
    margin-left: 287px;
    a{
      position: relative;
      right: 10px;
      cursor: pointer;
      width: 100px;
      text-align: center;
    }
    a:first-child{
      border-right: 1px solid rgb(163, 163, 163);
    }
    a:hover{
      color: rgb(98, 215, 215);
    }
  }
}
</style>