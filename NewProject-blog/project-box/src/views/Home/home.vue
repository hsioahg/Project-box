<template>
  <el-container class="out">
    <el-header :class="{'text':!window,'window-text':window}">
      <div class="regular">
        <p class="pic" @click="tohome">Project box</p>
        <div class="tab" v-if="window">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="博 客 推 荐" name="first"></el-tab-pane>
            <el-tab-pane label="问 题 解 答" name="second"></el-tab-pane>
            <el-tab-pane label="共 享 笔 记" name="third"></el-tab-pane>
            <el-tab-pane label="留 言 板" name="fourth"></el-tab-pane>
          </el-tabs>
        </div>
          <div class="search">
            <i class="el-icon-search"></i>
            <input type="text">
          </div>
          <button class="log" v-if="!loginState" @click="toUser">登 录</button>
          <div class="log2" v-if="loginState">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
              <el-button @click="drawer=true" type="primary" style="margin-left: 16px;" class="buts">
                <i class="el-icon-s-operation"></i>
              </el-button>
          </div>
      </div>
    </el-header>
    <el-drawer
      :visible.sync="drawer"
      :with-header="false"
      size=320px>
      <span>
        <el-avatar src="https://iconfont.alicdn.com/p/illus/preview_image/iteD62W9PRJ9/e4061546-859a-4637-bfd9-576eb4383ebf.png" class="personal"></el-avatar>
        <p class="nametitl">{{ userlog.nickname }}</p>
        <div class="tolist">
          <div class="on-tolist" @click="write">
            <p>写文章</p>
          </div>
          <div class="on-tolist">
            <p>个人中心</p>
          </div>
          <div class="on-tolist" @click="outlog">
            <p>退出登录</p>
          </div>
        </div>
      </span>
    </el-drawer>
    <el-main class="main">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import tabs from '@/components/essay/tabs.vue'
import {mapState} from 'vuex'
import { msgsuccess } from '@/utils/elementUI.js'
export default {
  data() {
    return {
      drawer: false
    };
  },
  computed: {
	  ...mapState(['loginState','userlog','activeName','window'])
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll) // 监听页面滚动
  },
  methods: {
    tohome() {
      this.$router.push('/home')
    },
    toUser() {
      this.$router.push('/user')
    },
    outlog() {
      window.localStorage.removeItem('token')
      if (window.localStorage.getItem('token') === null) {
        location.reload()
        msgsuccess('成功退出','success',2000)
      }
    },
    write(){
      this.$router.push('/home/essay').then(res => {
        console.log(res.fullPath);
        if (res.fullPath === '/home/essay') {
          this.$store.commit('initwindow', false)
          this.drawer= false
        }
      })
      // this.drawer= false
    },
    handleScroll () {
      // console.log(this.$route.path);
      if (this.$route.path == '/home') {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop >= 515) {
          this.$store.commit('initwindow', true)
        } else {
          this.$store.commit('initwindow', false)
        }
      } else if (this.$route.path == '/home/essay') {
        this.$store.commit('initwindow', false)
        return
      }
        
      
      
    },
    handleClick(tab, event) {
      this.$store.commit('initactiveName', tab.name)
    }
  },
  components: {
    tabs
  }
}
</script>

<style lang="less" scoped>
.out{
  height: 100%;
}

.text{
  width: 100%;
  height: 55px;
  background-color: rgb(33, 33, 33);
  top: 0;
  z-index: 999;
  position: fixed;
  transition: all 0.5s;
  .regular{
    position: relative;
    .pic{
      margin: 0;
      height: 100%;
      color: aliceblue;
      font-size: 28px;
      cursor: pointer;
      line-height: 55px;
      display: inline-block;
      font-style: italic;
    }
    .tab{
      display: inline-block;
      position: absolute;
      bottom: -5px;
      left: 212px;
    }
  .search{
    background-color: rgba(255, 255, 255, 0.7);
    width: 280px;
    height: 35px;
    display: inline-block;
    position: absolute;
    right: 170px;
    top: 50%;
    transform: translateY(-50%);
    border-bottom: 1px solid #ffffff ;
    i{
      font-size: 25px;
      position: absolute;
      left: 7px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      color: rgb(38, 38, 38);
    }
    input{
      font-size: 16px;
      width: 230px;
      position: absolute;
      left: 39px;
      top: 50%;
      transform: translateY(-50%);
      background-color: rgba(255, 255, 255, 0);
      outline: none;
      border: none;
    }
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
    top: 50%;
    transform: translateY(-50%);
  }
  .log2{
    position: absolute;
    right: 30px;
    top: 50%;
    display: flex;
    transform: translateY(-50%);
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
 
}
&.window-text{
  width: 100%;
  height: 55px;
  background-color: rgb(255, 255, 255);
  top: 0;
  z-index: 999;
  position: fixed;
  transition: all 0.5s;
  .regular{
    position: relative;
    .pic{
      margin: 0;
      height: 100%;
      color: rgb(0, 0, 0);
      font-size: 28px;
      cursor: pointer;
      line-height: 55px;
      display: inline-block;
      font-style: italic;
    }
    .tab{
      display: inline-block;
      position: absolute;
      bottom: -5px;
      left: 212px;
    }
  .search{
    background-color: rgba(235, 235, 235, 0.7);
    width: 280px;
    height: 35px;
    display: inline-block;
    position: absolute;
    right: 170px;
    top: 50%;
    transform: translateY(-50%);
    border-bottom: 1px solid #000000 ;
    i{
      font-size: 25px;
      position: absolute;
      left: 7px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      color: rgb(0, 0, 0);
    }
    input{
      font-size: 16px;
      width: 230px;
      position: absolute;
      left: 39px;
      top: 50%;
      transform: translateY(-50%);
      background-color: rgba(255, 255, 255, 0);
      outline: none;
      border: none;
    }
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
    top: 50%;
    transform: translateY(-50%);
  }
  .log2{
    position: absolute;
    right: 30px;
    top: 50%;
    display: flex;
    transform: translateY(-50%);
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
}
.main{
  margin-top: 55px;
  overflow: visible;
}
.el-drawer__body{
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
    color: #242424;
  }
  .tolist{
    margin-top: 238px;
    .on-tolist{
      padding: 0 30px;
      cursor: pointer;
      p{
        margin: 0;
        border-bottom: 1px solid rgb(146, 145, 145);
        height: 45px;
        line-height: 45px;
        color: rgb(50, 50, 50);
        text-align: center;
        letter-spacing: 10px;
      }
      p:hover{
        color: rgb(255, 0, 0);
      }
    }
    .on-tolist:hover{
      background-color: rgb(246, 246, 246);
    }
  }
}
</style>
