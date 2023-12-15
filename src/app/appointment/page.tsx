"use client"
import React, {useState} from 'react';
import { Table, Button, Select, Modal, Radio, Card,Form } from 'antd';
import { EditOutlined, DeleteOutlined, FilterOutlined, RightOutlined } from '@ant-design/icons';
import { filterProp} from './types';
import {appiontmentProp} from "../../lib/types";
import EditAppiontModal from './editAppiont';
// import EditAppiontModal from './editAppiont';


const { Option } = Select;

export default function Appointment() {
  const columns = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Time', dataIndex: 'time', key: 'time' },
    { title: 'Therapy', dataIndex: 'therapy', key: 'therapy' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    { title: 'Therapist', dataIndex: 'therapist', key: 'therapist' },
    { title: 'Patient', dataIndex: 'patient', key: 'patient' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Edit', dataIndex: 'edit', key: 'edit',
    render: (record:appiontmentProp) => (
        <a onClick={() => onEdit(record)}>
          <EditOutlined />
        </a>
      ),
    },
    { title: 'Delete', dataIndex: 'delete', key: 'delete',
    render: (record:appiontmentProp) => (
        <a onClick={() => onDelete(record)}>
          <DeleteOutlined style={{color:'red'}} />
        </a>
      ),
    }
  ];

  const data = [
    {
        id: '1',
        date: '2023-08-06',
        time: '15:05:00',
        treatment: 'Acupuncture',
        location: 'Hobart Medical Clinic',
        doctor: 'Jane Smith',
        patient: 'Test Patient',
        email: 'test@example.com',
        clinic: 'test clinic'
    },
    {
        id: '2',
        date: '2023-08-06',
        time: '15:05:00',
        treatment: 'Acupuncture',
        location: 'Hobart Medical Clinic',
        doctor: 'test doctor',
        patient: 'Test Patient',
        email: 'test@example.com',
        clinic: 'test clinic'
    },
    {
        id: '3',
        date: '2023-08-06',
        time: '15:05:00',
        treatment: 'Acupuncture',
        location: 'Hobart Medical Clinic',
        doctor: 'Jane Smith',
        patient: 'Test Patient',
        email: 'test@example.com',
        clinic: 'test clinic'
    },
    {
        id: '4',
        date: '2023-08-06',
        time: '15:05:00',
        treatment: 'Acupuncture',
        location: 'Hobart Medical Clinic',
        doctor: 'Jane Smith',
        patient: 'Test Patient',
        email: 'test@example.com',
        clinic: 'test clinic'
    }
  ];
  const [selectedPatient, setSelectedPatient] = useState('All');
  const [selectedDoctor, setSelectedDoctor] = useState('All');
  const [selectedClinic, setSelectedClinic] = useState('All');
  const [selectedTherapy, setSelectedTherapy] = useState('All');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [editingAppiont, setEditingAppiont] = useState<appiontmentProp | null>(null);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [detailAppiont, setDetailAppiont] = useState<appiontmentProp | null>(null);
  const [form] = Form.useForm();
  const [filters, setFilters] = useState({
    patient: 'All',
    doctor: 'All',
    clinic: 'All',
    treatment: 'All'
  });

  const onSaveFilters = () => {
    console.log('Saving filters:');
    cancelModal();
  };

  const onFormFinish = (values:filterProp) => {
    setSelectedClinic(values.clinic);
    setSelectedDoctor(values.doctor);
    setSelectedPatient(values.patient);
    setSelectedTherapy(values.treatment);
    setFilters(values); 
    onSaveFilters(); 
  };

  const onReset = () => {
    form.resetFields();
    setFilters({
        patient: 'All',
        doctor: 'All',
        clinic: 'All',
        treatment: 'All'
      });
  };

 // set item type after connect to backend
  const onEdit=(item:any)=>{
    setIsEditVisible(true);
    setEditingAppiont(item);
  };
  // record here will be id ro something else
  const onDelete = (record:any) => {
    console.log('Delete', record);
    // Your delete logic here   
  };
  const showFilter = () => {
    setIsFilterVisible(true);
  };
  const showDetail = (item:appiontmentProp) => {
    setIsDetailVisible(true);
    setDetailAppiont(item);
  };

  const cancelModal = () => {
    setIsFilterVisible(false);
    setIsEditVisible(false);
    setIsDetailVisible(false);
  };

  const getFilteredData = () => {
    return data.filter((item) => {
      return (
        (selectedPatient === 'All' || item.patient === selectedPatient) &&
        (selectedDoctor === 'All' || item.doctor === selectedDoctor) &&
        (selectedClinic === 'All' || item.location === selectedClinic) &&
        (selectedTherapy === 'All' || item.treatment === selectedTherapy)
      );
    });
  };
  const filteredData = getFilteredData();

  return (
    <div className=" bg-white p-6 rounded-xl h-full w-full md:ml-6">
      <h1 className="font-bold text-2xl">Appointments list</h1>
      <p>See information about all appointments you have made!</p>
      <div className='flex'>
        <Radio.Group className='mt-6' defaultValue="upcoming" buttonStyle="solid">
            <Radio.Button value="upcoming">Upcoming</Radio.Button>
            <Radio.Button value="past">Past</Radio.Button>
        </Radio.Group>
        <button onClick={showFilter} className='ml-6 block md:hidden'>
            <FilterOutlined />
        </button>
      </div>
      
      <div className=' space-x-6 mt-6 hidden md:flex'>
        <div>
            <p>Select patient</p>
            <Select style={{width:150}} defaultValue="All" onChange={value => setSelectedPatient(value)}>
                <Option value="All">All</Option>
                {/* Add more options for patients */}
            </Select>
        </div>
        
        <div>
            <p>Select doctor</p>
            <Select style={{width:150}} defaultValue="All" onChange={value => setSelectedDoctor(value)}>
                <Option value="All">All</Option>
                <Option value="test doctor">Test doctor</Option>
                {/* Add more options for doctors */}
            </Select>
        </div>
        
        <div>
            <p>Select clinic</p>
            <Select style={{width:150}} defaultValue="All" onChange={value => setSelectedClinic(value)}>
                <Option value="All">All</Option>
                {/* Add more options for clinics */}
            </Select>
        </div>
        
        <div>
            <p>Select treatment</p>
            <Select style={{width:150}} defaultValue="All" onChange={value => setSelectedTherapy(value)}>
                <Option value="All">All</Option>
                {/* Add more options for treatments */}
            </Select>
        </div>
      </div>
      <Table className='mt-6 p-4 hidden md:block' columns={columns} dataSource={filteredData.map(data=>({...data, key:data.id}))}  pagination={{ pageSize: 5 }}></Table>

      {/*Phone version*/}
      {filteredData.map((item, index) => (
        <Card className="block md:hidden" key={index} title={item.patient} style={{width: 400, marginTop:20}}>
            <div className="flex justify-evenly">
                <div className=''>
                    <p>Email: {item.email}</p>
                    <p>Location: {item.location}</p> 
                    <p>Therapy: {item.treatment}</p>
                </div>
                <div className='ml-4 flex flex-col'>
                    <a onClick={() => onEdit(item)}>
                        <EditOutlined className='w-' style={{width:40,height:40}}/>
                    </a>
                    <a onClick={() => onDelete(item)}>
                        <DeleteOutlined style={{ color: 'red' , width:40,height:40}} />
                    </a>
                </div>
                <button className='h-full flex self-center' onClick={()=>showDetail(item)}>
                    <RightOutlined />
                </button>
                
            </div>
        </Card>
      ))}

    <EditAppiontModal appiont={editingAppiont} visible={isEditVisible} onEditSubmit={()=>{}} onCancel={cancelModal}></EditAppiontModal>
    {/*Filter Modal in phone version*/}
    <Modal
      width={400}
      title="Filter"
      open={isFilterVisible}
      onCancel={cancelModal}
      footer={[
        <Button key="back" onClick={onReset}>
          Reset
        </Button>,
        <Button form="filterForm" key="submit" htmlType="submit" className="bg-blue-600 text-white">
          Apply
        </Button>,
      ]}
    >
      <Form
        form={form}
        id="filterForm"
        initialValues={filters}
        onFinish={onFormFinish}
        className='space-y-6 mt-6'
      >
        <Form.Item name="patient" label="Select patient">
          <Select defaultValue={"All"} style={{ width: 150 }}>
            <Option value="All">All</Option>
            {/* Add more options for patients */}
          </Select>
        </Form.Item>
        
        <Form.Item name="doctor" label="Select doctor">
          <Select defaultValue={"All"} style={{ width: 150 }}>
            <Option value="All">All</Option>
            <Option value="test doctor">Test doctor</Option>
            {/* Add more options for doctors */}
          </Select>
        </Form.Item>
        
        <Form.Item name="clinic" label="Select clinic">
          <Select defaultValue={"All"} style={{ width: 150 }}>
            <Option value="All">All</Option>
            {/* Add more options for clinics */}
          </Select>
        </Form.Item>
        
        <Form.Item name="treatment" label="Select treatment">
          <Select defaultValue={"All"} style={{ width: 150 }}>
            <Option value="All">All</Option>
            {/* Add more options for treatments */}
          </Select>
        </Form.Item>
      </Form>
      </Modal>

      {/*Detail Modal in phone version*/}
      <Modal
      width= {400}
      title="Detail"
      open={isDetailVisible}
      onCancel={cancelModal}
      footer={[
        <Button key="back" onClick={cancelModal}>
          Cancel
        </Button>
      ]}
      >
        <div className=' mt-6'>
            {detailAppiont ? (
                <div className='space-y-6'>
                    <p>Date: {detailAppiont.date}</p>
                    <p>Time: {detailAppiont.time}</p>
                    <p>Therapist: {detailAppiont.doctor}</p>
                    <p>Therapy: {detailAppiont.treatment}</p>
                    <p>Location: {detailAppiont.location}</p>
                    <p>Patient: {detailAppiont.patient}</p>
                    <p>Email: {detailAppiont.email}</p>
                    <p>Clinic: {detailAppiont.clinic}</p>
                </div>
            ) : (
                <p>No details available.</p> // Or any other placeholder content
            )}
            
        </div>
      </Modal>
      {/*Edit Modal*/}
      
    </div>
  );
};
