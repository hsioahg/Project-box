let date = new Date();
let y = date.getFullYear();
switch (y) {//此处设置的年限是十年
  case 2023:
    y = '二〇二三'
    break;
  case 2024:
    y = '二〇二四'
    break;
  case 2025:
    y = '二〇二五'
    break;
  case 2026:
    y = '二〇二六'
    break;
  case 2027:
    y = '二〇二七'
    break;
  case 2028:
    y = '二〇二八'
    break;
  case 2029:
    y = '二〇二九'
    break;
  case 2030:
    y = '二〇三〇'
    break;
  case 2031:
    y = '二〇三一'
    break;
  case 2032:
    y = '二〇三二'
    break;
  case 2033:
    y = '二〇二三'
    break;
  
  default:
    break;
}
let MM = date.getMonth() + 1;
switch (MM) {
  case 1:
    MM = '一'
    break;
  case 2:
    MM = '二'
    break;
  case 3:
    MM = '三'
    break;
  case 4:
    MM = '四'
    break;
  case 5:
    MM = '五'
    break;
  case 6:
    MM = '六'
    break;
  case 7:
    MM = '七'
    break;
  case 8:
    MM = '八'
    break;
  case 9:
    MM = '九'
    break;
  case 10:
    MM = '十'
    break;
  case 11:
    MM = '十一'
    break;
  case 12:
    MM = '十二'
    break;

  default:
    break;
}
let d = date.getDate();
switch (d) {
  case 1:
    d = '一'
    break;
  case 2:
    d = '二'
    break;
  case 3:
    d = '三'
    break;
  case 4:
    d = '四'
    break;
  case 5:
    d = '五'
    break;
  case 6:
    d = '六'
    break;
  case 7:
    d = '七'
    break;
  case 8:
    d = '八'
    break;
  case 9:
    d = '九'
    break;
  case 10:
    d = '十'
    break;
  case 11:
    d = '十一'
    break;
  case 12:
    d = '十二'
    break;
  case 13:
    d = '十三'
    break;
  case 14:
    d = '十四'
    break;
  case 15:
    d = '十五'
    break;
  case 16:
    d = '十六'
    break;
  case 17:
    d = '十七'
    break;
  case 18:
    d = '十八'
    break;
  case 19:
    d = '十九'
    break;
  case 20:
    d = '二十'
    break;
  case 21:
    d = '二十一'
    break;
  case 22:
    d = '二十二'
    break;
  case 23:
    d = '二十三'
    break;
  case 24:
    d = '二十四'
    break;
  case 25:
    d = '二十五'
    break;
  case 26:
    d = '二十六'
    break;
  case 27:
    d = '二十七'
    break;
  case 28:
    d = '二十八'
    break;
  case 29:
    d = '二十九'
    break;
  case 30:
    d = '三十'
    break;
  case 31:
    d = '三十一'
    break;
  case 32:
    d = '三十二'
    break;
  default:
    break;
}
let time = y + "年" + MM + "月" + d + "日"

export default time