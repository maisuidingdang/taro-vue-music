import Vue from 'vue'
import store from '@/store'

import '@/utils/moment'

// import "/taro-ui-vue/dist/style/variables/default.scss";
import '@/assets/fonts/iconfont.css'
import './app.scss'
// import "taro-ui-vue/dist/style/index.scss"; 
Vue.config.devtools = true;

const App = new Vue({
  // onShow (options) {
  //   console.log('app onshow',options)
  // },
  store,
  render(h) {
    // this.$slots.default 是将要会渲染的页面
    return h('block', this.$slots.default)
  }
})

export default App
