// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUILocaleRu from 'element-ui/lib/locale/lang/ru-RU'
import VueI18n from 'vue-i18n'
import {
  messages
} from './i18n/messages'

Vue.use(VueI18n)
Vue.use(ElementUI, {
  locale: ElementUILocaleRu,
  size: 'mini'
})

const possibleLangs = Object.keys(messages)

function detectLanguage () {
  const nav = window.navigator
  const langs = nav.languages || (nav.userLanguage ? [nav.userLanguage] : [])
  const findLang = langs.find(lang => possibleLangs.indexOf(lang) >= 0)
  return findLang || 'en'
}

const initLang = detectLanguage()
Vue.prototype.$allLangs = possibleLangs
Vue.prototype.$initLang = initLang

const i18n = new VueI18n({
  locale: initLang, // set locale
  fallbackLocale: 'en',
  messages // set locale messages
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  i18n
})
