import React from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import { EditAppiontModalProps } from './types';

const EditAppiontModal: React.FC<EditAppiontModalProps> = ({ appiont, visible, onEditSubmit, onCancel }) => {
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
        <Button className="bg-blue-600 text-white" key="submit" onClick={() => form.submit()}>
          Save
        </Button>,
      ]}
    >
      <Form
        form={form}
        initialValues={appiont}
        onFinish={onEditSubmit}
      >
        <Form.Item name="doctor" rules={[{ required: true, message: 'Please select a doctor!' }]}>
        </Form.Item>
        <Form.Item name="treatment" rules={[{ required: true, message: 'Please select a treatment!' }]}>
        
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

export default EditAppiontModal;
