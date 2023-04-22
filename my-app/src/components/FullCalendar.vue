<!-- FullCalendar Third party component used for Calendar-->
<script lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list';

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD

export function createEventId() {
  return String(eventGuid++)
}

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
          interactionPlugin // needed for dateClick
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
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
      currentEvents: [],
      default: 'lux'
    }
  },
  methods: {
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
    },
    handleDateSelect(selectInfo: any) {
      let title = prompt('Please enter a title for new event')
      let calendarApi = selectInfo.view.calendar

      calendarApi.unselect() // clear date selection

      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        })
      }
    },
    handleEventClick(clickInfo: any) {
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove()
      }
    },
    handleEvents(events: any) {
      this.currentEvents = events
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
      <div id="sidebar">
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
  width: 85%;
  height: 100%;
  justify-content: center;
}

#calendar {
  background-color: #000;
}

#sidebar {
  width: 15%;
  height: 100%;
}

h1 {
  text-align: center;
  color: white;
}

</style>