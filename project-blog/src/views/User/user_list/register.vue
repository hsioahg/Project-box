<template>
  <div>
    <div class="register-title">
      <h1>Register</h1>
    </div>
    <div class="register-body">
      <input type="text" placeholder="请输入昵称" v-model="nickname" @input="onRode()">
      <input type="text" placeholder="请输入邮箱" v-model="email">
      <div class="verif">
        <input type="text" placeholder="请输入验证码" v-model="vercode">
        <!-- <button round @click="getCode" :disabled="used">{{Text}}</button> -->
        <el-button type="info" @click="getCode" :disabled="used" class="yan-but"><span>{{Text}}</span></el-button>
      </div>
      <input type="text" v-model="password" placeholder="请输入密码">
      <input type="text" v-model="confirmPass" placeholder="请确认密码">
    </div>
    <button class="register-btn" @click="regisbtn">立即注册</button>
  </div>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
export default {
  data(){
      return{
        email: '',
        nickname: '',
        vercode: '',
        counter:60,
        Text:'获取验证码',
        used:false,
        password: '',
        confirmPass: ''
        
      }
  },
  computed: {
	  ...mapState(['isRight','LRon'])
  },
  methods:{
    getCode(){
      var regEmail= /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if(this.email==''){
          this.$message.error('请输入邮箱!');
          return
        }else if(!regEmail.test(this.email)){
          this.$message.error('请输入正确的邮箱!');
          return
        } else {
          axios.post('/api/blog/user/mailcheck', {
            email: this.email
          }).then(res => {
            if (res.data.errno === -1) {
              this.$message.error('该邮箱已被注册,请重新输入!');
              return
            } else {
              axios.post('/api/blog/user/getemail', {
                email: this.email,
              })
              var timeWare = window.setInterval(() => {
                this.used = true;
                this.counter -- ;
                this.Text = this.counter + 's后重新获取';
                if (this.counter === 0){
                    this.Text = '获取验证码';
                    this.counter = 60;
                    this.used = false;
                    clearTimeout(timeWare);
                    // console.log('diao');
                }
              },1000);
            }
          })
          
        }
    },
    onRode(){
      axios.post('/api/blog/user/nick', {
        nickname: this.nickname,
      }).then(res => {
        if (res.data.errno === -1) {
          this.$message.error('该昵称已被占用,请重新输入!');
          return
        }
      })
    },
    regisbtn(){
      let len = this.password.length
      let nicklen = this.nickname.length
      if (len < 6 || len > 16) {
        this.$message.error('请输入6到16位的密码');
        return
      } else if (this.password !== this.confirmPass) {
        this.$message.error('确认密码与密码不相同');
        return
      } else {
        axios.post('/api/blog/user/nick', {
          nickname: this.nickname,
        }).then(res => {
          if (res.data.errno === -1) {
            this.$message.error('该昵称已被占用,请重新输入!');
            return
          } else if (nicklen < 5 || nicklen > 10) {
            this.$message.error('请输入5到10位的昵称');
            return
          } else {
            axios.post('/api/blog/user/uregis', {
              vercode: this.vercode,
              email: this.email,
              nickname: this.nickname,
              password: this.password
            }).then(res => {
              if (res.data.errno === -1) {
                this.$message.error('验证码有误,请重新输入!');
                return
              } else if (res.data.errno === 0) {
                 this.$message({
                  message: '注册成功,请登录!',
                  type: 'success'
                });
                this.$store.commit('initisRight', false)
                this.$store.commit('initLRon', true)
              }
            })
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
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