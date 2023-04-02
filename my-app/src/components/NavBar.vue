<template>
        <div id="navbar">
            <router-link to="/home">Home</router-link>
            <router-link to="/calendar">Calendar</router-link>
            <a>Deadlines</a>
            <router-link to="/todo">To-do</router-link>
            <button type="submit" @click="logout">Logout</button>
        </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { auth } from '../firebase/firebase';

const router = useRouter()

function logout() {
    auth.signOut();
    router.push({path: "/"})
}
</script>

<style scoped>
a:hover, button:hover{
    text-decoration: underline;
    text-decoration-color:white;
    text-decoration-thickness: 2px;
}

.router-link-active{
    font-weight: bold;
    text-decoration: underline;
    text-decoration-color: #90AFC5;
    text-decoration-thickness: 2px;
}
button{
border: none;
background-color: transparent;

}
a, button{
color: white;
font-size: 1.2em;
}
#navbar{
background-color: #3e363fcb;
display:flex;
min-width: 100%;
min-height: 6vh;
justify-content:space-evenly;
align-items:center;
}
</style>