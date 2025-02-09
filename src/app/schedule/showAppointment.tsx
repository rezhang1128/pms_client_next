import { ShowAppointmentProps } from "./types";
import { Button, Spin } from "antd";
import React, { useState, useRef } from "react";
import { appiontmentProp } from "../appointment/types";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
//import "./MyCalendarStyles.css";

const ShowAppointment:React.FC<ShowAppointmentProps> = ({ appointment, onSubmit }) => {

    const [calendarReady, setCalendarReady] = useState(false);
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
    const timer = setTimeout(() => {
        setCalendarReady(true); // Set calendar to ready after the timeout
        changePastClass();
      }, 100); // Adjust timeout as needed
  
      return () => clearTimeout(timer);
  }, []);

  return (
    <div className="block md:flex w-full h-screen">
        {calendarReady ? (
        <div className="md:w-4/6 h-4/6 text-xs md:text-base">
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
                height="100%"
                
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
        ) : (
            <div className="m-4 md:mx-48 flex justify-center items-center h-4/6">
          <Spin size="large" />
        </div>
        )}
      <div className="md:ml-6 mt-2 md:mt-14 md:w-2/6">
        <Button onClick={onSubmit} type="primary">
          Make an Appointment
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
