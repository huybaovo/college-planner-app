<template>
    <h1 style="color: black">PlannerME</h1>
    <div id="container">
            <input placeholder="Email" type="email" v-model="email">
            <input placeholder="Password" type="password" v-model="password">
        <button type="submit" @click="email_login">Login</button>
        <p>Not Registered? <router-link to="/signup"><b>Create an Account</b></router-link>
 </p>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { auth, app } from '../firebase/firebase';
import {
    UserCredential,
    signInWithEmailAndPassword,
} from "@firebase/auth";

const email = ref('')
const password = ref('')
/**
 * Function to login with email
 */
async function email_login()
{
    try {
        const userCred = await signInWithEmailAndPassword(auth, email.value, password.value)
            .then(() => {
                console.log("signed in")
            })
    }
    catch (e)
    {

    }
   
}
</script>

<style scoped>
#container {
    display: flex;
    flex-direction:column;
    row-gap: 20px;
}

input {
    background-color: white;
    color: black;
    border: none;
    border-radius: 4px;
    width: 100%;
    padding: 2px;
}
button {
    width: 100%;
    margin: 0px;
    padding: 1px;
}
p{
    color: black;
}
::placeholder{
    color: black;
}
</style>