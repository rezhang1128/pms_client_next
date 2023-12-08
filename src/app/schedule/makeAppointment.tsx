import { Formik } from "formik";
import { MakeAppointmentProps } from "./types";
import { Select, Button, Modal, Form } from "antd";
import { AvailiableApp } from "./types";
import React, { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./MyCalendarStyles.css";

const MakeAppointment: React.FC<MakeAppointmentProps> = ({
  visible,
  availiableApp,
  getApp,
  onCancel,
}) => {
  // return <Formik initialValues={{}} onSubmit={(values)=>{
  //     onSubmit(values)
  // }}>
  //     {/* inputs */}
  //     <button type="submit">Submit</button>
  // </Formik>
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedDoctor, setSelectedDoctor] = useState("All");
  const [selectedClinic, setSelectedClinic] = useState("All");
  const [selectedTherapy, setSelectedTherapy] = useState("All");
  const [selectedApp, setSelectedApp] = useState<AvailiableApp|null>(null);
  const [calendarKey, setCalendarKey] = useState(Date.now());
  const [isSelectable, setIsSelectable] = useState(true);

  const calendarEvents = availiableApp.map(appointment => ({
    title: `${appointment.doctor}`,
    start: (new Date(appointment.startTime)).toISOString(),
    end: (new Date(appointment.endTime)).toISOString(),
    // You can add more properties as needed
    extendedProps: {
      address: appointment.address,
      clinic: appointment.clinic
    }
  }));

  const calendarRef = useRef<FullCalendar>(null);
  
  // Update the key when the modal is closed to force re-render of the FullCalendar
  const handleCloseModal = () => {
    onCancel();
    setCalendarKey(Date.now());
    setRenderCalendar(false);
  };

  const [renderCalendar, setRenderCalendar] = useState(false);
  //make sure the calendar can be rendered completly
  React.useEffect(() => {
    if (visible) {
      // Use a timeout to delay the rendering
      const timer = setTimeout(() => setRenderCalendar(true), 10);
      return () => clearTimeout(timer);
    } else {
      setRenderCalendar(false);
    }
  }, [visible]);


  const handleDateClick = (arg: any) => {
    const calendarApi= calendarRef.current?.getApi();
    if (calendarApi && availableDatesSet.has(arg.dateStr)) {
      calendarApi.changeView('timeGridWeek', arg.date);
    }
  };

  const handleEventClick = (clickInfo:any) => {
    const newApp:AvailiableApp = {
      doctor: clickInfo.event.title,
      clinic: clickInfo.event.extendedProps.clinic,
      address: clickInfo.event.extendedProps.address,
      startTime: clickInfo.event.start,
      endTime: clickInfo.event.end
    } 
    setSelectedApp(newApp);
    // alert(`Clicked event: ${clickInfo.event.title}`);
    // if (clickInfo.event.extendedProps && clickInfo.event.extendedProps.address) {
    //   alert(`Event address: ${clickInfo.event.extendedProps.address}`);
    // }
  };

  const handleEventSubmit = () => {
    if (selectedApp) {
      // Call the getApp function with the selected event details
      getApp(selectedApp);
      handleCloseModal();
    } else {
      // Handle case when no event is selected
      alert("No event selected");
    }
  }

  const availableDatesSet = new Set(availiableApp.map(app => new Date(app.startTime).toISOString().split('T')[0]));

  return (
    <Modal
      title="Make Appointment"
      open={visible}
      onOk={handleEventSubmit}
      onCancel={handleCloseModal}
      width="100vw"
      style={{
        height: '50vh',
      }}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          className=""
          type="primary"
          key="submit"
          onClick={handleEventSubmit}
        >
          Submit
        </Button>,
      ]}
    >
      <div className="block md:flex space-x-2">
        {renderCalendar &&(
          <div className="full-calendar-container2" key={calendarKey}>
          <FullCalendar
            ref={calendarRef}
            timeZone="UTC"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            selectable={isSelectable}
            selectMirror={true}
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "dayGridMonth,timeGridWeek",
            }}
            events={calendarEvents}
            eventClick={handleEventClick}
            dateClick={handleDateClick}
            dayCellDidMount={(arg)=>{
              const dateStr = arg.date.toISOString().split('T')[0];
              if (!availableDatesSet.has(dateStr)) {
                arg.el.style.backgroundColor = 'white';
                const fcContent = arg.el.querySelector('.fc-daygrid-day-number'); // For FullCalendar v5
                if (fcContent) {
                  (fcContent as HTMLElement).style.color = '#e5e7eb'; // Darker grey color for the text
                }
                
              }
            }}
            selectAllow={selectInfo => {
              const dateStr = selectInfo.startStr.split('T')[0];
              console.log(`Select date: ${dateStr}, Allowed: ${availableDatesSet.has(dateStr)}`);
              return availableDatesSet.has(dateStr);
            }}
            datesSet={(dateInfo)=>{
              if (dateInfo.view.type === 'timeGridWeek') {
                setIsSelectable(false); // Disable slot selection for week view
              } else {
                setIsSelectable(true); // Enable slot selection for other views
              }
            }}
          />
        </div>
        )}
        
        <div>
          <div className="flex space-x-1 md:space-x-2 mt-4 md:mt-0 ml-0 md:ml-2">
            {/*Remember all data here need to be unique, you need to get unique value from database or
            find other way to find unique value first*/}
            <div>
              <p className="hidden md:block">Select location</p>
              <Select
                className="AppSelect"
                
                defaultValue="All"
                onChange={(value) => setSelectedLocation(value)}
              >
                <Select.Option value="All">
                  <p className="hidden md:block">All</p>
                  <p className="display md:hidden">Location</p>
                </Select.Option>
                {availiableApp &&
                availiableApp.map((item, i) => (
                  <Select.Option key={i} value={item.address}>{item.address}</Select.Option>
                ))}
              </Select>
            </div>
            <div>
              <p className="hidden md:block">Select doctor</p>
              <Select
                className="AppSelect"
                
                defaultValue="All"
                onChange={(value) => setSelectedDoctor(value)}
              >
                <Select.Option value="All">
                <p className="hidden md:block">All</p>
                  <p className="display md:hidden">Doctor</p>
                </Select.Option>
                {availiableApp &&
                availiableApp.map((item, i) => (
                  <Select.Option key={i} value={item.doctor}>{item.doctor}</Select.Option>
                ))}
              </Select>
            </div>

            <div>
              <p className="hidden md:block">Select clinic</p>
              <Select
                className="AppSelect"
                
                defaultValue="All"
                onChange={(value) => setSelectedClinic(value)}
              >
                <Select.Option value="All">
                <p className="hidden md:block">All</p>
                  <p className="display md:hidden">Clinic</p>
                </Select.Option>
                {availiableApp &&
                availiableApp.map((item, i) => (
                  <Select.Option key={i} value={item.clinic}>{item.clinic}</Select.Option>
                ))}
              </Select>
            </div>

            <div>
              <p className="hidden md:block">Select treatment</p>
              <Select
                className="AppSelect"
                defaultValue="All"
                onChange={(value) => setSelectedTherapy(value)}
              >
                <Select.Option value="All">
                <p className="hidden md:block">All</p>
                  <p className="display md:hidden">Therapy</p>
                </Select.Option>
                {/* {availiableApp &&
                availiableApp.map((item) => (
                  <Select.Option value={}>All</Select.Option>
                ))} */}
              </Select>
            </div>
          </div>

          
          {selectedApp?(
              <div className="mt-6 p-0 md:p-4 flex flex-col space-y-2">
                <div>
                  <p>Doctor Name: {selectedApp.doctor}</p>
                  <p>Clinic Name: {selectedApp.clinic}</p>
                </div>
                <div>
                  <p>Clinic address: {selectedApp.address}</p>
                </div>
                <p>Appointment Time: {new Date(selectedApp.startTime).toISOString()} - {new Date(selectedApp.endTime).toISOString()}</p>
              </div>
          ):(
            <p>Appointment Details</p>
          )}
          
        </div>
      </div>
    </Modal>
  );
};
export default MakeAppointment;
