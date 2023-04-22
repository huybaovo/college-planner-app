<!-- Early setup of the calendar, will change lateron-->
<template>
    <nav-bar></nav-bar>
    <div class="container">
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
</style>