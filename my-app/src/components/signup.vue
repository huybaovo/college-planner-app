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
const email = ref('')
const password = ref('')
const confirmPass = ref('')
function email_signup()
{
    // Check if confirmation is the same as password
    if(!(confirmPass.value === password.value)) {
        console.log("Confirmation does not match Password");
    } else {
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((cred: UserCredential) => {
        auth.signOut();
        router.push({path: "/"})
        console.log("sign up successfull")
    })
    .catch((err: any) => {
        console.error("An error has occured.",err);
    });}
}
</script>
<template>
    <div class="wrapper">
        <h1>Register</h1>
        <div class="container">
                <div>
                    <div>
                        <label>Email </label>
                        <small>e.g johndoe@gmail.com</small>
                        <input v-model="email" type="email">
                    </div>
                    <div>
                        <label>Password: </label>
                        <small>e.g Must be 6 characters long.</small>
                        <input v-model="password" type="password">
                    </div>
                    <div>
                        <label>Confirm Password</label>
                        <input v-model="confirmPass" type="password">
                    </div>
                    <button @click="email_signup">Register</button>

                </div>
                <p>Already have an account? <router-link to="/"><b>Click here</b></router-link> to go back.</p>
        </div>
    </div>
</template>
<style scoped>
.wrapper{
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.container{
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 1em;
}
button{
    margin-top: 20px;
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
small{
    color: rgb(99, 98, 98);
}
p{
    color: black;
}
h1{
    text-align: center;
    margin-top: 0px;
    color: #3E363F;
}

</style>