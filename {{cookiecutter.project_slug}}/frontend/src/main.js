import Vue from 'vue'
import store from '@/store'
import router from '@/router'

{% if cookiecutter.api == 'GraphQL' %}
import apolloProvider from '@/services/apollo'
{% elif cookiecutter.api == 'REST' %}
import '@/services/api'
{% endif %}
import { EventBus } from '@/services/EventBus'

{% if cookiecutter.analytics == 'Google Analytics' %}import VueAnalytics from 'vue-analytics'{% endif %}
{% if cookiecutter.analytics == 'Yandex Metrika' %}import VueYandexMetrika from 'vue-yandex-metrika'{% endif %}

import App from '@/App.vue'
import './registerServiceWorker'

Vue.config.productionTip = false

{% if cookiecutter.analytics == 'Google Analytics' %}
// more info: https://github.com/MatteoGabriele/vue-analytics
Vue.use(VueAnalytics, {
  id: process.env.VUE_APP_GOOGLE_ANALYTICS,
  router
})
{% endif %}

{% if cookiecutter.ui == 'Semantic UI' %}
import SuiVue from 'semantic-ui-vue'
Vue.use(SuiVue)
{% elif cookiecutter.ui == 'Bootstrap' %}
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
{% elif cookiecutter.ui == 'Vuetify' %}
import Vuetify from 'vuetify'
Vue.use(Vuetify, {
  // theme: {
  //   'primary': '#112244',
  //   'secondary': '#443200',
  //   'accent': '#009888',
  //   'error': '#b71c1c',
  //   'info': '#2196F3',
  //   'success': '#4CAF50',
  //   'warning': '#FFC107',
  //   'muted': '#B6B6B6'
  // }
})
{% elif cookiecutter.ui == 'Tailwind CSS' %}
import '@/assets/scss/tailwind.css'
{% endif %}

import '@/assets/scss/app.scss'

window.EventBus = EventBus

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.getters['UserModule/token']) {
    // Redirect home
    next({
      name: 'home'
    })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  {% if cookiecutter.api == "GraphQL" %}apolloProvider,{% endif %}
  render: h => h(App)
}).$mount('#app')
