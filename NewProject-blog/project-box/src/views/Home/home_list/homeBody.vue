<template>
  <div>
    <el-carousel :interval="4000" type="card">
      <el-carousel-item v-for="item in 6" :key="item">
        <h1 class="medium">{{ item }}</h1>
      </el-carousel-item>
    </el-carousel>
    <div class="homebody">
      <homeCentre v-for="item in 4" :key="item"></homeCentre>
    </div>
    <div class="blogbody">
      <div class="blogbodyL">
        <tabs></tabs>
      </div>
      <div class="blogbodyR">
        <div class="notice">
          <i class="el-icon-data-analysis">
            <p class="noticeText">公 告 栏</p>
          </i>
          <p class="noticeTime">{{ nowtime }}</p>
        </div>
        <div>
          <noticeList v-for="(item,index) in ceshi" :key="index"
            :num = "index+1"></noticeList>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import times from '@/utils/time.js'
import tabs from '@/components/essay/tabs.vue'
import noticeList from '@/components/Home/noticeList.vue'
import homeCentre from '@/components/Home/homeCentre.vue'
export default {
  data() {
    return {
      nowtime: times,
      ceshi:[
        {id:2},
        {id:2},
        {id:2},
        {id:2},
        {id:2},
      ]
    };
  },
  
  methods: {
    
  },
  components: {
    homeCentre,
    noticeList,
    tabs,
  }
}
</script>

<style lang="less" scoped>
.homebody {
  @media screen and (min-width: 1220px) and (max-width: 2580px) {
    width: 1120px;
    top:-90px;
  }
  width: 945px;
  position: relative;
  top:-100px;
  z-index: 990;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
}
.blogbody {
  @media screen and (min-width: 1220px) and (max-width: 2580px) {
    width: 1120px;
  }
  width: 945px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  top: -60px;
  // height: 200px;
  display: flex;
  .blogbodyL{
    flex: 1;
    height: 20px;
    display: inline;
  }
  .blogbodyR{
    width: 300px;
    margin-left: 10px;
    background-color: rgb(254, 254, 254);
    .notice{
      height: 75px;
      border-top: 1px solid #475669;
      border-bottom: 1px solid #475669;
      i {
        font-size: 40px;
        position: relative;
        margin: 0 18px;
        top: 50%;
        transform: translateY(-50%);
        .noticeText{
          display: inline-block;
          margin: 0 20px;
          font-size: 22px;
          position: relative;
          top: 50%;
          transform: translateY(-50%);
          color: rgb(249, 56, 56);
        }
      }
      .noticeTime{
        display: inline-block;
        position: relative;
        left: 95px;
        bottom: 5px;
      }
    }
    
  }
}
</style>

<style lang="less">
.el-main{
  padding: 0;
  .el-carousel__container {
    @media screen and (min-width: 2020px) and (max-width: 2580px) {
      height: 470px;
    }
    @media screen and (min-width: 1220px) and (max-width: 2020px) {
      height: 370px;
    }
    height: 300px;
  }
}
.el-carousel__indicators{
  position: relative;
  top: -110px;
  left: 50%;
  transform: translateX(-50%);
}
 .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #8e9092;
  }
  

</style>