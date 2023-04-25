<script setup lang="ts">
import { ref } from "vue";
import { auth, app } from '../firebase/firebase';
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signOut,
} from "firebase/auth";
import { useRouter } from "vue-router";
// used for routing users 
const router = useRouter();
// holds value of email from input
const email = ref('')
// holds value of pass from input
const password = ref('')
// holds value of second pass from input
const confirmPass = ref('')
// used for hiding and showing an element in display
const emailSent = ref(false)
/**
 * function to signup with email
 */
async function email_signup() {
  // Check if confirmation is the same as password
  if (!(confirmPass.value === password.value)) {
    console.log("Confirmation does not match Password");
  } else {
    try {
      // attempt to create user
      const cred = await createUserWithEmailAndPassword(auth, email.value, password.value);

      // Send email verification
      if (cred.user) {
        // send email verification
        await sendEmailVerification(cred.user);
        emailSent.value = true;
      }
      // log out user
      await signOut(auth);
    } catch (err) {
      console.error("An error has occured.", err);
    }
  }
}
</script>
<template>
  <div class="wrapper">
    <h1>Register</h1>
    <div class="container">
      <div v-if="emailSent">
        <p>Thank you for signing up! Please check your email and confirm your account.</p>
        <router-link to="/"><b>Go back to the login page</b></router-link>
      </div>
      <div v-else>
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
        <p>Already have an account? <router-link to="/"><b>Click here</b></router-link> to go back.</p>
      </div>
    </div>
  </div>
</template>

<!-- Add your existing styles here -->

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