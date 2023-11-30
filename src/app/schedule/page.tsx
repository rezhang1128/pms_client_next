"use client";
import React, { useState, useEffect } from "react";
import { Select, Button } from "antd";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./MyCalendarStyles.css";
import { PlusCircleOutlined } from "@ant-design/icons";
import Calendar from "./calendar";
import ShowAppointment from "./showAppointment";
import MakeAppointment from "./makeAppointment";
import { appiontmentProp } from "../appointment/types";

function AppointmentCalendar() {
  const [calendarState, setCalendarState] = useState("show");
  const [currentAppointment, setCurrentAppointment] = useState<appiontmentProp|null>(null);
  const [appointments, setAppointments] = useState<
    { id: string; title: string; start: string; end: string }[]
  >([]);
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedDoctor, setSelectedDoctor] = useState("All");
  const [selectedClinic, setSelectedClinic] = useState("All");
  const [selectedTherapy, setSelectedTherapy] = useState("All");

  useEffect(() => {
    // Fetch appointments from your server and set them in state
    // Here we are using static data for demonstration purposes
    const fetchedAppointments = [
      {
        id: "1",
        title: "Dentist Appointment",
        start: "2023-03-29T10:30:00",
        end: "2023-03-29T11:30:00",
      },
      {
        id: "2",
        title: "Meeting with Alex",
        start: "2023-03-30T14:00:00",
        end: "2023-03-30T15:00:00",
      },
      // ...more appointments
    ];
    setAppointments(fetchedAppointments);
  }, []);

  // Event click handler
  //   const handleEventClick = ;
  const fakeData = [
    {
      date: "2023-12-06",
      time: "15:05:00",
      treatment: "Acupuncture",
      location: "Hobart Medical Clinic",
      doctor: "Jane Smith",
      patient: "Test Patient",
      email: "test@example.com",
      clinic: "test clinic",
    },
    {
      date: "2023-012-07",
      time: "15:05:00",
      treatment: "Acupuncture",
      location: "Hobart Medical Clinic",
      doctor: "Jane Smith",
      patient: "Test Patient",
      email: "test@example.com",
      clinic: "test clinic",
    },
    {
      date: "2023-12-08",
      time: "15:05:00",
      treatment: "Acupuncture",
      location: "Hobart Medical Clinic",
      doctor: "Jane Smith",
      patient: "Test Patient",
      email: "test@example.com",
      clinic: "test clinic",
    },
  ];
  function getAppointment(record:appiontmentProp) {
    setCurrentAppointment(record);
  }
  function makeAppointment() {
    setCalendarState("make");
    alert({ calendarState });
  }
  function showAppointment() {
    setCalendarState("show");
    alert({ calendarState });
  }
  return (
    <div className="flex bg-white p-6 rounded-xl h-full w-full ml-6">
      <div style={{ width: "50%", height: "50%" }}>
        {/* <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={appointments}
          eventClick={({ event }) => {
            alert(`Appointment: ${event.title}`);
            // You can do more here, like opening a modal with appointment details
          }}
          selectable={true}
          selectMirror={true}
          select={handleDateSelect}
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
        /> */}
        <Calendar detail={getAppointment} appointment={fakeData} state={calendarState} />
      </div>
      
      {calendarState === 'show' ? (
      <div className="ml-6">
        <ShowAppointment
          currentApp={currentAppointment}
          onSubmit={makeAppointment}
        />
      </div>
    ) : calendarState === 'make' ? (
      <div className="ml-6">
        <MakeAppointment onSubmit={showAppointment}/>
      </div>
    ) : (
      <div className="ml-6">
        <p>Please select an action.</p>
      </div>
    )}
      
      {/* Appointment showing part
      <Button type="primary">Make a Appointment</Button>

      {/*Appiontment makeing part
      <div className="ml-4 space-x-6 mt-6 hidden md:flex">
        <div>
          <p>Select location</p>
          <Select
            style={{ width: 150 }}
            defaultValue="All"
            onChange={(value) => setSelectedLocation(value)}
          >
            <Select.Option value="All">All</Select.Option>
            {/* Add more options for patients
          </Select>
        </div>

        <div>
          <p>Select doctor</p>
          <Select
            style={{ width: 150 }}
            defaultValue="All"
            onChange={(value) => setSelectedDoctor(value)}
          >
            <Select.Option value="All">All</Select.Option>
            <Select.Option value="test doctor">Test doctor</Select.Option>
            {/* Add more options for doctors
          </Select>
        </div>

        <div>
          <p>Select clinic</p>
          <Select
            style={{ width: 150 }}
            defaultValue="All"
            onChange={(value) => setSelectedClinic(value)}
          >
            <Select.Option value="All">All</Select.Option>
            {/* Add more options for clinics 
          </Select>
        </div>

        <div>
          <p>Select treatment</p>
          <Select
            style={{ width: 150 }}
            defaultValue="All"
            onChange={(value) => setSelectedTherapy(value)}
          >
            <Select.Option value="All">All</Select.Option>
            {/* Add more options for treatments
          </Select>
        </div>
      </div> */}
    </div>
  );
}

export default AppointmentCalendar;
// Handle what happens when a date is selected
function handleDateSelect(selectInfo: any) {
  let title = prompt("Enter a new title for your appointment:");
  let calendarApi = selectInfo.view.calendar;

  calendarApi.unselect(); // clear date selection

  if (title) {
    calendarApi.addEvent({
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
    });
  }
}
