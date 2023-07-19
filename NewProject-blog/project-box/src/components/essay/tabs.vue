<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="博 客 推 荐" name="first">
        <blogList v-for="item in 5" :key="item"></blogList>
      </el-tab-pane>
      <el-tab-pane label="问 题 解 答" name="second"></el-tab-pane>
      <el-tab-pane label="共 享 笔 记" name="third"></el-tab-pane>
      <el-tab-pane label="留 言 板" name="fourth"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import blogList from '@/components/essay/blogList.vue'
export default {
  data() {
    return {

    };
  },
  computed: {
	  ...mapState(['activeName'])
  },
  methods: {
     handleClick(tab, event) {
      this.$store.commit('initactiveName', tab.name)
    }
  },
  components: {
    blogList
  }
}
</script>

<style lang="less">
.el-tabs__active-bar{
    background-color: rgb(255, 0, 0);
  }
  .el-tabs__item.is-active{
    color: rgb(255, 0, 0);
  }
  .el-tabs__item:hover {
    color: rgb(225, 7, 7);
    cursor: pointer;
}
</style>