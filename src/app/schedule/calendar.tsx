import { CalendarProp } from "./types";
import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { appiontmentProp } from "../appointment/types";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./MyCalendarStyles.css";

const Calendar: React.FC<CalendarProp> = ({ appointment, state, detail }) => {
    const [selectedAppointment, setSelectedAppointment] = useState<appiontmentProp | null>(null);

    if(state === 'show'){
        const handleEventClick = (clickInfo:any) => {
            if (appointment) {
                const clickedAppointment = appointment.find(appt =>
                  `${appt.patient} - ${appt.treatment}` === clickInfo.event.title
                );
            
                // Check if clickedAppointment is not undefined before setting it
                if (clickedAppointment) {
                  setSelectedAppointment(clickedAppointment);
                  detail(clickedAppointment);
                } else {
                  // Handle the case when clickedAppointment is undefined
                  // e.g., show an error message or log a message
                  console.log('No matching appointment found');
                }
            }
        };
        return (  
            <div>      
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={appointment?.map((appt) => ({
                        title: `${appt.patient} - ${appt.treatment}`,
                        start: new Date(`${appt.date}T${appt.time}`),
                        end: new Date(new Date(`${appt.date}T${appt.time}`).getTime() + 60 * 60 * 1000), // Assuming a 1 hour appointment for simplicity
                    })) ?? []}
                    eventClick={handleEventClick}
                    selectable={true}
                    selectMirror={true}
                    headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                    }}
                    selectAllow={(selectInfo) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0); // Set time to start of day
                    const selectedDate = new Date(selectInfo.start);
                    selectedDate.setHours(0, 0, 0, 0); // Ensure we're also comparing start of day

                    // Allow selection if the selected date is today or in the future
                    return selectedDate >= today;
                    }}
                />
          </div>
        );
    }else if(state === 'make'){
        return (
            <div>

            </div>
        );
    }


    return <div>...</div>;
};

export default Calendar;