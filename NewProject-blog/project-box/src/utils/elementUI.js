import { Message } from 'element-ui'

/*
 * message消息提醒框防抖处理
 * 参数：
 *    content: 消息文字
 *    mytype: 主题（success(成功消息)/warning(警告消息)/error(错误消息)）
 *    time: 防抖时间
 *    myswitch: 是否开启return（默认关闭）
 */
let state = false
export const msgsuccess = (content, mytype, time, myswitch) => {
  if (state) {
    return
  } else {
    Message({
      message: content,
      type: mytype
    });
    state = true
    window.setTimeout(() => {
      state = false
    },time);
    if (myswitch) {
      return 
    }
  }
}
