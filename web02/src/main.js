// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// vant ui
import Vant from 'vant';
import 'vant/lib/index.css'
Vue.use(Vant);

// 引入 rem
import './js/rem'

// 引入全局axios
// axios依赖
import axios from './untils/http';
Vue.prototype.http=axios;



// 引入默认清除样式
// import './css/reset.css'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
