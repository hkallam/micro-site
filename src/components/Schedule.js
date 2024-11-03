// src/components/Schedule.js
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Set up the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

// Microgreens data with actual durations
const microgreensData = [
  { name: 'Methi', sowDuration: 10, harvestDuration: 3, startDate: '2024-08-20' },
  { name: 'Sunflower', sowDuration: 12, harvestDuration: 4, startDate: '2024-08-22' },
  { name: 'Beet', sowDuration: 12, harvestDuration: 4, startDate: '2024-08-25' },
  { name: 'Kale', sowDuration: 12, harvestDuration: 4, startDate: '2024-08-28' },
  
];

function Schedule() {
  const [events, setEvents] = useState([]);

  // Function to generate events for the next 3 months
  const generateEvents = () => {
    const newEvents = [];
    const endDate = moment().add(3, 'months').endOf('day');

    microgreensData.forEach((green) => {
      let currentDate = moment(green.startDate);
      while (currentDate.isBefore(endDate)) {
        // Sowing event
        newEvents.push({
          title: `Sow ${green.name}`,
          start: currentDate.toDate(),
          end: currentDate.clone().add(1, 'day').toDate(),
          allDay: true,
          resource: 'sowing'
        });

        // Harvesting event
        const harvestStart = currentDate.clone().add(green.sowDuration, 'days');
        const harvestEnd = harvestStart.clone().add(green.harvestDuration, 'days');
        newEvents.push({
          title: `Harvest ${green.name}`,
          start: harvestStart.toDate(),
          end: harvestEnd.toDate(),
          allDay: true,
          resource: 'harvesting'
        });

        // Move to the next cycle
        currentDate.add(green.sowDuration + green.harvestDuration, 'days');
      }
    });

    setEvents(newEvents);
  };

  // Generate events when component mounts
  React.useEffect(() => {
    generateEvents();
  }, []);

  // Custom event style
  const eventStyleGetter = (event) => {
    let style = {
      backgroundColor: event.resource === 'sowing' ? '#2c5e1a' : '#f39c12',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block'
    };
    return {
      style: style
    };
  };

  return (
    <div className="schedule">
      <h2>Microgreens Planting and Harvesting Schedule</h2>
      <div style={{ height: '500px' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          eventPropGetter={eventStyleGetter}
        />
      </div>
    </div>
  );
}

export default Schedule;