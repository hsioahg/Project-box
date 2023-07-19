<template>
  <div class="home-admin-bottom">
    <h4 class="admin-bottom-title">备忘录</h4>
    <div class="admin-bottom-input">
      <input type="text" placeholder="请输入任务" class="admin-bottom-text" :value="inputValue" @input="handleInput">
      <el-button type="warning" plain @click="addItemToList">添加事项</el-button>
    </div>
    <el-tabs type="border-card" v-loading="loading">
      <el-tab-pane label="全部">
        <div class="card-list" v-for="item in memolist" :key="item.id">
          <div class="cart-list-text">
            <el-checkbox @change="state">{{item.test}}</el-checkbox>
          </div>
          <a @click="where(item)">删除</a>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from 'axios'
import {mapState,mapMutations} from 'vuex'
export default {
  data() {
    return {
      checked: [],
      // loading: false
    }
  },
  computed:{
    ...mapState(['memolist', 'inputValue','loading'])
  },
  created() {
    this.$store.dispatch('memolist')
  },
  methods: {
    ...mapMutations(['serInputValue']),
    handleInput(e) {
      this.$store.commit('serInputValue', e.target.value)
    },
    addItemToList() {
      this.$store.commit('onloading', true)
      if (this.inputValue.trim().length <= 0) return this.$message.error('文本框信息不能为空！');
      axios.post('/api/erp/user/inmemo',{
        test: this.inputValue
      }).then(res => {
        if (res.data.errno === 0) {
          this.serInputValue('')
          this.$store.dispatch('memolist')
        }
      })
    },
    where(item){
      this.$store.commit('onloading', true)
      axios.post('/api/erp/user/memodel', {
        id: item.id
      }).then(res => {
        if (res.data.errno === 0) {
          this.$store.dispatch('memolist')
        }
      })
    },
    state(val){
      console.log(val);
    }
  }
}
</script>

<style lang="less">
.home-admin-bottom{
  position: relative;
  height: 581px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(201, 201, 201);
  border-radius: 20px;
  box-shadow: 1px 3px 10px rgb(223, 223, 223);
  .admin-bottom-title{
    text-align: center;
    font-size: 20px;
  }
  .admin-bottom-input{
    // width: 414px;
    display: flex;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    .admin-bottom-text{
      @media screen and (min-width: 1920px) and (max-width: 2580px) {
        width: 280px;
        margin-right: 30px;
      }
      @media screen and (min-width: 1200px) and (max-width: 1920px) {
        width: 140px;
        margin-right: 20px;
      }
      height: 33px;
      
      font-size: 15px;
      border-radius: 8px;
      border: 1px solid rgb(201, 201, 201);
      outline: none;
      text-indent: 1em;
    }
  }
  .el-tabs{
    margin-top: 90px;
    border-bottom: none;
    box-shadow: none;
    .el-tabs__content{
      height: 345px;
      overflow: auto;
      // display: flex;
      .el-tab-pane{
        // width: 100%;
        
        .card-list{
          display: flex;
          align-self: center;
          align-items: center;
          border-bottom: 1px solid #000;
          // width: 100%;
          padding: 8px 0;
          a{
            position: relative;
            right: 14px;
            cursor: pointer;
            margin-left: 20px;
            width: 32px;
          }
          a:hover{
            color: rgb(234, 165, 61);
          }
          .cart-list-text{
            flex: 1;
            overflow: hidden;
            .el-checkbox{
              display: flex;
              .el-checkbox__input{
                margin-top: 3px;
              }
              .el-checkbox__label{
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
              }
            }
          }
        }
      }
    }
  }
}
</style>