<template>
  <div class="text">
    <img :src=blogimg class="blogimg">
    <div class="intro">
      <p class="title">文章标题测试</p>
      <p class="describe">文章标题测试文章标题测试文章标题测试文章标题测试文章标题测
        文章标题测试文章标题测试文章标题测试文章标题测试文章标题测试
        文章标题测试文章标题测试文章标题测试文章标题测试文章标题测试
        文章标题测试文章标题测试文章标题测试文章标题测试文章标题测试
        文章标题测试文章标题测试文章标题测试文章标题测试文章标题测试</p>
        <div class="blogdata">
          <p class="author">作者：</p>
          <p class="time">时间：</p>
        </div>
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blogimg: 'http://localhost:8085/imgs/384f8dfd79829912be7a982768c43a03',
    };
  },
}
</script>

<style lang="less" scoped>
.text{
  height: 212px;
  margin-bottom: 15px;
  display: flex;
  .blogimg{
    height: 212px;
    width: 320px;
  }
  .intro{
    flex: 1;
    background-color: rgb(235, 235, 235);
    .title{
      font-size: 20px;
      margin: 25px;
    }
    .describe{
      margin: 0 25px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3; // 显示2行
      -webkit-box-orient: vertical;
      word-break: break-all;
    }
    .blogdata{
      display: flex;
      .author{
        margin-left: 25px;
        margin-top: 25px;
      }
      .time{
        position: relative;
        left: 100px;
        margin-top: 25px;
      }
    }
  }
}

</style>