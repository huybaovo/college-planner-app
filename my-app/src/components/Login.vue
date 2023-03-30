<template>
    <div class = "wrapper">
        <h1 style="color: black">PlannerME</h1>
        <div class="login_wrapper">
            <div id="container">
                <div>
                    <label>Email</label>
                    <input  type="email" v-model="email">
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" v-model="password">
                </div>
                <button type="submit" @click="email_login">Login</button>
                <p>Not Registered? <router-link to="/signup"><b>Create an Account</b></router-link></p>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { auth, app } from '../firebase/firebase';
import {
    UserCredential,
    signInWithEmailAndPassword,
} from "@firebase/auth";
import { useRouter } from "vue-router";
const router = useRouter()
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
                router.push("/home")
            })
    }
    catch (e)
    {
        console.error("Password or email is incorrect. Please try again.")
    }
   
}
</script>

<style scoped>
h1{
    text-align: center;
    margin-top: 0px;
}
.wrapper{
    height: 100vh;
    display: flex;
    place-items: center;
    flex-direction: column;
    justify-content: center;
}
.login_wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60vh;
}
#container {
    display: flex;
    flex-direction:column;
    justify-content: center;
    row-gap: 0px;
    width: 90%;
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
    margin-top: 1em;
}
p{
    color: black;
    text-align: center;
}
label{
    color: black;
}

body{
    margin: auto;
    max-width: 500px;
}
</style>