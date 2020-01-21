import Vue from 'vue'

import Wysiwyg from 'vue-wysiwyg'
import BootstrapVue from 'bootstrap-vue'
import VueFormGenerator from 'vue-form-generator'

import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

import '@/fields'
import '@/firebase'
import '@/utilities'
import '@/registerServiceWorker'

Vue.use(Wysiwyg)
Vue.use(BootstrapVue)
Vue.use(VueFormGenerator)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
