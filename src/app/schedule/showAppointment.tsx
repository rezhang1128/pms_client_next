import { ShowAppointmentProps } from "./types";
import { Formik } from "formik";
import { MakeAppointmentProps } from "./types";
import { Select, Button } from "antd";
import { CalendarProp } from "./types";
import React, { useState } from "react";
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
  const handleDateSelect = (selectInfo:any) => {
    // Assuming your appointments have a date property in 'YYYY-MM-DD' format
    const dateSelectedAppointment = appointment?.find(appt =>
      appt.date === selectInfo.startStr
    );
    if (dateSelectedAppointment) {
      setSelectedAppointment(dateSelectedAppointment);
    } else {
        setSelectedAppointment(null);
    }
  };

  return (
    <div className="flex w-full h-full">
        <div style={{height:"50%", width:"50%"}}>
            <FullCalendar
            
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={
                appointment?.map((appt) => ({
                    id: appt.id,
                    title: `${appt.patient} - ${appt.treatment}`,
                    start: new Date(`${appt.date}T${appt.time}`),
                    end: new Date(
                    new Date(`${appt.date}T${appt.time}`).getTime() + 60 * 60 * 1000
                    ), // Assuming a 1 hour appointment for simplicity
                })) ?? []
                }
                selectable={true}
                select={handleDateSelect}
                selectMirror={true}
                headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
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
