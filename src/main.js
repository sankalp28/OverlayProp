import Vue from 'vue'
// import App from './App.vue'
import OverlayScreen from '@/screen/OverlayScreen.vue';
import VueDraggableResizable from 'vue-draggable-resizable'
import store from './store'
// optionally import default styles
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
import "@/assets/style.css";
import "@/assets/css/shape-widget.css";

import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
Vue.component('vue-draggable-resizable', VueDraggableResizable)
Vue.config.productionTip = false
Vue.use(ElementUI, { locale });

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
  store,
  render: h => h(OverlayScreen),
}).$mount('#app')
