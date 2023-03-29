<script setup lang="ts">
import { ref } from "vue";
import { auth, app } from '../firebase/firebase';
import {
    getAuth,
    Auth,
    GoogleAuthProvider,
    signInWithPopup,
    UserCredential,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GithubAuthProvider,
    sendEmailVerification,
    signOut,
    signInWithRedirect,
    sendPasswordResetEmail,
} from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref('')
const email = ref('')
const password = ref('')
function email_signup()
{
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((cred: UserCredential) => {
        auth.signOut();
        router.push({path: "/"})
        console.log("sign up successfull")
    })
    .catch((err: any) => {
        console.error("An error has occured.",err);
    });}
</script>
<template>
    <h1>Register</h1>
    <div class="container">
            <div>
                <div>
                    <label>Username</label>
                    <input v-model="username" placeholder=" johndoe">
                </div>
                <div>
                    <label>Email</label>
                    <input v-model="email" type="email" placeholder=" johndoe@gmail.com">
                </div>
                <div>
                    <label>Password</label>
                    <input v-model="password" type="password" placeholder=" password">
                </div>
            </div>
            <button @click="email_signup">Register</button>
    </div>  
</template>
<style scoped>


.container{
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 1em;
}

input {
    width: 100%;
    color: black;
    background-color: white;
    border: none;
    border-radius: 4px;
    padding: 2px;
}
label{
    text-align: left;
    color: black;

}
::placeholder{
    color: black;
}
button{
    width: 100%;
}



</style>