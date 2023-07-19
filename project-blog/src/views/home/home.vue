<template>
  <el-container>
    <el-header class="text" style="height: 45px;">
      <el-tooltip class="item" effect="dark" content="前往首页" placement="bottom-end">
        <i class="pic" @click="tohome">Project box</i>
      </el-tooltip>
      <button class="log" v-if="log" @click="toUser">登 录</button>
      <div class="log2" v-if="!log">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        <el-tooltip class="item" effect="dark" content="个人中心" placement="bottom-end">
          <el-button @click="drawer=true" type="primary" style="margin-left: 16px;" class="buts">
            <i class="el-icon-s-operation"></i>
          </el-button>
        </el-tooltip>
      </div>
    </el-header>
    <el-drawer
      :visible.sync="drawer"
      :with-header="false"
      size=320px>
      <span>
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" class="personal"></el-avatar>
        <p class="nametitl">{{nickname}}</p>
        <div class="tolist">
          <div class="on-tolist" @click="toarticle">
            <p>写文章</p>
          </div>
          <div class="on-tolist" @click="toadminhome">
            <p>个人中心</p>
          </div>
          <div class="on-tolist" @click="outuser">
            <p>退出登录</p>
          </div>
        </div>
      </span>
    </el-drawer>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
export default {
  data() {
    return {
      drawer: false,
    };
  },
  created() {
    this.$store.dispatch('userData')
  },
  computed: {
	  ...mapState(['log','nickname'])
  },
  methods:{
    tohome() {
      this.$router.path('/home')
    },
    outuser() {
      axios.get('/api/erp/user/out').then(res => {
        if (res.data.errno === 0) {
          this.$router.push('/user')
        }
      })
    },
    toUser() {
      this.$router.push('/user')
    },
    tohome() {
      this.$router.push('/home')
    },
    toarticle() {
      this.$router.push('/home/article')
      this.drawer = false
    },
    toadminhome() {
      this.$router.push('/home/adminhome')
      this.drawer = false
    }
  },
  
}
</script>

<style lang="less">
.text{
  height: 50px;
  background-color: rgb(63, 63, 63);
  .pic{
    color: aliceblue;
    font-size: 28px;
    cursor: pointer;
  }
  .log{
    position: absolute;
    font-size: 15px;
    word-spacing: 8px;
    width: 73px;
    text-align: center;
    height: 30px;
    right: 70px;
    top: 8px;
    cursor: pointer;
    border: 0;
    border-radius: 10px;
  }
  .log2{
    position: absolute;
    right: 30px;
    top: 2px;
    display: flex;
    .buts{
      background-color: #f3f3f3;
      width: 10px;
      height: 30px;
      border-color: #d3dce6;
      margin-top: 5px;
      position: relative;
      i{
        position: absolute;
        color: black;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
.el-drawer__body{
  background-color: rgb(78, 78, 78);
  .personal{
    width: 90px;
    height: 90px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 50px;
  }
  .nametitl{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 158px;
    font-size: 20px;
    color: #d3dce6;
  }
  .tolist{
    margin-top: 238px;
    .on-tolist{
      padding: 0 30px;
      cursor: pointer;
      p{
        margin: 0;
        border-bottom: 1px solid #fff;
        height: 45px;
        line-height: 45px;
        color: rgb(212, 212, 212);
      }
      
    }
    .on-tolist:hover{
      background-color: rgb(88, 88, 88);
    }
  }
}
</style>