<template>
    <nav-bar></nav-bar>
    <div class="container">
        <FullCalendar></FullCalendar>
    </div>
</template>
<script setup lang="ts">
// import for use on calendar view
import FullCalendar from "./FullCalendar.vue"
</script> 
<style scoped>
.container{
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>