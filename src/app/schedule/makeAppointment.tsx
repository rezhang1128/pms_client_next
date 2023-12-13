import { MakeAppointmentProps } from "./types";
import { Select, Button, Modal, Form, Col, Row, Spin } from "antd";
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
  const [showDetails, setShowDetails] = useState(false);

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

  const handleCloseDetails = () => {
    setShowDetails(false);
  }
  
  // Update the key when the modal is closed to force re-render of the FullCalendar
  const handleCloseModal = () => {
    onCancel();
    setCalendarKey(Date.now());
    setRenderCalendar(false);
  };

  const [renderCalendar, setRenderCalendar] = useState(false);
  //make sure the calendar can be rendered completly
  React.useEffect(() => {
    let timer:any;
  
    if (visible) {
      // Slightly longer delay to ensure the container is fully rendered
      timer = setTimeout(() => {
        setRenderCalendar(true);
        setCalendarKey(Date.now()); // Update the key to force a rerender of the calendar
      }, 500); // Consider increasing this if the modal animation is longer than 100ms
    } else {
      setRenderCalendar(false);
    }
  
    return () => clearTimeout(timer);
  }, [visible]);
  
  // Separate effect to update calendar size after rendering
  React.useEffect(() => {
    if (renderCalendar && calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.updateSize();
    }
  }, [renderCalendar]);


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
    console.log(selectedApp);
    if(window.innerWidth <= 768){
      setShowDetails(true);
    }else{
      setShowDetails(false);
    }
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
      style={{height:"100vh"}}
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
        </Button>
      ]}
      
    >
      
      <div className="block md:flex space-x-2 h-full">
        {renderCalendar ?(
          <div className="md:w-5/6 h-full text-xs md:text-base" key={calendarKey}>
            <FullCalendar
              ref={calendarRef}
              timeZone="UTC"
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              selectable={isSelectable}
              headerToolbar={{
                left: "prev,next",
                center: "title",
                right: "dayGridMonth,timeGridWeek",
              }}
              height="auto"
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
        ):(
          <div className="flex justify-center items-center h-full m-28">
            <Spin size="large" />
        </div>
        )}
        <div className="w-fit md:mt-12">
          <div className="w-fit flex space-x-1 md:space-x-1 mt-2 md:mt-0">
            {/*Remember all data here need to be unique, you need to get unique value from database or
            find other way to find unique value first*/}
            <div className="md:flex md:space-x-2 space-y-1 md:space-y-0 block">
              <div className="h-fit">
                <p className="hidden md:block">Select location</p>
                <Select
                  className="w-32"
                  
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
              <div className="h-fit">
                <p className="hidden md:block">Select doctor</p>
                <Select
                  className="w-32"
                  
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
            </div>

            <div className="md:flex md:space-x-2 w-fit space-y-1 md:space-y-0 block">
              <div className="h-fit">
                <p className="hidden md:block">Select clinic</p>
                <Select
                  className="w-32"
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
              <div className="h-fit">
                <p className="hidden md:block">Select treatment</p>
                <Select
                  className="w-32"
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
          </div>

          <div className="p-2 w-full h-96 md:block md:mt-6 hidden">
            <p>Appointment Details:</p>
            {selectedApp?(
                <div className="mt-2 p-0 md:p-4 flex flex-col space-y-2 border-2 w-full h-72">
                  <Row>
                    <Col flex="none">Doctor Name:</Col>
                    <Col className="pl-4" flex="auto">{selectedApp.doctor}</Col>
                  </Row>
                  <Row>
                    <Col flex="none">Clinic Name:</Col>
                    <Col className="pl-4" flex="auto">{selectedApp.clinic}</Col>  
                  </Row>
                  <Row>
                    <Col flex="none">Clinic Address:</Col>
                    <Col className="pl-4" flex="auto">{selectedApp.address}</Col>
                  </Row>
                  <Row>
                    <Col flex="none">Appointment Time:</Col>
                    <Col className="pl-4" flex="auto">{new Date(selectedApp.startTime).toISOString()} - {new Date(selectedApp.endTime).toISOString()}</Col>
                  </Row>
                 
                </div>
            ):(
              <p className="mt-2 p-0 md:p-4 border-2 w-full h-72">Please select an availiable appointment</p>
            )}
          </div>
        </div>
        <Modal 
          title="Appointment Details"
          onCancel={handleCloseDetails}
          open={showDetails}
          footer={[
            <Button key="back" onClick={handleCloseDetails}>
              Cancel
            </Button>
          ]}
          >
            {selectedApp?(
              <div>
                <Row>
                  <Col flex="none">Doctor Name:</Col>
                  <Col className="pl-4" flex="auto">{selectedApp.doctor}</Col>
                </Row>
                <Row>
                  <Col flex="none">Clinic Name:</Col>
                  <Col className="pl-4" flex="auto">{selectedApp.clinic}</Col>  
                </Row>
                <Row>
                  <Col flex="none">Clinic Address:</Col>
                  <Col className="pl-4" flex="auto">{selectedApp.address}</Col>
                </Row>
                <Row>
                  <Col flex="none">Appointment Time:</Col>
                  <Col className="pl-4" flex="auto">{new Date(selectedApp.startTime).toISOString()} - {new Date(selectedApp.endTime).toISOString()}</Col>
                </Row>
              </div>
            ):(
              <div></div>
            )}
          </Modal>
      </div>
    </Modal>
  );
};
export default MakeAppointment;
