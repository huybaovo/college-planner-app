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

signInWithEmailAndPassword(auth, "", "")
    .then((cred: UserCredential) => {
        
    })
    .catch((err: any) => {
        console.error("Error has occured.",err);
    });
</script>
<template>
    <h1>Schedule Login</h1>
    <div id="container">
        <div id="sign-in">
            <label>Email:</label>
            <input>
            <label>Password:</label>
            <input>
        </div>
    </div> 
</template>
<style scoped>
.container{
    display: flex;
}
.sign-in{
    flex: 1;
    width: 100%;
}
input {
    margin: 0.25em;
    align-self: stretch;
}
</style>