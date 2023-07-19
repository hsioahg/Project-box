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
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    submit () {
      axios.post('/api/blog/user/login', {
        email: this.email,
        password: this.password
      }).then(res => {
        if (res.data.errno === 0) {
          this.$router.push({path: '/home'})
        } else {
          this.$message.error('邮箱号或密码错误,请重新输入!');
        }
      })
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
</style>