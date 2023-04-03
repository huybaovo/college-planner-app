<!-- Component for calendar -->
<template>
    <div id="container">
        <div id="sunday" class="day">
            <table>
                <th>Sunday</th>
            </table>
        </div>
        <div id="monsday" class="day">
            <table>
                <th>Monday</th>
            </table>
        </div>
        <div id="tuesday" class="day">
            <table>
                <th>Tuesday</th>
            </table>
        </div>
        <div id="wednesday" class="day">
            <table>
                Wednesday<th></th>
            </table>
        </div>
        <div id="thursday" class="day">
            <table>Thursday</table>
        </div>
        <div id="friday" class="day">
            <table>Friday</table>
        </div>
        <div id="saturday" class="day">
            <table>Saturday</table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { db } from "../firebase/firebase";

</script>
<style scoped>
#container {
    display: flex;
    flex-direction: row;
    height: 40%;
    width: 100%;
}
.day{
    display: flex;
    flex-direction: column;

}
</style>