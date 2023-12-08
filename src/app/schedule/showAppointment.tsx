import { ShowAppointmentProps } from "./types";
import { Formik } from "formik";
import { MakeAppointmentProps } from "./types";
import { Select, Button } from "antd";
import { CalendarProp } from "./types";
import React, { useState, useRef } from "react";
import { Modal } from "antd";
import { appiontmentProp } from "../appointment/types";
import FullCalendar from "@fullcalendar/react";
import DateClickArg from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./MyCalendarStyles.css";

const ShowAppointment:React.FC<ShowAppointmentProps> = ({ appointment, onSubmit }) => {

  const [selectedAppointment, setSelectedAppointment] =useState<appiontmentProp | null>(null);
  const calendarRef = useRef<FullCalendar>(null);
  const [isSelectable, setIsSelectable] = useState(true);

  const handleEventSelect = (clickInfo:any) => {
    const clickedAppointment = appointment?.find((appt) => appt.id === clickInfo.event.id);
    if (clickedAppointment) {
      // If found, set it as the selected appointment
      setSelectedAppointment(clickedAppointment);
      console.log(selectedAppointment);
    }
  };
  const handleDateClick = (arg:any) => {
    const calendarApi= calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.changeView('timeGridWeek', arg.date);
    }
  };

  const changePastClass = () => {
    const pastDaysWithEvents = document.querySelectorAll('.fc-day-past');
    pastDaysWithEvents.forEach(day => {
        if (day.querySelector('.fc-event')) {

            day.classList.replace("fc-day-past", "fc-day-future")
        }
    });
  }
  
  React.useEffect(() => {
    const timer = setTimeout(() => {}, 10);
    changePastClass();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="block md:flex w-full h-full">
        <div className="full-calendar-container">
            <FullCalendar
                timeZone="UTC"
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={
                    appointment?.map((appt) => ({
                        id: appt.id,
                        title: `${appt.patient} - ${appt.treatment}`,
                        start: new Date(`${appt.date}T${appt.time}`),
                        end: new Date(
                        new Date(`${appt.date}T${appt.time}`).getTime() + 60 * 60 * 1000), // Assuming a 1 hour appointment for simplicity
                    })) ?? []
                }
                eventClick={handleEventSelect}
                dateClick={handleDateClick}
                selectMirror={true}
                headerToolbar={{
                    left: "prev,next",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek",
                }}
                selectable={isSelectable}
                datesSet={(dateInfo)=>{
                    if (dateInfo.view.type === 'timeGridWeek') {
                      setIsSelectable(false); // Disable slot selection for week view
                    } else {
                      setIsSelectable(true); // Enable slot selection for other views
                    }
                    setTimeout(() => {
                        changePastClass();
                      }, 100); 
                    
                  }}
            /> 
        </div>
      <div className="ml-6" style={{height:"50%", width:"50%"}}>
        <Button onClick={onSubmit} type="primary">
          Make a Appointment
        </Button>
        {selectedAppointment ? (
        <div className="mt-6" >
            <p>Patient: {selectedAppointment.patient}</p>
            <p>Doctor: {selectedAppointment.doctor}</p>
            <p>Treatment: {selectedAppointment.treatment}</p>
            <p>Date: {selectedAppointment.date}</p>
            <p>Time: {selectedAppointment.time}</p>
        </div>
        ) : (
        <div className="mt-6">
          <p>
            No appointment details available. Please select an appointment to
            view its details.
          </p>
        </div>
        )}
      </div>
    </div>
  );
};
export default ShowAppointment;
