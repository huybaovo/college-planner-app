<template>
        <div class="wrapper">
            <nav-bar></nav-bar>
            <div id="display">
                <h2>WELCOME {{ user }} </h2>
                <div class="container">
                    <div class="upcomingEvents border">
                        <h3>UPCOMING EVENTS</h3>
                        <ul>
                            <li v-for="(item, index) in calendar">
                                {{ item.start?.toLocaleString() }} -- {{ item.end?.toLocaleString() }} : {{ item.title }}
                            </li>
                        </ul>
                    </div>
                    <div class="upcomingDeadlines border">
                        <H3>UPCOMING DEADLINES</H3>
                        <ul>
                            <li v-for="(item, index) in deadlines">
                                <b>{{ item.name }} </b>
                                <ul>
                                <li v-for="(assignment, index) in item.assignments">
                                    {{ assignment.name }} -- {{ assignment.dueDate }}
                                </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                  


                </div>
            </div>
        </div>
</template>

<script setup lang="ts">
import Todo from "./Todo.vue";
import { Ref, onBeforeMount, onMounted, ref } from "vue";
import {Course} from '../types'
import { useRouter } from "vue-router";
import {auth, db} from "../firebase/firebase"
import { onAuthStateChanged } from "@firebase/auth";
import { createAccount, fetchCalendarEvents, getCourses } from "../firebase/func_firebase";
import { EventInput } from "@fullcalendar/core";
// will be used for home page later
const user = auth.currentUser?.email?.split("@")[0]

let deadlines = ref<Course[]>([])
let calendar = ref<EventInput[]>([])
//observer for if a user logs in
onAuthStateChanged(auth, (user) => {
    if (user) {
        //calls a function to make a collection for that particular user which will be used to store history
        createAccount(db, user.uid)
    }

})
onMounted(async () => {
    //retrive todos

    let list = await fetchCalendarEvents(db, auth.currentUser?.uid ?? "unknown")
    list.sort((a,b) => a.start.getTime() - b.start.getTime()).filter((a) => a.start > new Date())
    calendar.value = [...list]
    //retrieve courses
    const list2 = await getCourses(db, auth.currentUser?.uid ?? "unknown");
    deadlines.value = [...list2];
})
</script>

<style scoped>
.container{
    display: flex;
    justify-content:space-around;
    column-gap: 2%;

    
}
.border{
    border: 1px solid black;
    flex-basis: 50%;
}
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