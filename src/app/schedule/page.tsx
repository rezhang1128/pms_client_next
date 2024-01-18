"use client";
import React, { useState, useEffect } from "react";
import "./MyCalendarStyles.css";
import ShowAppointment from "./showAppointment";
import MakeAppointment from "./makeAppointment";
import { appiontmentProp } from "../../lib/types";
import { AvailiableApp } from "../../lib/types";

function AppointmentCalendar() {
  const [makeAppintment, setMakeAppintment] = useState(false);
  const [choosenApp, setChoosenApp] = useState<AvailiableApp|null>(null);
  
  const [appointments, setAppointments] = useState<
    { id: string; title: string; start: string; end: string }[]
  >([]);

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
  const fakeApp: AvailiableApp[] = [
    {
      doctor: "test doc1",
      clinic: "clinic1",
      address: "test address1",
      startTime: "2023-12-14T12:42:31.255604",
      endTime: "2023-12-14T13:42:31.255604"
    },
    {
      doctor: "test doc2",
      clinic: "clinic2",
      address: "test address2",
      startTime: "2023-12-29T18:42:31.255640",
      endTime: "2023-12-29T19:42:31.255640"
    },
    {
      doctor: "test doc3",
      clinic: "clinic3",
      address: "test address3",
      startTime: "2023-12-20T02:42:31.255649",
      endTime: "2023-12-20T03:42:31.255649"
    },
    {
      doctor: "test doc4",
      clinic: "clinic4",
      address: "test address4",
      startTime: "2023-12-07T16:42:31.255656",
      endTime: "2023-12-07T17:42:31.255656"
    },
    {
      doctor: "test doc5",
      clinic: "clinic5",
      address: "test address5",
      startTime: "2023-12-17T00:42:31.255662",
      endTime: "2023-12-17T01:42:31.255662"
    }
    
  ];

  const fakeData:appiontmentProp[] = [
    {
      id:'1',
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
      id:'2',
      date: "2023-12-07",
      time: "15:05:00",
      treatment: "Acupuncture",
      location: "Hobart Medical Clinic",
      doctor: "Jane Smith",
      patient: "Test Patient",
      email: "test@example.com",
      clinic: "test clinic",
    },
    {
      id:'3',
      date: "2023-12-08",
      time: "15:05:00",
      treatment: "Acupuncture",
      location: "Hobart Medical Clinic",
      doctor: "Jane Smith",
      patient: "Test Patient",
      email: "test@example.com",
      clinic: "test clinic",
    },{
      id:'4',
      date: "2023-12-09",
      time: "15:05:00",
      treatment: "Acupuncture",
      location: "Hobart Medical Clinic",
      doctor: "Jane Smith",
      patient: "Test Patient",
      email: "test@example.com",
      clinic: "test clinic",
    },
  ];
  
  function makeAppointment() {
    setMakeAppintment(true);
  }
  function showAppointment(setApp:Function) {
    {
    setMakeAppintment(false);
    setApp(null);
  }}
  return (
    <div className="flex bg-white p-6 rounded-xl h-full w-full ml-2">
      <div className="w-full h-full">
        <ShowAppointment
          appointment={fakeData}
          onSubmit={makeAppointment}
        />
      </div>
      <MakeAppointment visible={makeAppintment} availiableApp={fakeApp} getApp={setChoosenApp} onCancel={showAppointment} />
      <div>
</div>
    </div>
  );
}

export default AppointmentCalendar;
