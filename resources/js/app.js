require('./bootstrap');
require('admin-lte');

import VueRouter from 'vue-router'
import {Form, HasError, AlertError} from 'vform'

window.Vue = require('vue')
window.Form = Form

Vue.use(VueRouter)
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
Vue.component('example-component', require('./components/Profile.vue'))

const routes = [
    {path: '/dashboard', component: require('./components/Dashboard.vue').default},
    {path: '/profile', component: require('./components/Profile.vue').default},
    {path: '/users', component: require('./components/Users.vue').default},
]

const router = new VueRouter({
    mode: 'history',
    routes
})

const app = new Vue({
    el:'#app',
    router
})
