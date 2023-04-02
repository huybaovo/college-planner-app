import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from "vue-router"
import './style.css'
import App from './App.vue'
import LoginVue from './components/Login.vue'
import signupVue from './components/signup.vue'
import HomeMenuVue from './components/HomeMenu.vue'
import TodoVue from './components/Todo.vue'
import CalendarVue from './components/Calendar.vue'
import NavBar from './components/NavBar.vue'
const routes = [
    { path: "/", component: LoginVue },
    {path: "/home", component: HomeMenuVue},
    { path: "/signup", component: signupVue },
    {path: "/todo", component: TodoVue},
    {path: "/calendar", component: CalendarVue}

];
const router = createRouter({ routes, history: createWebHashHistory() });
createApp(App).use(router).component('nav-bar',NavBar).mount('#app')
// const app = createApp({});
// app.component('nav-bar', NavBar);
// app.use(router)
// app.mount('#app');
