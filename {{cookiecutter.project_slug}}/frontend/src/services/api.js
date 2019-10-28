import Vue from 'vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

import CONSTANTS from '@/services/config'

const apiAxios = axios.create({
  baseURL: CONSTANTS.BASE_URL
})

Vue.use(VueAxios, apiAxios)