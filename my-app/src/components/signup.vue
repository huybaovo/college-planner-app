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

createUserWithEmailAndPassword(auth, "", "")
    .then((cred: UserCredential) => {
        auth.signOut();
    })
    .catch((err: any) => {
        console.error("An error has occured.",err);
    });
</script>
<template>
    <h1>Register</h1>
    <div class="container">
            <div>
                <label>First Name</label>
                <input placeholder="First Name">
                <label>Last Name</label>
                <input placeholder="Last Name">
            </div>
            <div>
                <label>Email</label>
                <input placeholder="Email">
                <label>Password</label>
                <input placeholder="Password">
            </div>
    </div>  
</template>
<style scoped>
.container{
    display: flex;
    flex-direction: column;
}
.sign_up{
    flex: 1;
    width: 100%;
}

input {
    width: 100%;
}
label{
    text-align: left;
}


</style>