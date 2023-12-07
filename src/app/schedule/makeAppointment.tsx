import { Formik } from "formik";
import { MakeAppointmentProps } from "./types";
import { Select, Button, Modal, Form } from "antd";
import { CalendarProp } from "./types";
import React, { useState } from "react";
import { appiontmentProp } from "../appointment/types";
import FullCalendar from "@fullcalendar/react";
import DateClickArg from "@fullcalendar/react";
import DayCellContentArg from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./MyCalendarStyles.css";

const MakeAppointment: React.FC<MakeAppointmentProps> = ({
  visible,
  availiableApp,
  onSubmit,
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
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarKey, setCalendarKey] = useState(Date.now());

  const calendarEvents = availiableApp.map(appointment => ({
    title: `${appointment.doctor}, ${appointment.clinic}`,
    start: new Date(appointment.startTime).toISOString(),
    end: new Date(appointment.endTime).toISOString,
    // You can add more properties as needed
    extendedProps: {
      address: appointment.address
    }
  }));
  
  // Update the key when the modal is closed to force re-render of the FullCalendar
  const handleCloseModal = () => {
    onCancel();
    setCalendarKey(Date.now());
    setRenderCalendar(false);
  };
  const [renderCalendar, setRenderCalendar] = useState(false);
  React.useEffect(() => {
    if (visible) {
      // Use a timeout to delay the rendering
      const timer = setTimeout(() => setRenderCalendar(true), 10);
      return () => clearTimeout(timer);
    } else {
      setRenderCalendar(false);
    }
  }, [visible]);


  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr); // dateStr is a property of DateClickArg
  };
  const [form] = Form.useForm();
  const availableDatesSet = new Set(availiableApp.map(app => new Date(app.startTime).toISOString().split('T')[0]));
  // const handleDayCellDidMount = (arg) => {
  //   const dateStr = arg.date.toISOString().split('T')[0];
  //   if (!availableDatesSet.has(dateStr)) {
  //     arg.el.style.backgroundColor = '#ededed';
  //     arg.el.style.color = '#ededed';
  //   }
  //   console.log(`Day cell date: ${dateStr}, Available: ${availableDatesSet.has(dateStr)}`);
  // };
  return (
    <Modal
      title="Make Appointment"
      open={visible}
      onOk={() => form.submit()}
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
          onClick={() => form.submit()}
        >
          Apply
        </Button>,
      ]}
    >
      <div className="flex space-x-2">
        {renderCalendar &&(
          <div key={calendarKey} style={{height:"50%", width:"50%"}}>
          <FullCalendar
            timeZone="UTC"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            selectable={true}
            selectMirror={true}
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={calendarEvents}
            dateClick={handleDateClick}
            // dayCellDidMount={handleDayCellDidMount}
            dayCellDidMount={(arg)=>{
              const dateStr = arg.date.toISOString().split('T')[0];
              if (!availableDatesSet.has(dateStr)) {
                arg.el.style.backgroundColor = '#ededed';
                arg.el.style.color = '#ededed';
                
              }else{
                console.log(arg.el.innerHTML, dateStr);
              }
            }}
            selectAllow={selectInfo => {
              const dateStr = selectInfo.startStr.split('T')[0];
              console.log(`Select date: ${dateStr}, Allowed: ${availableDatesSet.has(dateStr)}`);
              return availableDatesSet.has(dateStr);
            }}
          />
        </div>
        )}
        
        <div>
          <div className="flex space-x-2">
            {/*Remember all data here need to be unique, you need to get unique value from database or
            find other way to find unique value first*/}
            <div>
              <p>Select location</p>
              <Select
                style={{ width: '12vw' }}
                defaultValue="All"
                onChange={(value) => setSelectedLocation(value)}
              >
                <Select.Option value="All">All</Select.Option>
                {availiableApp &&
                availiableApp.map((item, i) => (
                  <Select.Option key={i} value={item.address}>{item.address}</Select.Option>
                ))}
              </Select>
            </div>
            <div>
              <p>Select doctor</p>
              <Select
                style={{ width: '12vw'}}
                defaultValue="All"
                onChange={(value) => setSelectedDoctor(value)}
              >
                <Select.Option value="All">All</Select.Option>
                {availiableApp &&
                availiableApp.map((item, i) => (
                  <Select.Option key={i} value={item.doctor}>{item.doctor}</Select.Option>
                ))}
              </Select>
            </div>

            <div>
              <p>Select clinic</p>
              <Select
                style={{ width: '12vw' }}
                defaultValue="All"
                onChange={(value) => setSelectedClinic(value)}
              >
                <Select.Option value="All">All</Select.Option>
                {availiableApp &&
                availiableApp.map((item, i) => (
                  <Select.Option key={i} value={item.clinic}>{item.clinic}</Select.Option>
                ))}
              </Select>
            </div>

            <div>
              <p>Select treatment</p>
              <Select
                style={{ width: '12vw' }}
                defaultValue="All"
                onChange={(value) => setSelectedTherapy(value)}
              >
                <Select.Option value="All">All</Select.Option>
                {/* {availiableApp &&
                availiableApp.map((item) => (
                  <Select.Option value={}>All</Select.Option>
                ))} */}
              </Select>
            </div>
          </div>

          <div className="mt-6 flex flex-col space-y-2" >
            {availiableApp &&
              availiableApp.map((item, i) => (
                <Button
                key={i}
                style={{width:"50%"}}
                  type="primary"
                  // Assuming item.dateTime is a Date object, format it as needed
                  value={`${item.startTime}`}
                >
                  {item.startTime}
                </Button>
              ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default MakeAppointment;
