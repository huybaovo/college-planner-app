<!-- Early setup of the calendar, will change lateron-->
<template>
    <nav-bar></nav-bar>
    <div class="container">
        <div id="header"><h1>My Calendar</h1></div>
        <FullCalendar></FullCalendar>
    </div>
</template>
<script setup lang="ts">
// FullCalendar Third-Party Library
import FullCalendar, { createEventId } from "./FullCalendar.vue";
//Firebase
import { db } from "../firebase/firebase";
import { setDoc } from "firebase/firestore";
import { Calendar } from "@fullcalendar/core";

</script> 
<style scoped>
.container{
    height: 100%;
    justify-content: center;
}


#header{
    width: 100%;
    justify-content: center;
    align-items: center;
}

h1{
    text-align: center;
    color: white;
}
</style>