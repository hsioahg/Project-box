<template>
  <router-view></router-view>
</template>

<style lang="less">
html,body,h1,h2,h3,h4,h5,h6{
  margin: 0;
  padding: 0;
  height: 100%;
}
body{
  background-color: rgb(246, 246, 246);
}
::-webkit-scrollbar-track
{
background: rgba(2, 2, 2, 0.1);
border-radius: 0;
}

::-webkit-scrollbar
{
-webkit-appearance: none;
// 滚动条的宽高
width: 5px;
// height: 2px;
}

::-webkit-scrollbar-thumb
{
cursor: pointer;
border-radius: 10px;
background: rgba(0,0,0,.25);
transition: color .2s ease;
}
</style>
