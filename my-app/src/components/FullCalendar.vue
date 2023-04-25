<template>
  <div id="container">
    <div id="main">
      <div id="calendar">
        <FullCalendar :options="calendarOptions" :events="events"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import { db, auth } from "../firebase/firebase"
import { addToCalendar, fetchCalendarEvents, deleteCalendarEvent } from "../firebase/func_firebase"
import { Calendar, EventInput } from '@fullcalendar/core'
type Event = {
  title: string;
  start: string | Date;
  end?: string | Date;
  allDay?: boolean;
}
const calendarOptions = {
  plugins: [
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin
  ],
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  initialView: 'dayGridMonth',
  nowIndicator: true,
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  select: handleDateSelect,
  eventClick: handleEventClick,
  eventsSet: handleEvents,
  eventColor: '#191970',
  timezone: 'UTC',
  events: function (fetchInfo: any, successCallback: (arg0: Event[]) => void, failureCallback: (arg0: any) => void) {
    fetchCalendarEvents(db, auth.currentUser?.uid ?? "unknown")
      .then((fetchedEvents) => {
        events.value = fetchedEvents.map((e) => {
          return {
            title: e.title,
            start: e.start,
            end: e.end,
            allDay: e.allDay,
          };
        });
        console.log(events.value);
        successCallback(events.value);
      })
      .catch((error) => {
        console.error(error);
        failureCallback(error);
      });
  },
};


const events = ref<{ title: string; start: Date; end: Date | undefined; allDay: boolean; }[]>([])



function handleDateSelect(selectInfo: any) {
  let title = prompt('Please enter a title for new event')
  let calendarApi = selectInfo.view.calendar

  calendarApi.unselect() // clear date selection

  if (title) {
    const event = {
      title,
      start: selectInfo.start,
      end: selectInfo.end,
      allDay: selectInfo.allDay
    }
    addToCalendar(db, auth.currentUser?.uid ?? "unknown", event)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef)
        calendarApi.addEvent(event)
      })
      .catch((error) => {
        console.error("Error adding document: ", error)
      })
  }
}

function handleEventClick(clickInfo: any) {
  if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    clickInfo.event.remove()
    deleteCalendarEvent(db, auth.currentUser?.uid ?? "unknown", clickInfo.event.title, clickInfo.event.start)
  }
}

function handleEvents(e: any) {
  events.value = e
}
</script>

<style scoped>
#container {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}

#main {
  width: 100%;
  height: 100%;
  justify-content: center;
}

#calendar {
  color: black;
  background-color: #bcbaba;
}


h1 {
  text-align: center;
  color: white;
}
</style>
