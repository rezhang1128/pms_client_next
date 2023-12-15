import React from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import {appiontmentProp} from "../../lib/types";

export default function EditAppiontModal({ appiont, visible, onEditSubmit, onCancel }:{
  appiont:  appiontmentProp | null;
  visible: boolean;
  onEditSubmit: (values:  appiontmentProp) => void;
  onCancel: () => void;
}){
  const [form] = Form.useForm();
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
        initialValues={appiont||undefined}
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
        <Form.Item name="location" label="Location" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="patient" label="Patient" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="clinic" label="Clinic" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
