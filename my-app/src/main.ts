import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from "vue-router"
import './style.css'
import App from './App.vue'
import LoginVue from './components/Login.vue'
import signupVue from './components/SignUp.vue'
import HomeMenuVue from './components/HomeMenu.vue'
const routes = [
    { path: "/", component: LoginVue },
    {path: "/home", component: HomeMenuVue},
    { path: "/signup", component: signupVue }

];
const router = createRouter({ routes, history: createWebHashHistory() });
createApp(App).use(router).mount('#app')
