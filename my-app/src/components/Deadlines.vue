<!-- presetup -->
<template>
<nav-bar></nav-bar>
  <div class="container">
    <div class="course_display" v-for="(course, index) in courses" :key="index">
        <h2>{{ course.name }}</h2>
        <ul>
          <li v-for="assignment in course.assignment" >
            {{ assignment }}
          </li>
        </ul>
        <div>
            <input placeholder="assignment">
            <input type="datetime-local" >
            <button @click="addAssignment(course)" >+</button>
        </div>
    </div>
    <div class="add_course">
        <input v-model="course">
        <button @click="addCourse">Add Course</button>
    </div>
  </div>
</template>


<script setup lang="ts">
import { Ref, ref } from 'vue';

type Course = {
    name: String,
    assignment: string[]
}
const course = ref('')
let courses: Ref<Course[]>= ref([])
function addCourse()
{
    const newCourse: Course = {name: course.value, assignment: []}
    courses.value.push(newCourse)
}
function addAssignment(course)
{
    course.assignment.push("hello")
}
</script>
<style scoped>
hr { background-color: rgb(21, 2, 2); height: 2px; border: 0; }

*{
    background-color: inherit;
}
.container{
    
    height: 100vh;
}
.course_display{
}
.add_course{
    display: flex;
    flex-direction: column;
    align-items: center;
    
    }
</style>


