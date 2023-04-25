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

// holds data for new course, 2-way binding with input
let newCourse = ref('');
// holds array of Courses (and its deadline)
let courses: Ref<Course[]> = ref([]);
/**
 * Method to add new course from input
 */
function addCourse() {
    //check if new course input is not null
    if (newCourse.value != null && newCourse.value != '') {
        courses.value.push({
            name: newCourse.value,
            assignments: [],
            newAssignment: {
                name: '',
                dueDate: ''
            }
        });
        //adding to firestore
        addCourseFS(db, auth.currentUser?.uid ?? "unknown", newCourse.value)
        newCourse.value = '';
    }
}
/**
 * Function to add assignment to a course
 */
function addAssignment(course: Course) {
    //creating new assignment
    const assignment: Assignment = {
        name: course.newAssignment.name,
        dueDate: course.newAssignment.dueDate
    };
    //adding new assignment to that course
    course.assignments.push(assignment);
    course.newAssignment = {
        name: '',
        dueDate: ''
    };
    //adding assignment to a course in firestore
    addAssignmentFS(db, auth.currentUser?.uid ?? "unknown", course.name, assignment)
}
// List of boolean used for hiding new assignment form
let showAddAssignment: Ref<boolean[]> = ref([]);
/**
 * Function for setting all values of showAddAssignment to false
 */
function initializeShowAddAssignment() {
    showAddAssignment.value = courses.value.map(() => false);
}
/**
 * Function to make sure user wants to delete a course, calls deleteCourse
 */
function confirmDeleteCourse(course: Course) {
    if (confirm(`Are you sure you want to delete the ${course.name} courses?`)) {
        deleteCourse(course)
    }
}
/**
 * Function to delete a course and all its assignments
 */
function deleteCourse(course: Course) {
    //location of a course
    const index = courses.value.indexOf(course);
    if (index !== -1) {
        courses.value.splice(index, 1);
        //calling firebase to remove that Course
        deleteCourseFS(db, auth.currentUser?.uid ?? "unknown", course.name)
    }
}
/**
 * Function to make sure user wants to delete an assignment
 */
function confirmDeleteAssignment(course: Course, assignment: Assignment) {
    if (confirm(`Are you sure you want to delete this assignment?`)) {
        deleteAssignment(course, assignment)
    }
}
/**
 * Function to delete the assignment
 */
function deleteAssignment(course: Course, assignment: Assignment) {
    const index = course.assignments.indexOf(assignment)
    course.assignments.splice(index, 1)
    deleteAssignmentFS(db, auth.currentUser?.uid ?? "unkown", course.name, assignment.name)

}

/**
 * getting courses and assignments from the firestore, initalizing showAddAssignment array to False
 */
onMounted(async () => {
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
  

  