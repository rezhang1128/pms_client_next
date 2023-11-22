"use client"
import {Input, Button, Space, Table, Tag, Modal, Select} from "antd";
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
      <div className="h-screen">
        <div className="bg-white p-6 rounded-xl h-full w-full">
            <h1 className="font-bold text-2xl">Clinic list</h1>
            <a>See all clinic addresses</a>
            <div className="flex justify-start mt-6">
                <Search style={{ width: '30%', minWidth: '200px'  }}  className="" placeholder="input search text" size="large" />
                <Button onClick={showModal} className="bg-blue-500 text-white flex justify-items-center ml-4 h-10 rounded-2xl">
                    <div className="flex justify-items-center p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill="white" d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
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
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                    </a>
                    )}
                />
                <Column
                    title="DELETE"
                    key="delete"
                    render={(text, record) => (
                    <a onClick={() => onDelete(record)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill="red" d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                    </a>
                    )}
                />
            </Table>
        </div>
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