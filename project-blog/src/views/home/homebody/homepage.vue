<template>
  <div>
    <!-- 头部区域 -->
    <div class="body">
      <!-- 轮播图 331 200-->
      <div class="let">
        <el-carousel :interval="4000" type="card">
          <el-carousel-item v-for="item in chartbody" :key="item.id">
            <a :href="item.charlink" target="_blank">
              <h3 class="medium">{{ item.chartitle }}</h3>
            </a>
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 公告栏 -->
      <div class="right hidden-xs-only">
        <div class="gao">公告栏</div>
        <div class="notice"></div>
      </div>
    </div>
    <!-- 博客列表 -->
    <div class="msgboard">
      <el-tabs v-model="activeName">
        <el-tab-pane label="博客列表" name="first">
          <div class="out-block" v-loading="loading">
            <!-- 博客列表 -->
            <div  v-if="!searchlist">
              <HblogList v-for="item in bloglist" :key="item.id"
                :title = "item.title"
                :nickname = "item.nickname"
                :createtime = "item.createtime"
                :content = "item.content"
                :item="item"
              ></HblogList>
            </div>
            <!-- <el-empty description="暂无信息" v-if="searchlist"></el-empty> -->
            <el-empty v-if="searchlist">
              <el-button type="primary" @click="returnlist">返回</el-button>
            </el-empty>
            <!-- 分页 -->
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
        </el-tab-pane>
        <!-- <el-tab-pane label="留言板" name="second">
          <div class="msg-board">
            <input type="text">
          </div>
        </el-tab-pane> -->
      </el-tabs>
      <div class="blog-right hidden-xs-only">
        <div class="search-bar">
          <input type="text" placeholder="请输入搜索内容" v-model="keyword">
          <i class="el-icon-search" @click="searchBtn"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import HblogList from '@/components/blogList/HblogList.vue'
import axios from 'axios';
export default {
  data() {
    return {
      bloglist:[],
      chartbody: [],
      activeName: 'first',
      total: 0,
      pagesize: 5,
      currentPage: 1,
      loading: false,
      searchlist: false,
      keyword: '',
    };
  },
  components: {
    HblogList
  },
  created() {
    this.chartdata()
    this.blogAPI()
    this.blogNum()
  },
  methods: {
    chartdata() {
      axios.get('/api/blog/home/chart').then(res => {
        if (res.data.errno === 0) {
          this.chartbody = res.data.data
        }
      })
    },
    async blogAPI() {
      this.loading = true
      const { data:res } = await axios.get('/api/blog/home/list', {params: {
        n: this.currentPage,
        m: this.pagesize,
        keyword: this.keyword
      }})
      if (res.errno === 0) {
        this.bloglist = res.data
        this.loading = false
        if (this.bloglist.length === 0) {
          this.searchlist = true
        } else {
          this.searchlist = false
        }
      }
    },
    async blogNum() {
      const { data:res } = await axios.get('/api/blog/home/blognum', {params: {
        keyword: this.keyword
      }})
      if (res.errno === 0) {
        this.total = res.data[0].blognum
      }
    },
    searchBtn() {
      this.blogNum()
      this.blogAPI()
      this.keyword = ''
    },
    returnlist() {
      this.searchBtn()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.blogAPI()
    }
  }
}
</script>

<style lang="less">
.body{
  display: flex;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  .let{
    @media screen and (max-width: 768px) {
      width: 100%;
    }
    @media screen and (min-width: 768px) and (max-width: 1920px) {
      width: 70%;
    }
    @media screen and (min-width: 1920px) and (max-width: 2580px) {
      width: 70%;
    }
    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
    }
    .el-carousel__container{
      @media screen and (max-width: 768px) {
        height: 200px;
      }
      @media screen and (min-width: 768px) and (max-width: 1920px) {
       height: 250px;
      }
      @media screen and (min-width: 1920px) and (max-width: 2580px) {
        height: 250px;
      }
      a{
        text-decoration: none;
        .medium{
          font-size: 40px;
          color: #ffffff;
          text-align: center;
        }
      }
    }
    .el-carousel__item:nth-child(2n) {
      background-color: #B3A5C8;
    }
    
    .el-carousel__item:nth-child(2n+1) {
      background-color: #B4918A;
    }
  }
  .right{
    flex: 1;
    background-color: #e0e0e0;
    border: 1px solid white;
    margin-left: 3px;
    border-radius: 20px;
    .gao{
      height:30px;
      background-color: #89898a;
      line-height: 30px;
      padding-left: 30px;
      border-bottom: 1px solid white;
      border-radius: 20px 20px 0px 0px;
    }
    .notice{
      line-height: 30px;
      height: 183px;
      overflow: auto;
    }
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  @media screen and (min-width: 768px) and (max-width: 1820px) {
    width: 1135px;
  }
  @media screen and (min-width: 1820px) and (max-width: 2580px) {
    width: 1335px;
  }
}
.msgboard{
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  @media screen and (min-width: 768px) and (max-width: 1820px) {
    width: 1135px;
  }
  @media screen and (min-width: 1820px) and (max-width: 2580px) {
    width: 1335px;
  }
  display: flex;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid #d1d1d1;
  margin-top: 20px;
  border-radius: 10px;
  display: flex;
  .el-tabs{
    @media screen and (max-width: 768px) {
      width: 100%;
    }
    @media screen and (min-width: 768px) and (max-width: 1920px) {
      width: 70%;
    }
    @media screen and (min-width: 1920px) and (max-width: 2580px) {
      width: 70%;
    }
    border-right: 1px solid #eaeaea;
  }
  .out-block{
    height: 820px;
  }
  .block{
    position: absolute;
    bottom: 7px;
    left: 50%;
    transform: translateX(-50%);
  }
  .blog-right{
    flex: 1;
    text-align: center;
    .search-bar{
      margin-top: 40px;
      display: inline-block;
      border-bottom: 1px solid #89898a;
      input{
        border: none;
        font-size: 18px;
        outline: none;
      }
      i{
        font-size: 23px;
      }
      i:hover{
        color: #B3A5C8;
        cursor: pointer;
      }
    }
  }
  .msg-board{
    height: 820px;
  }
}
</style>