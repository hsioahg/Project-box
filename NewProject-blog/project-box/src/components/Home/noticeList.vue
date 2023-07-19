<template>
  <div class="noticeBody">
    <div class="noticeL">{{num > 9 ? num:'0'+num}}</div>
    <div class="noticeR">测试标题测试标题测试标题测试标题</div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: '',
      type: String
    },
    num: {
      Object: '',
      type: Number
    }
  }
}
</script>

<style lang="less" scoped>
.noticeBody{
  display: flex;
  .noticeL{
    display: inline-block;
    width: 55px;
    height: 55px;
    margin: 13px 10px 10px 18px;
    text-align: center;
    line-height: 55px;
    font-size: 28px;
    font-weight: 700;
    color: red;
    border-right: 2px solid #000;
  }
  .noticeR{
    flex: 1;
    display: inline-block;
    font-size: 17px;
    height: 51px;
    margin: 18px 18px 10px 0px;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow-wrap: break-word;  //强制换行
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp:2;
    cursor: pointer;
  }
  .noticeR:hover{
    text-decoration: underline;
  }
}

</style>