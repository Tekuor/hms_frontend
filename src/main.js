import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import VueRouter from 'vue-router';

import routes from './routers';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(require('vue-moment'));

const router = new VueRouter({routes});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

