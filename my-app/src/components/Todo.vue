<template>
<div class="wrapper">
    <h1>To Do</h1>
    <div class="to-do-list">
        <ul>
            <li @click="remove_task($event.target)" v-for="(item,index) in todos">{{ item }}</li>
            <input v-model="new_task" type="text" @keydown.enter="add_task" placeholder="Enter a new task">
        </ul>
    </div>
</div>

</template>
<script setup lang="ts">
import { Ref, ref } from 'vue';
import { toDo } from '../types';
//retrieve saved todos from firestore
const todos: Ref<String []> = ref([])
const new_task = ref('')
function add_task()
{
    //save todos to firestore
    if (new_task.value != "")
    {
        todos.value.push(new_task.value.toLocaleLowerCase())
        console.log(todos.value)
        new_task.value = ''
    }
    
}
function remove_task(element: HTMLElement)
{
    //TODO: remove from firestore
    if (element.classList.contains("cross"))
    {
        element.classList.remove("cross")
    }
    else element.classList.add("cross")

}
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
