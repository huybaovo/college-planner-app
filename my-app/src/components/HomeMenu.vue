<template>
    <div id="menu-container">
        <div id="navbar">
            <button type="submit" @click="logout"></button>
        </div>
        <div id="display">
            <div id="section1">
                <h4>Welcome {{ user }} </h4>
            </div>
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
const user = auth.currentUser?.email
const router = useRouter();

function logout() {
    auth.signOut();
    router.push({path: "/"})
}
</script>

<style scoped>

#navbar{
    display:flex;
    color:steelblue;
    
}
</style>