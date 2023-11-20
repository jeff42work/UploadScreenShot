import Vue from 'vue'
import App from './App.vue'

import CoreuiVue from "@coreui/vue";

Vue.config.productionTip = false
Vue.use(CoreuiVue);

new Vue({
  render: h => h(App),
}).$mount('#app')
