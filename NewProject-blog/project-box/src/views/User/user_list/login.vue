<template>
  <div>
    <div class="user-title">
      <h1>Login</h1>
    </div>
    <div>
      <input type="text" placeholder="请输入邮箱" class="user-mail" v-model="email">
      <input type="password" placeholder="请输入密码" class="user-password" v-model="password">
    </div>
    <button class="user-log" @click="submit" :plain="true" duration=0>立即登录</button>
    <p class="user-forget"  @click="openForget = true">忘记密码</p>
    <el-dialog
      title="找回密码"
      :visible.sync="openForget"
      width="30%"
      :append-to-body='true' >
      <div class="retrievebox">
        <input type="text" placeholder="请输入邮箱" v-model="retemail">
        <div class="verif">
          <input type="text" placeholder="请输入验证码" v-model="vercode">
          <el-button type="info" @click="retCode" :disabled="used" class="yan-but"><span>{{VCode.Text}}</span></el-button>
        </div>
        <input type="text" placeholder="请输入新密码" v-model="newpass1">
        <input type="text" placeholder="请确认新密码" v-model="newpass2">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="openForget = false">取 消</el-button>
        <el-button type="primary" @click="succRet">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import url from '@/request/url.js'
import { postRequest,getRequest } from '../../../request/api'
import { msgsuccess } from '@/utils/elementUI.js'
export default {
  data () {
    return {
      VCode: {
        counter:60,
        Text:'获取验证码',
        used:false,
        confirmPass: ''
      },
      email: '',
      password: '',
      openForget: false,
      vercode: '',
      newpass1: '',
      newpass2: '',
      retemail: ''
    }
  },
  props:{
    used:{
      default: false,
      type: Boolean
    }
  },
  mounted() {
    this.keyDown()
  },
  methods: {
    submit () {
      postRequest(url.login,{
        email: this.email,
        password: this.password
      }).then(res => {
        if (res.errno === 2) {
          window.localStorage.setItem('token', res.data.token)
          if (localStorage.getItem('token')) {
            this.$router.push({path: '/home'})
          }
        } else if(res.errno === -1) {
          msgsuccess('邮箱或密码输入错误，请重新填入！', 'error', 4000, true)
        }
      })
    },
    retCode(){
      var regEmail= /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if(this.retemail==''){
        msgsuccess('请输入邮箱', 'error', 4000, true)
      } else if(!regEmail.test(this.retemail)){
        msgsuccess('请输入正确的邮箱', 'error', 4000, true)
      } else {
        getRequest(url.mailcheck, {params:{
          email: this.retemail
        }}).then(res => {
          if (res.errno === -1) {
            this.VCode.Text = '请稍后...'
            postRequest(url.getemail,{
              email: this.retemail,
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
            
          } else {
            msgsuccess('该邮箱未被注册', 'error', 4000, true)
          }
        })     
        }
    },
    succRet(){
      let newpass1 = this.newpass1.length
      if (newpass1 < 6 || newpass1 > 16) {
        msgsuccess('请输入6到16位的密码', 'error', 4000, true)
      }
      if (this.vercod === '') {
        msgsuccess('请输入验证码', 'error', 4000, true)
      }
      if (this.newpass1 !== this.newpass2) {
        msgsuccess('两次密码不一致！', 'error', 4000, true)
      } else {
        postRequest(url.retpass, {
          retemail: this.retemail,
          vercode: this.vercode,
          newpass1: this.newpass1
        },2000).then(res => {
          if (res.errno === -1) {
            msgsuccess(res.message, 'error', 4000, true)
          } else {
            msgsuccess('修改成功，请登录！', 'success', 4000)
            this.openForget = false
          }
        })
      }
    },
    keyDown() {
      document.onkeydown =  (e) => {
        if (e.keyCode === 13) {
          this.submit ()
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .user-title{
    text-align: center;
    margin: auto;
    margin-top: 60px;
    color: aliceblue;
  }
  .user-mail{
    width: 217px;
    height: 37px;
    margin-top: 40px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border: 0;
    border-bottom: 2px solid rgb(0, 0, 0);
    outline: none;
    /* border-radius: 20px; */
    text-indent: 1em;
    font-size: 15px;
    opacity:0.6;
  }
  .user-password{
    width: 217px;
    height: 37px;
    margin-top: 95px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    outline: none;
    border: 0;
    border-bottom: 1px solid black;
    /* border-radius: 20px; */
    text-indent: 1em;
    font-size: 15px;
    opacity:0.6;
  }
  .user-log{
    width: 170px;
    height: 45px;
    margin-top: 170px;
    font-size: 17px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 13px;
    cursor: pointer;
    border: none;
    background-color: #D2EEEA;
  }
  .user-forget{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
    bottom: 25px;
  }
  .user-forget:hover{
    color: #D2EEEA;
  }
  .retrievebox{
    display: inline-block;
    text-align: center;
    input {
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
  
</style>