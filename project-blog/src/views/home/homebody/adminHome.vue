<template>
  <div>
    <div class="admin-top">
      <div class="admin-body">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" class="admin-bodyhead"></el-avatar>
        <div class="admin-bodyname">{{nickname}}</div>
      </div>
    </div>
    <div class="admin-bottom" v-loading="loading">
      <div class="admin-bottom-body">
        <AblogList v-for="item in bloglist" :key="item.id"
          :title = "item.title"
          :createtime = "item.createtime"
          :content = "item.content"
          :item="item"></AblogList>
      </div>
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pagesize"
          layout="total, prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import AblogList from '@/components/blogList/AblogList.vue'
import {mapState} from 'vuex'
import axios from 'axios';
export default {
  data() {
    return {
      bloglist: [],
      total: 0,
      pagesize: 10,
      currentPage: 1,
      loading: false
    };
  },
  computed: {
	  ...mapState(['nickname'])
  },
  created() {
    this.adminblogdate()
    this.blogNum()
  },
  components: {
    AblogList
  },
  methods: {
    handleCurrentChange() {
      this.adminblogdate()
    },
    adminblogdate() {
      this.loading = true
      axios.get('/api/blog/home/adminblog', {params: {
        n: this.currentPage,
        m: this.pagesize
      }}).then(res => {
        if (res.data.errno === 0) {
          this.bloglist = res.data.data
          this.loading = false
        }
      })
    },
    async blogNum() {
      const { data:res } = await axios.get('/api/blog/home/adminblognum')
      if (res.errno === 0) {
        this.total = res.data[0].blognum
      }
    },
  }
}
</script>

<style lang="less">
.el-main{
  padding: 0;
  margin: 0;
}
.admin-top{
  height: 290px;
  background-color: #5ef2ff;
  .admin-body{
    @media screen and (max-width: 768px) {
      width: 100%;
    }
    @media screen and (min-width: 768px) and (max-width: 1820px) {
      width: 1135px;
    }
    @media screen and (min-width: 1820px) and (max-width: 2580px) {
      width: 1335px;
    }
    position: relative;
    height: 100%;
    left: 50%;
    transform: translateX(-50%);
    .admin-bodyhead{
      width: 100px;
      height: 100px;
      position: absolute;
      bottom: 20px;
      left: 30px;
    }
    .admin-bodyname{
      position: absolute;
      bottom: 60px;
      left: 180px;
      font-size: 28px;
    }
  }
}
.admin-bottom{
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  @media screen and (min-width: 768px) and (max-width: 1820px) {
    width: 1135px;
  }
  @media screen and (min-width: 1820px) and (max-width: 2580px) {
    width: 1335px;
  }
  position: relative;
  height: 780px;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid #d7d7d7;
  .admin-bottom-body{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .block{
    position: absolute;
    bottom: 7px;
    left: 50%;
    transform: translateX(-50%);
  }
}


</style>