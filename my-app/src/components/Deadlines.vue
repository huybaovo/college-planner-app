<template>
    <nav-bar></nav-bar>
    <div class="container">
        <div class="course_container">
            <div class="course_display" v-for="(course, index) in courses" :key="index">
                <h2 @click="confirmDeleteCourse(course)">{{ course.name }}</h2>
                <ul>
                    <li @click="confirmDeleteAssignment(course, assignment)" v-for="assignment in course.assignments">
                        {{ assignment.name }} - {{ assignment.dueDate }}
                    </li>
                </ul>
                <button class="assignment_btn" @click="showAddAssignment[index] = true"> ADD assignment</button>
                <div>
                    <div v-if="showAddAssignment[index]">
                        <input v-model="course.newAssignment.name" placeholder="assignment">
                        <input v-model="course.newAssignment.dueDate" type="datetime-local">
                        <button class="assignment_btn" @click="addAssignment(course)">+</button>
                        <button class="assignment_btn" @click="showAddAssignment[index] = false">Cancel</button>
                    </div>
                </div>
                <hr>
            </div>
        </div>
        <div class="add_course">
            <input v-model="newCourse">
            <button @click="addCourse">Add Course</button>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { Ref, onBeforeMount, onMounted, ref } from 'vue';
import { Course, Assignment } from '../types'
import { addCourseFS, addAssignmentFS, getCourses, deleteCourseFS, deleteAssignmentFS } from '../firebase/func_firebase';
import { db, auth } from '../firebase/firebase';

let newCourse = ref('');
let courses: Ref<Course[]> = ref([]);

function addCourse() {
    if (newCourse.value != null && newCourse.value != '') {
        courses.value.push({
            name: newCourse.value,
            assignments: [],
            newAssignment: {
                name: '',
                dueDate: ''
            }
        });
        addCourseFS(db, auth.currentUser?.uid ?? "unknown", newCourse.value)
        newCourse.value = '';
    }
}

function addAssignment(course: Course) {
    const assignment: Assignment = {
        name: course.newAssignment.name,
        dueDate: course.newAssignment.dueDate
    };
    course.assignments.push(assignment);
    course.newAssignment = {
        name: '',
        dueDate: ''
    };
    addAssignmentFS(db, auth.currentUser?.uid ?? "unknown", course.name, assignment)
}

let showAddAssignment: Ref<boolean[]> = ref([]);

function initializeShowAddAssignment() {
    showAddAssignment.value = courses.value.map(() => false);
}

function confirmDeleteCourse(course: Course) {
    if (confirm(`Are you sure you want to delete the ${course.name} courses?`)) {
        deleteCourse(course)
    }
}

function deleteCourse(course: Course) {
    const index = courses.value.indexOf(course);
    if (index !== -1) {
        courses.value.splice(index, 1);
        deleteCourseFS(db, auth.currentUser?.uid ?? "unknown", course.name)
    }
}
function confirmDeleteAssignment(course: Course, assignment: Assignment) {
    if (confirm(`Are you sure you want to delete this assignment?`)) {
        deleteAssignment(course, assignment)
    }
}

function deleteAssignment(course: Course, assignment: Assignment) {
    const index = course.assignments.indexOf(assignment)
    course.assignments.splice(index, 1)
    deleteAssignmentFS(db, auth.currentUser?.uid ?? "unkown", course.name, assignment.name)

}


onMounted(async () => {
    //retrieve courses
    const copyArray = await getCourses(db, auth.currentUser?.uid ?? "unknown");
    courses.value = [...copyArray];
    initializeShowAddAssignment();


});
</script>

  
<style scoped>
.assignment_btn {
    background-color: rgba(255, 255, 255, 0.288);
}

input {
    outline: none;
    border: 1px solid black;
    color: black;
}

* {
    background-color: inherit;
}

button {
    border: 2px solid rgba(0, 0, 0, 0.197);
    background-color: black;
}

.container {
    margin: 2%;
    height: 100vh;
    position: relative;
    /* add this to make the .add_course position relative to .container */
}

.course_display {
    margin-bottom: 2%;
    flex: 1;
}

.course_container{
    display: flex;
    flex-direction: column;
}

.add_course {
    position: fixed;
    /* add this to fix the position of the element */
    left: 50%;
    /* adjust this to center the element horizontally */
    transform: translateX(-50%);
    /* add this to center the element horizontally */
    bottom: 20px;
    /* adjust this to set the distance from the bottom of the screen */
    display: flex;
    flex-direction: column;
    row-gap: 0.5em;
    align-items: center;
}

h2:hover {
    cursor: pointer;
    font-weight: 800;
}

input::placeholder {
    color: black;
}

h2 {
    text-decoration: underline;
    margin: 0;
}
hr{
    border: 1px solid rgb(201, 199, 199);
}
li {
    cursor: pointer;
}
</style>
  

  