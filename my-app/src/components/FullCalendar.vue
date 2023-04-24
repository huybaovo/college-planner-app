<!-- FullCalendar Third party component used for Calendar-->
<script lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'

// Firebase
import { db , auth } from "../firebase/firebase"
import { addToCalendar,fetchCalendarEvents } from "../firebase/func_firebase"
import { EventInput } from '@fullcalendar/core'

// let eventGuid = 0
// let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD

// export function createEventId() {
//   return String(eventGuid++)
// }

export default {
  components: {
    FullCalendar,
  },
  data() {
    return {
      calendarOptions: {
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
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        eventColor: '#191970',
        /* you can update a remote database when these fire:*/
        // eventAdd:
        // eventChange: 
        // eventRemove: 
      },
      events: [] as { title: string, start: Date, end: Date | undefined, allDay: boolean }[],
    }
  },
  async mounted() {
    try {
      const events = await fetchCalendarEvents(db, auth.currentUser?.uid)
      console.log(events)
      this.events = events
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    handleDateSelect(selectInfo: any) {
      let title = prompt('Please enter a title for new event')
      let calendarApi = selectInfo.view.calendar

      calendarApi.unselect() // clear date selection

      if (title) {
        const event = {
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        }
        addToCalendar(db, auth.currentUser?.uid, event)
          .then((docRef) => {
            console.log("Document written with ID: ", docRef)
            event.id = docRef.id;
            calendarApi.addEvent(event)
          })
          .catch((error) => {
            console.error("Error adding document: ", error)
          })
      }
    },
    handleEventClick(clickInfo: any) {
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove()
      }
    },
    handleEvents(events: any) {
      this.events = events
    },
  }
}
</script>
<template>
  <div id="container">
    <div id="main">
      <div id="calendar">
        <FullCalendar :options="calendarOptions"/>
      </div>
    </div>
  </div>
</template>
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
  background-color: #000;
}

h1 {
  text-align: center;
  color: white;
}

</style>