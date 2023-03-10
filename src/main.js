// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue';
import { BPagination } from 'bootstrap-vue'
import * as VueGoogleMaps from 'vue2-google-maps';
import VueTouch from 'vue-touch';
import Trend from 'vuetrend';
import Toasted from 'vue-toasted';
import VueApexCharts from 'vue-apexcharts';

import store from './store';
import router from './Routes';
import App from './App';
import layoutMixin from './mixins/layout';
import Widget from './components/Widget/Widget';
import axios from 'axios';

/*
const cors = require('cors');
Vue.use(cors({origin: ['http://localhost:3000']},))
*/

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueTouch);
Vue.use(Trend);
Vue.component('Widget', Widget);
Vue.component('b-pagination', BPagination)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB7OXmnnnnnnnnnnnnnnzfQYua_1LEhRdqsoYzyJOPh9hGLg',
  },
});
Vue.component('apexchart', VueApexCharts);
Vue.mixin(layoutMixin);
Vue.use(Toasted, {duration: 10000});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  axios,
  render: h => h(App),
});
