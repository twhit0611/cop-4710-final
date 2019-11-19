// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import Notifications from 'vue-notification'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import * as VueGoogleMaps from 'vue2-google-maps'

import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete';
 
Vue.use(VuetifyGoogleAutocomplete, {
  apiKey: 'Andrew has the key', // Can also be an object. E.g, for Google Maps Premium API, pass `{ client: <YOUR-CLIENT-ID> }`
});

Vue.use(Vuetify)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'Andrew has the key',
    libraries: 'places', 
  },
  installComponents: true
})

Vue.prototype.$http = Axios
Vue.config.productionTip = false
Vue.use(Notifications)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  vuetify: new Vuetify(),
  template: '<App/>'
})
