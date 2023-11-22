"use client"
import {Input, Button, Space, Table, Tag, Modal, Select} from "antd";
import {PlusCircleOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';
import React, { useState } from 'react';
import { type } from "os";
import AddClinic from "./addClinic";
import EditClinicModal from "./editClinic";

const { Search } = Input;
const { Column, ColumnGroup } = Table;

type clinicProp = {
    // key:React.Key;
    name: string,
    street: string,
    phone: string,
    email: string
}
export default function Location() {
    var clinics:clinicProp[] = [{"name":"some clinic", "street":"yorgurt street", "phone":"0404040023","email":"test@gmail.com"},
    {"name":"some clinic", "street":"yorgurt street", "phone":"0404040023","email":"test@gmail.com"},
    {"name":"some clinic", "street":"yorgurt street", "phone":"0404040023","email":"test@gmail.com"},
    {"name":"some clinic", "street":"yorgurt street", "phone":"0404040023","email":"test@gmail.com"},
    {"name":"some clinic", "street":"yorgurt street", "phone":"0404040023","email":"test@gmail.com"},
    {"name":"some clinic", "street":"yorgurt street", "phone":"0404040023","email":"test@gmail.com"}]; 

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingClinic, setEditingClinic] = useState('');
    const [isEditVisible, setIsEditVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    // Define the edit and delete functions
    const onDelete = (record) => {
        console.log('Delete', record);
        // Your delete logic here
    };

    const onEdit = (clinic: clinicProp) => {
        setEditingClinic(clinic);
        setIsEditVisible(true);
    };
    
    const handleEditSubmit = (values: clinicProp) => {
        console.log('Updated values:', values);
        // Update logic here
        setIsEditVisible(false);
        setEditingClinic(null);
    };

    return (
      
        <div className="bg-white p-6 rounded-xl h-full w-full ml-6">
            <h1 className="font-bold text-2xl">Clinic list</h1>
            <a>See all clinic addresses</a>
            <div className="flex justify-start mt-6">
                <Search style={{ width: '30%', minWidth: '200px'  }}  className="" placeholder="input search text" size="large" />
                <Button onClick={showModal} className="bg-blue-500 text-white flex justify-items-center ml-4 h-10 rounded-2xl">
                    <div className="flex justify-items-center p-1">
                        <PlusCircleOutlined />                        
                        <span className="ml-4">ADD A CLINIC</span>
                    </div>
                </Button>
            </div>
            <Table className="mt-6" dataSource={clinics}>
                
                <Column title="NAME" dataIndex="name" key="name"/>
                <Column title="STREET" dataIndex="street" key="street"/>
                <Column title="PHONE" dataIndex="phone" key="phone"/>
                <Column title="EMAIL" dataIndex="email" key="email"/>
                <Column
                    title="EDIT"
                    key="edit"
                    render={(text, record) => (
                    <a onClick={() => onEdit(record)}>
                        <EditOutlined />
                    </a>
                    )}
                />
                <Column
                    title="DELETE"
                    key="delete"
                    render={(text, record) => (
                    <a onClick={() => onDelete(record)}>
                        <DeleteOutlined />
                    </a>
                    )}
                />
            </Table>
        
        <AddClinic visible={isModalVisible} onCancel={handleCancel}></AddClinic>
        <EditClinicModal
            clinic={editingClinic}
            visible={isEditVisible}
            onEditSubmit={handleEditSubmit}
            onCancel={() => setIsEditVisible(false)}
        />
        </div>
      
    );
  }