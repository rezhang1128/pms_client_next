import React from 'react';
import { Modal, Button, Select, Input, Form } from 'antd';
import { FormInstance } from 'antd/lib/form';

// Define the props type for MyModal component
type MyModalProps = {
  visible: boolean;
  onCancel: () => void;
};

const { Option } = Select;

const AddClinic: React.FC<MyModalProps> = ({ visible, onCancel }) => {
  const [form] = Form.useForm<FormInstance>();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        // You can use form values here to submit
        console.log('Received values of form:', values);
        form.resetFields();
        onCancel(); // Close the modal upon successful submission
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const doctorOptions = [
    { value: 'jack', label: 'Jack' },
    { value: 'lucy', label: 'Lucy' },
    { value: 'tom', label: 'Tom' },
  ];
  const treatmentOptions = [
    { value: 'treatment1', label: 'Treatment1' },
    { value: 'treatment2', label: 'Treatment2' },
    { value: 'treatment3', label: 'Treatment3' },
  ];


  return (
    <Modal
      title="Add Clinic"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button type='primary' key="submit" onClick={handleOk}>
          Add
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="doctor" rules={[{ required: true, message: 'Please select a doctor!' }]}>
            <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Select items"
                defaultValue={[]}
                options={doctorOptions}
            />
        </Form.Item>
        <Form.Item name="treatment" rules={[{ required: true, message: 'Please select a treatment!' }]}>
            <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Select items"
                defaultValue={[]}
                options={treatmentOptions}
            />
        </Form.Item>
        {/* Repeat for other fields */}
        <Form.Item name="clinicName" rules={[{ required: true, message: 'Please input the clinic name!' }]}>
          <Input placeholder="Clinic name" />
        </Form.Item>
        <Form.Item name="streetNumber" rules={[{ required: true, message: 'Please input the street number!' }]}>
          <Input placeholder="Street number" />
        </Form.Item>
        <Form.Item name="streetName" rules={[{ required: true, message: 'Please input the street name!' }]}>
          <Input placeholder="Street name" />
        </Form.Item>
        <Form.Item name="suburbName" rules={[{ required: true, message: 'Please input the suburb name!' }]}>
          <Input placeholder="Suburb name" />
        </Form.Item>
        <Form.Item name="postalCode" rules={[{ required: true, message: 'Please input the postal code!' }]}>
          <Input placeholder="Postal code" />
        </Form.Item>
        <Form.Item name="phoneNumber" rules={[{ required: true, message: 'Please input the phone number!' }]}>
          <Input placeholder="Phone number" />
        </Form.Item>
        <Form.Item name="email" rules={[{ required: true, message: 'Please input the Email!' }]}>
          <Input placeholder="Email" />
        </Form.Item>
    
      </Form>
    </Modal>
  );
};

export default AddClinic;
