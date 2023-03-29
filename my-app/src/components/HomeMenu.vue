<template>
    <div id="display">
        <div id="sectoion1">
            <h4>Welcome {{ user }} </h4>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {auth} from "../firebase/firebase"
// will be used for home page later
const user = auth.currentUser?.email
</script>

<style scoped>
</style>