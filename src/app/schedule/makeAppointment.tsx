import { Formik } from "formik";
import { useState } from "react";
import { MakeAppointmentProps } from "./types";
import { Select, Button } from "antd";

const MakeAppointment: React.FC<MakeAppointmentProps> = ({ onSubmit }) => {
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
  return (
    <div>
      <div className="flex space-x-2">
        <div>
          <p>Select location</p>
          <Select
            style={{ width: 150 }}
            defaultValue="All"
            onChange={(value) => setSelectedLocation(value)}
          >
            <Select.Option value="All">All</Select.Option>
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
          </Select>
        </div>
      </div>
    </div>
  );
};
export default MakeAppointment;
