import React from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import { EditClinicModalProps } from './types';


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

const EditClinicModal: React.FC<EditClinicModalProps> = ({ clinic, visible, onEditSubmit, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Edit Clinic"
      open={visible}
      onOk={() => form.submit()}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button type='primary' key="submit" onClick={() => form.submit()}>
          Save
        </Button>,
      ]}
    >
      <Form
        form={form}
        initialValues={clinic||undefined}
        onFinish={onEditSubmit}
      >
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
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="street" label="Street" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditClinicModal;
