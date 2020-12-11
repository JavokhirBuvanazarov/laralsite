require('./bootstrap');
require('admin-lte');

import VueRouter from 'vue-router'
import {Form, HasError, AlertError} from 'vform'
import moment from 'moment'
import VueProgressbar from 'vue-progressbar'
import Swal from 'sweetalert2'
window.Vue = require('vue')
window.Form = Form
window.Swal = Swal
window.Fire = new Vue()

Vue.use(VueRouter)

Vue.use(VueProgressbar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '3px'
})

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

window.toast = Toast


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

Vue.filter('upText', function(text) {
    return text.charAt(0).toUpperCase() + text.slice(1)
})

Vue.filter('customizedDate', function(date) {
    return moment(date).format('D MMMM, YYYY')
})

const app = new Vue({
    el:'#app',
    router
})
