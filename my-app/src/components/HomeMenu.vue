<template>
        <div class="wrapper">
            <div id="navbar">
                <span>{{user }}</span>
                <router-link to="/todo">ToDo</router-link>
                <button type="submit" @click="logout">Logout</button>
            </div>
            <div id="display">
                <h3>Welcome {{ user }} </h3>
                <div id="section2">
                    <h4>What would you like to do today?</h4>
                </div>
            </div>
        </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import {auth} from "../firebase/firebase"
// will be used for home page later
const user = auth.currentUser?.email?.split("@")[0]
const router = useRouter();

function logout() {
    auth.signOut();
    router.push({path: "/"})
}
</script>

<style scoped>
.wrapper{
    height: 100vh;
}

#navbar{
    background-color: rgba(89, 89, 90, 0.83);
    display:flex;
    min-width: 100%;
    justify-content:space-evenly;
    align-items:center;
}
h3,h4{
    text-align: center;
}
span{
    margin: 0;
    color: white;
}
</style>