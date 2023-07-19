<template>
  <div class="particles-js">
    <particles></particles>
    <div class="user-login">
      <div class="user-body">
        <button @click="tolog">已有帐号?去登录</button>
        <button @click="toregister">没有账号?去注册</button>
      </div>
      <!--  :class="{'user-index':true,'right-index':false}" -->
      <div :class="{'user-index':true,'right-index':isRight}">
        <div class="personal-back" @click="goHome">
          <i class="el-icon-s-home"></i>
        </div>
        <div v-if="LRon">
          <Login></Login>
        </div>
        <div v-if="!LRon">
          <Register></Register>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Login from '../User/user_list/login.vue'
import Register from '../User/user_list/register.vue'
import Particles from '@/components/particles/index.vue'
import {mapState} from 'vuex'
export default {
  data(){
    return{
      
    }
  },
  computed: {
	  ...mapState(['isRight','LRon'])
  },
  methods: {
    goHome() {
      this.$router.push('/home')
    },
    tolog() {
      // this.LRon=true
      this.$store.commit('initisRight', false)
      this.$store.commit('initLRon', true)
    },
    toregister() {
      // this.LRon=false
      this.$store.commit('initisRight', true)
      this.$store.commit('initLRon', false)
    }
  },
  components: {
    Login,
    Register,
    Particles
  },

}
</script>

<style lang="less" scoped>
  * {
    margin: 0;
    padding: 0;
  }
  .particles-js, .lizi {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // background: url('../../../public/back1.png') no-repeat;
    overflow: hidden;
  }
  .user-login{
    width: 680px;
    height: 450px;
    // background-color: antiquewhite;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .user-body{
      height: 350px;
      background-color: #DAF3FF;
      margin-top: 48px;
      display: flex;
      justify-content: space-around;
      box-shadow: 4px 4px 8px #4f4e4e;
      button{
        width: 125px;
        height: 43px;
        position: relative;
        top: 250px;
        border-radius: 15px;
        cursor: pointer;
        border: none;
        background-color: #D2EEEA;
      }
    }
    .user-index{
      width: 325px;
      height: 100%;
      // background-color: rgb(213, 183, 138);
      // background: url('../../../public/Lion dance.jpg') -20px -20px;
      background-size: 730px;
      position: absolute;
      top: 0;
      margin: 0px 40px;
      background-color: #268A82;
      transition: all 0.5s;
      &.right-index{
        margin-left: 310px;
      }
      .personal-back{
        width: 40px;
        height: 40px;
        // background-color: aliceblue;
        border-radius: 50px;
        margin: 10px;
        position: relative;
        cursor: pointer;
        border: none;
        background-color: #D2EEEA;
        i{
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          font-size: 25px;
        }
      }
    }
  }
</style>