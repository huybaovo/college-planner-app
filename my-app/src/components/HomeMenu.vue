<template>
        <div class="wrapper">
            <nav-bar></nav-bar>
            <div id="display">
                <h1>WELCOME {{ user }} </h1>
                <div class="container">
                    <div class="upcomingEvents border box_one">
                        <h2>UPCOMING CALENDAR EVENT</h2>
                        <ul>
                            <li v-for="(item, index) in calendar">
                               <b> {{ item.start?.toLocaleString() }} </b> - <b>{{ item.end?.toLocaleString() }} </b> : <i>{{ item.title }}</i>
                            </li>
                        </ul>
                    </div>
                    <div class="upcomingDeadlines border box_two">
                        <h2>DEADLINES</h2>
                            <h3 style="text-align: left; margin-left: 1em;" v-for="(item, index) in deadlines">
                                <b>{{ item.name }} </b>
                                <ul>
                                <li v-for="(assignment, index) in item.assignments">
                                    {{ assignment.name }} -- {{ new Date(assignment.dueDate).toLocaleString('en-US', { year: 'numeric',month: 'short', day: '2-digit', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })}}
                                </li>
                                </ul>
                            </h3>
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
// parses user name and remove @
const user = auth.currentUser?.email?.split("@")[0]
// list to hold Courses and its deadline
let deadlines = ref<Course[]>([])
// list to hold Calendar events
let calendar = ref<EventInput[]>([])
//observer for if a user logs in
onAuthStateChanged(auth, (user) => {
    if (user) {
        //calls a function to make a collection for that particular user which will be used to store history
        createAccount(db, user.uid)
    }

})
/**
 * retrieves courses deadlines and calendar from the firestore
 */
onMounted(async () => {
    let list = await fetchCalendarEvents(db, auth.currentUser?.uid ?? "unknown")
    //sorts date 
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
    border: 1px solid rgb#90afc5;
    flex-basis: 50%;
}
.box_one{
    box-shadow: 2px 2px 5px #33566f;

}
.box_two{
    box-shadow: -2px 2px 5px  #33566f;

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

h1{
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    color: white;
    font-size:xx-large;
}
span{
    margin: 0;
    color: white;
}

</style>