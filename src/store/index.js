import Vue from 'vue'
import Vuex from 'vuex'
import WidgetModule from '@/store/modules/widget.module'

Vue.use(Vuex)
Vue.config.devtools = true

export default new Vuex.Store({
  modules: {
    WidgetModule,
  }
});
