<template>
    <div class="wrapper">
        <h1>PlannerME</h1>
        <div class="login_wrapper">
            <div id="container">
                <div>
                    <label>Email</label>
                    <input type="email" v-model="email">
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" v-model="password">
                </div>
                <button type="submit" @click="email_login">Login</button>
                <p v-if="errorMessage" class="error">{{ errorMessage }} <span v-if="errorMessage">
                    <a href="#" @click.prevent="resendEmailVerification" class="resend-link">Resend email verification</a>
                </span></p>
                
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
import { sendEmailVerification } from "firebase/auth";
//router to send user to another component/view
const router = useRouter()
// holds email value from input
const email = ref('')
// holds password value from input
const password = ref('')
// holds error message for display if a user hasn't confirmed email
const errorMessage = ref("");
/**
 * Function to login user with email and password
 */
async function email_login() {
    try {
        // call firebase auth
        const userCred = await signInWithEmailAndPassword(auth, email.value, password.value);
        // check if user is valid and verified
        if (userCred.user && userCred.user.emailVerified) {
             router.push("/home");
        } else {
            errorMessage.value = "Email not verified. Please check your email and verify your account.";
        }
    } catch (e) {
        errorMessage.value = "Password or email is incorrect. Please try again.";
    }
}
/**
 * Function to resend email verification
 */
async function resendEmailVerification() {
  try {
    const user = auth.currentUser;
    if(!user){
        throw Error("User is not logged in.")
    }
    //send email verification
    await sendEmailVerification(user);
    errorMessage.value = "Email verification link has been sent. Please check your email.";
  } catch (e) {
    errorMessage.value = "An error occurred while sending the email verification link. Please try again.";
  }
}
</script>
  
<style scoped>
h1 {
    text-align: center;
    margin-top: 0px;
}

.wrapper {
    height: 100vh;
    display: flex;
    place-items: center;
    flex-direction: column;
    justify-content: center;
}

.login_wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60vh;
}

#container {
    display: flex;
    flex-direction: column;
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

p {
    color: rgb(255, 255, 255);
    text-align: center;
}

label {
    color: #3E363F;
}

body {
    margin: auto;
    max-width: 500px;
}

.error {
    color: red;
    text-align: center;
    margin-top: 1em;
}
.resend-link {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
</style>
  