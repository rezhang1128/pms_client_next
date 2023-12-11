import React from 'react';
import { UserOutlined, CalendarOutlined, ClockCircleOutlined , FileOutlined, LogoutOutlined } from '@ant-design/icons';  
import Link from 'next/link';

const navbarItems = [
    {
      name: "Doctor Schedules",
      icon: <ClockCircleOutlined style={{ color: 'white' }} />,
    },
    {
      name: "Patient Appointments",
      icon: <CalendarOutlined style={{ color: 'white' }} />,
    },
    {
      name: "Forms",
      icon: <FileOutlined style={{ color: 'white' }} />,
    },
    {
      name: "Profile",
      icon: <UserOutlined style={{ color: 'white' }} />,
    },
    {
      name: "Sign Out",
      icon: <LogoutOutlined style={{ color: 'white' }} />,
    },
  ];
  

export default function Navbar () {
    const iconStyle = { color: 'white' };

  return (
    <nav className="bg-cyan-950 w-1/5 fixed top-0 left-0 bottom-0 overflow-y-auto p-4 m-4 rounded-2xl">
      <div className="mb-6">
        <div className="flex items-center space-x-3 p-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuDoisN_XW3IVsEn4qXXTiqfTFBCCQOWqDFg&usqp=CAU"
            alt="User"
            className="w-12 h-12 rounded-xl"
          />
          <div>
            <p className="text-white font-semibold">Welcome back,</p>
            <p className="text-white">Username</p>
          </div>
        </div>
      </div>

      <hr className="border-b border-gray-600 mb-6" />

      <ul>
        {navbarItems.map((item, index) => (
          <li key={index} className="flex items-center space-x-3 py-2">
            {item.icon}
            <Link href="#" className="text-white navbar-items">{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
