<template>
  <div class="log-body">
    <div class="O-login">
      <!-- <div class="login-L"></div> -->
      <div class="login-R">
        <h1>Sign in</h1>
        <input type="text" placeholder="请输入用户名" v-model="username">
        <input type="password"  placeholder="请输入密码" v-model="password">
        <button @click="siglogin">登 录</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    siglogin(){
      axios.post('/api/erp/user/login', {
        username: this.username,
        password: this.password
      }).then(res => {
        if (res.data.errno === 0) {
          this.$router.push({path: '/index'})
        } else {
          this.$message.error('用户名或密码错误,请重新输入!');
        }
      })
    }
  },
}
</script>

<style lang="less">
.log-body{
  height: 100%;
  background-color: rgb(104, 104, 104);
  .O-login{
    display: flex;
    width: 900px;
    height: 470px;
    // background-color: rgb(117, 139, 158);
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: url('../../public/img/book-img.jpg');
    background-size: cover;
    .login-R{
      position: absolute;
      right: 0;
      width: 325px;
      height: 100%;
      background-color: rgba(216, 216, 216, 0.5);
      h1{
        text-align: center;
        margin: 90px 0px 30px 0px;
      }
      input{
        width: 240px;
        height: 40px;
        text-align: center;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 25px;
        outline: none;
        font-size: 18px;
      }
      button{
        width: 170px;
        height: 40px;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 30px;
        font-size: 20px;
        word-spacing: 20px;
        cursor: pointer;
        border-radius: 8px;
        border: none;
        background-color: rgb(192, 157, 103);
        color: rgb(221, 221, 221);
      }
    }
  }
}
</style>