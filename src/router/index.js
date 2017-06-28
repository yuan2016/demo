import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

const home = r => require.ensure([], () => r(require('../components/home/home')), 'home')
const data = r => require.ensure([], () => r(require('../components/data/data')), 'data')

Vue.use(Router)

export default [{
  path: '/',
  component: App,
  children: [{path: '', redirect: '/home'},
    { path: '/home', component: home },
    { path: '/data', component: data }
  ]
}]
