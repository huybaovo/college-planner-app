<template>
        <div class="wrapper">
            <nav-bar></nav-bar>
            <div id="display">
                <h2>WELCOME {{ user }} </h2>
        
                <div id="section2">
                    <h5>CLASS SCHEDULE</h5>
                    <h5>UPCOMING EVENTS</h5>


                </div>
            </div>
        </div>
</template>

<script setup lang="ts">
import Todo from "./Todo.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import {auth, db} from "../firebase/firebase"
import { onAuthStateChanged } from "@firebase/auth";
import { createAccount } from "../firebase/func_firebase";
// will be used for home page later
const user = auth.currentUser?.email?.split("@")[0]
//observer for if a user logs in
onAuthStateChanged(auth, (user) => {
    if (user) {
        //calls a function to make a collection for that particular user which will be used to store history
        createAccount(db, user.uid)
    }

})
</script>

<style scoped>
.wrapper{
    height: 100vh;
}
#display{
    margin: 2%;
}
h1,h2, h3,h4{
    text-align: center;
}
span{
    margin: 0;
    color: white;
}

</style>