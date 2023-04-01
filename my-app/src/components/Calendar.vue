<!-- Early setup of the calendar, will change lateron-->
<template>
    <div class="container">
        <div id="navbar">
            <button type="submit" @click="goBack">Go Back</button>    
        </div>
        <table id="calendar">
            <tr>
                <th>Sunday</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
                <th>Saturday</th>
            </tr>
            <tr>
                <td>Hello</td>
                <td>Hello</td>
                <td>Hello</td>
                <td>Hello</td>
                <td>Hello</td>
                <td>Hello</td>
                <td>Hello</td>
            </tr>
            <tr>
                <td>Hello</td>
                <td>Hello</td>
                <td>Hello</td>
                <td>Hello</td>
                <td>Hello</td>
                <td>Hello</td>
                <td>Hello</td>
            </tr>
            <tr>
                <td>Hello</td>
                <td>Hello</td>
                <td>Hello</td>
                <td>Hello</td>
                <td>Hello</td>
                <td>Hello</td>
                <td>Hello</td>
            </tr>
            <tr>
                <td>Hello</td>
                <td>Hello</td>
                <td>Hello</td>
                <td>Hello</td>
                <td>Hello</td>
                <td>Hello</td>
                <td>Hello</td>
            </tr>
            <tr>
                <td>Hello</td>
                <td>Hello</td>
                <td>Hello</td>
                <td>Hello</td>
                <td>Hello</td>
                <td>Hello</td>
                <td>Hello</td>
            </tr>
        </table>
        <div id="display">
            <div id="course-form">

            </div>
            <div id="time-selector">
                
            </div>
        </div>
    </div>
    
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { db } from "../firebase/firebase";
import { setDoc } from "firebase/firestore" // use later
// Store calendar eventually into document
const router = useRouter();

// to be added later
function addToCalendar() {
    return;
}

function goBack() {
    router.push({path: "/home"});
}
</script> 
<style scoped>
.container{
    height: 100%;
    justify-content: center;
}

#navbar{
    background-color: #3e363fcb;
    display:flex;
    min-width: 100%;
    justify-content: start;
    align-items: center;
}

#calendar{
    min-height: 50%;
    min-width: 100%;
    justify-content: space-evenly;
}

#display{
    display: flex;
    min-height: fit-content;
}

button{
    border:none;
    background-color: transparent;
}

th{
    text-align: center;
}

tr{
    text-align: center;
    justify-content: space-evenly;
    align-items: center;
}
</style>