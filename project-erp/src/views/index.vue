<template>
  <div class="L-index">
    <el-container>
      <el-aside :width="isCollapse ? '200' : '64'">
        <el-menu :default-active="menupath" :router="indexstate" class="el-menu-vertical-demo" :collapse="isCollapse" background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
          <h3>{{isCollapse ? "系统" : "宿舍管理系统"}}</h3>
          <el-menu-item v-for="item in noChildren" :index="item.path + ''" :key="item.path">
            <i :class="item.icon"></i>
            <span slot="title">{{item.label}}</span>
          </el-menu-item>
          <el-submenu v-for="item in hasChildren" :index="item.path + ''" :key="item.path">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.label}}</span>
            </template>
            <el-menu-item-group v-for="(subItem) in item.children" :key="subItem.path">
              <el-menu-item :index="subItem.path + ''" @click="gopath(subItem)">{{subItem.label}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/member" v-if="level === '超级管理员' ? true:false">
            <i class="el-icon-user"></i>
            <span slot="title">人员管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="header-top" height="50px">
          <el-button type="primary" icon="el-icon-menu" size="mini" class="hea-btn" @click="asideIO"></el-button>
          <el-dropdown @command="handleCommand">
            <div>
              <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" class="hea-portrait"></el-avatar>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a" icon="el-icon-setting">修改密码</el-dropdown-item>
              <el-dropdown-item command="b" icon="el-icon-help">修改昵称</el-dropdown-item>
              <el-dropdown-item command="c" icon="el-icon-switch-button">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

    <!-- 修改密码对话框 -->
    <el-dialog
      title="修改密码"
      :visible.sync="detailpass"
      width="30%">
      <input type="text" placeholder="请输入旧密码" v-model="oldpass">
      <input type="text" placeholder="请输入新密码" v-model="newpass1">
      <input type="text" placeholder="请重新输入新密码" v-model="newpass2">
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailpass = false">取 消</el-button>
        <el-button type="primary" @click="detailpassmine">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改昵称对话框 -->
    <el-dialog
      title="修改昵称"
      :visible.sync="detailnickname"
      width="30%">
      <input type="text" placeholder="请输入新昵称" v-model="newnick">
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailnickname = false">取 消</el-button>
        <el-button type="primary" @click="detailnewnickname">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
export default {
  data() {
    return {
      isCollapse: false,
      menu: [],
      menupath: '',
      indexstate: true,
      detailpass: false,
      detailnickname: false,
      oldpass: '',
      newpass1: '',
      newpass2: '',
      newnick: ''
    };
  },
  methods: {
    asideIO(){
      this.isCollapse = !this.isCollapse
    },
    async menuData() {
      const { data:res } = await axios.get('/My-Json/menu.json')
      this.menu = res
      this.menupath = res[0].path
    },
    gopath(subItem) {
      this.$store.commit('initfloor', subItem.label)
    },
    handleCommand(command) {
      if (command === 'a') {
        this.detailpass = true
      } else if (command === 'b') {
        this.detailnickname = true
      } else if (command === 'c') {
        axios.get('/api/erp/user/out').then(res => {
          if (res.data.errno === 0) {
            this.$router.push('/login')
          }
        })
      }
    },
    detailpassmine() {
      axios.get('/api/erp/user/pasrepeat', {params: {
        oldpass: this.oldpass
      }}).then(res => {
        if (res.data.errno === 0) {
          if (this.newpass1 === '' || this.newpass2 ==='') {
            this.$message({
              message: '警告！输入栏不能为空',
              type: 'warning'
            });
            return
          }
          if (this.newpass1 !== this.newpass2) {
            this.$message({
              message: '警告！两次密码不一致',
              type: 'warning'
            });
            return
          }
          if (this.newpass1 === this.newpass2) {
            axios.post('/api/erp/user/detailpass', {
              newpass: this.newpass1
            }).then(res => {
              if (res.data.errno === 0) {
                this.$message({
                  message: '密码更改成功',
                  type: 'success'
                });
                this.detailpass = false
                this.oldpass = ''
                this.newpass1 = ''
                this.newpass2 = ''
              }
            })
            return
          }
        } else {
          this.$message.error('旧密码有误');
        }
      })
    },
    detailnewnickname() {
      if (this.newnick === '') {
        this.$message({
          message: '警告！输入栏不能为空',
          type: 'warning'
        });
        return
      }
      axios.post('/api/erp/user/detailnickname', {
        newnick: this.newnick
      }).then(res => {
        if (res.data.errno === 0) {
          this.$notify({
          title: '成功',
          message: '请重新登录以刷新昵称',
          type: 'success'
        });
          this.detailnickname = false
          this.newnick = ''
        }
      })
    }
  },
  created() {
    this.menuData(),
    this.$store.dispatch('userData')
  },
  computed: {
    ...mapState(['floor','level']),
    noChildren() {
      return this.menu.filter(item => !item.children)
    },
    hasChildren() {
      return this.menu.filter(item => item.children)
    }
  },
  mounted() {
    if (window.performance.navigation.type == 1) {
      this.$router.push('/index')
    }
  },
}
</script>

<style lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.L-index{
  height: 100%;
  .el-menu{
    height: 100%;
    border: none;
    h3{
      color: aliceblue;
      text-align: center;
    }
  }
  .el-container{
    height: 100%;
  }
  .header-top{
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    background-color: rgb(61, 61, 61);
    .hea-btn{
      align-self: center;
      background-color: aliceblue;
      color:rgb(61, 61, 61);
      border: none;
    }
    .hea-portrait{
      align-self: center;
    }
  }
}
.el-dialog__body{
  text-align: center;
  input{
    width: 208px;
    margin: 10px 0;
    height: 30px;
    border: none;
    border-bottom: 1px solid #000;
    outline: none;
  }
}
</style>