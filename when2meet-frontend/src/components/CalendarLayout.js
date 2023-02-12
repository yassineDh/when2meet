import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import { v4 as uuid } from "uuid";

const events = [{ title: "Meeting", start: new Date() }];

function CalendarLayout() {
  const [events, setEvents] = useState([]);

  const handleSelect = (info) => {
    const { start, end } = info;
    const eventNamePrompt = prompt("Enter, event name");
    if (eventNamePrompt) {
      setEvents([
        ...events,
        {
          start,
          end,
          title: eventNamePrompt,
          id: uuid(),
        },
      ]);
    }
  };

  return (
    <>
      <div className="row">
        <h1 className="col-4 text-center mx-auto">Demo App</h1>
      </div>
      <div className="row">
        <div className="col-8 mx-auto">
          <FullCalendar
            editable
            selectable
            headerToolbar={{
              start: "today prev next",
              center: 'title',
              end: "dayGridMonth",
            }}
            plugins={[timeGridPlugin,dayGridPlugin, interactionPlugin]}
            views={["dayGridMonth"]}
            initialView="dayGridMonth"
            weekends={false}
            events={events}
            select={handleSelect}
            eventContent={(info) => <EventItem info={info} />}
          />
        </div>
      </div>
    </>
  );
}

const EventItem = ({ info }) => {
  const { event } = info;
  return (
    <div>
      <p>{event.title}</p>
    </div>
  );
};

export default CalendarLayout;
