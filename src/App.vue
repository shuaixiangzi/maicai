<!--
 * @Author: 翟海祥
 * @Date: 2020-04-07 09:02:47
 * @LastEditTime: 2020-04-09 14:47:41
 * @LastEditors: 翟海祥
 * @Description:
 * @FilePath: \maicai\src\App.vue
 -->
<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */

    let logs
    if (mpvuePlatform === 'my') {
      logs = mpvue.getStorageSync({key: 'logs'}).data || []
      logs.unshift(Date.now())
      mpvue.setStorageSync({
        key: 'logs',
        data: logs
      })
    } else {
      logs = mpvue.getStorageSync('logs') || []
      logs.unshift(Date.now())
      mpvue.setStorageSync('logs', logs)
    }
  },
  log () {
    console.log(`log at:${Date.now()}`)
  }
}
</script>

<style>
@import url('../static/icon/stylesheet.css');
view,input,p,div,span{
  font-size: 12px;
  color:inherit;
}

.price{
  color: rgba(255, 146, 59, 1);
}

page{
   color: #333;
}

.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
  font-size: 14px;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}

.clearfix:after {
   content:"";
   display: block;
   clear:both;
}

.fl{
  float: left;
}

.fr{
  float: right;
}
</style>
