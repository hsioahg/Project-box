<template>
  <div class="centre" @click="text">
      <img :src=property alt="">
  </div>
</template>

<script>
export default {
  data() {
    return {
      property: 'https://cdn.sspai.com/3/8/2023/article/fad1d506-0cda-a729-7c78-f9efe813224a.jpg?imageMogr2/auto-orient/quality/95/thumbnail/!528x288r/gravity/Center/crop/528x288/interlace/1',
    };
  },
  methods: {
    text(){
      let routeData = this.$router.resolve({ path: '/user'});
      window.open(routeData.href, '_blank');  
    }
  }
}
</script>

<style lang="less" scoped>
  .centre {
    display: inline-block;
    width: 23%;
    height: 135px;
    border-radius: 15px;
    cursor: pointer;
    overflow: hidden;
    display: flex;
    box-shadow: 2px 2px 5px rgb(148, 148, 148);
    img {
      width: 100%+10px;
      height: 135px+10px;
      border-radius: 15px;
      transition: all 0.3s;
      position: relative;
      left: 50%;
      top: 50%;
      transform:translate(-50%,-50%)
    }
    img:hover {
      width: 100%+18px;
      height: 135px+18px;
    }
  }
</style>