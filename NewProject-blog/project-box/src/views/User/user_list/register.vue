<template>
  <div>
    <div class="register-title">
      <h1>Register</h1>
    </div>
    <div class="register-body">
      <input type="text" placeholder="请输入昵称" v-model="nickname" @blur="onRode()">
      <input type="text" placeholder="请输入邮箱" v-model="email">
      <div class="verif">
        <input type="text" placeholder="请输入验证码" v-model="vercode">
        <!-- <button round @click="getCode" :disabled="used">{{Text}}</button> -->
        <el-button type="info" @click="getCode" :disabled="used" class="yan-but"><span>{{VCode.Text}}</span></el-button>
      </div>
      <input type="text" v-model="password" placeholder="请输入密码">
      <input type="text" v-model="confirmPass" placeholder="请确认密码">
    </div>
    <button class="register-btn" @click="regisbtn">立即注册</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { postRequest, getRequest } from '../../../request/api'
import url from '@/request/url.js'
import { msgsuccess } from '@/utils/elementUI.js'
export default {
  data(){
      return{
        VCode: {
          counter:60,
          Text:'获取验证码',
          used:false,
          confirmPass: ''
        },
        email: '',
        nickname: '',
        password: '',
        vercode: ''
      }
  },
  props:{
    confirmPass:{
      default: '',
      type: String
    },
    used:{
      default: false,
      type: Boolean
    }
  },
  computed: {
	  ...mapState(['isRight','LRon'])
  },
  methods:{
    // 获取验证码
    getCode(){
      var regEmail= /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if(this.email==''){
        msgsuccess('请输入邮箱', 'error', 4000, true)
      } else if(!regEmail.test(this.email)){
        msgsuccess('请输入正确的邮箱', 'error', 4000, true)
      } else {
        getRequest(url.mailcheck, {params:{
          email: this.email
        }}).then(res => {
          if (res.errno === -1) {
            msgsuccess(res.message, 'error', 4000, true)
          } else {
            this.VCode.Text = '请稍后...'
            postRequest(url.getemail,{
              email: this.email,
            }).then(res => {
              if (res.errno === 0) {
                this.VCode.Text = '60s后重新获取';
                var timeWare = window.setInterval(() => {
                  this.VCode.used = true;
                  this.VCode.counter -- ;
                  this.VCode.Text = this.VCode.counter + 's后重新获取';
                  if (this.VCode.counter === 0){
                      this.VCode.Text = '重新获取验证码';
                      this.VCode.counter = 60;
                      this.VCode.used = false;
                      clearTimeout(timeWare);
                  }
                },1000);
                msgsuccess(res.message, 'success', 4000)
              } else {
                this.VCode.Text = '重新获取验证码'
                msgsuccess(res.message, 'error', 4000)
              }
            })
          }
        })     
        }
    },
    // 判断用户名是否被占用
    onRode(){
      getRequest(url.nick, {params: {
        nickname: this.nickname
      }}).then(res => {
        console.log(res);
        if (res.errno === -1) {
          msgsuccess(res.message, 'error', 2000, true)
        }
      })
    },
    regisbtn(){
      let len = this.password.length
      let nicklen = this.nickname.length
      if (nicklen < 5 || nicklen > 10){
        msgsuccess('请输入5到10位的昵称', 'error', 4000, true)
      }else if (len < 6 || len > 16) {
        if (this.text) return
        msgsuccess('请输入6到16位的密码', 'error', 4000, true)
        this.text = true
        window.setTimeout(() => {
          this.text = false
        },5000);
        return
      } else if (this.password !== this.confirmPass) {
        msgsuccess('两次密码不一致', 'error', 4000, true)
      } else {
        postRequest(url.register, {
          vercode: this.vercode,
          email: this.email,
          nickname: this.nickname,
          password: this.password
        }).then(res => {
          if (res.errno === -1) {
            msgsuccess(res.message, 'error', 4000)
          } else if (res.errno === 0) {
            msgsuccess('注册成功，请登录！', 'success', 4000)
            this.$store.commit('initisRight', false)
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
* {
    margin: 0;
    padding: 0;
  }
  .register-title{
    text-align: center;
    margin: auto;
    color: aliceblue;
  }
  .register-body{
    // background-color: antiquewhite;
    text-align: center;
    margin-top: 20px;
    input{
      margin-top: 10px;
      width: 216px;
      height: 30px;
      font-size: 15px;
      text-indent: 1em;
      border: 0;
      border-bottom: 1px solid black;
      outline: none;
      opacity:0.6;
    }
    .verif{
      input{
        width: 115px;
        text-indent: 12px;
      }
      .yan-but{
        position: relative;
        top: -5px;
        margin-left: 10px;
        opacity:0.8;
        width: 90px;
        height: 30px;
        // background-color: aliceblue;
        cursor: pointer;
        border: none;
        background-color: #D2EEEA;
        span{
          font-size: 10px;
          color: black;
          display: inline-block;
          position: absolute;
          top: 0;
          left: 0;
          width: 90px;
          height: 30px;
          text-align: center;
          line-height: 30px;
        }
      }
    }
    
  }
  .register-btn{
    width: 170px;
    height: 45px;
    margin-top: 30px;
    font-size: 17px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 13px;
    cursor: pointer;
    border: none;
    background-color: #D2EEEA;
  }
</style>