<template>
<div class="wrapper">
    <nav-bar></nav-bar>
    <h1>To Do</h1>
    <div class="to-do-list">
        <ul>
            <li v-on:click="remove_task($event)" v-for="(item,index) in todos" :id="item.id">{{ item.task }} </li>
            <input v-model="new_task" type="text" @keydown.enter="add_task" placeholder="Enter a new task">
        </ul>
    </div>
</div>

</template>
<script setup lang="ts">
import { Ref, onBeforeMount, ref } from 'vue';
import { toDo } from '../types';
import { db, auth} from '../firebase/firebase';
import { addToDo, getTodos, removeToDo } from '../firebase/func_firebase';
import * as dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
//retrieve saved todos from firestore
let todos= ref<{
    date: string;
    task: string;
    id: string;
}[]>([]);

const new_task = ref('')
/**
 * function to add task 
 */
    
async function add_task()
{
    //save todos to firestore
    if (new_task.value != "" && auth.currentUser)
    {
        const task = {
            date: (dayjs.utc(dayjs.utc().format())).toString(),
            task: new_task.value,
            id: ''
        }
        task.id = await addToDo(db, auth.currentUser.uid, {
            date: (dayjs.utc(dayjs.utc().format())).toString(),
            task: new_task.value
        }
        );
        todos.value.push(task)
        console.log(todos.value)
        new_task.value = ''
    }
}
function remove_task(event: MouseEvent)
{
    const target = event.target
    if (target instanceof HTMLElement)
    {
        target.classList.add("cross")
        removeToDo(db, auth.currentUser?.uid ?? "unknown", target.id)
        target.remove()
    }
   

}
onBeforeMount(async () => {
    //retrive todos
    const list = await getTodos(db, auth.currentUser?.uid ?? "unknown")
    todos.value = [...list]
})
</script>
<style scoped>

.to-do-list{
    width: 80%;
}
::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: black;
  opacity: 1; /* Firefox */
}
.wrapper{
    height: 100vh;
    margin: 0px;
    padding: 0;
    color:white;
    display: flex;
    align-items: center;
    flex-direction: column;
}
h1{
    margin-top: 0px;
    padding-top: 1em;
    text-align: center;
}
input{
    background: none;
    border-style:  none none solid none;
    border-color: white;
    border-width: 1px;
    width: 95%;
    outline: none;
    color: black

}
li:hover{
    
}
input:focus{
    transform: scale(1.1);
    overflow: hidden;
}

li{
    color: black;
    list-style:none;
    border-style: none none double none;
    padding: 1px;
    width: 95%;
}
li:nth-child(n + 1)
{
    margin-top: 2px;
}
li:hover{
    cursor: pointer;
}
.cross{
    text-decoration: line-through;
}
</style>
<style>
#app{
    margin:0;
}
</style>
