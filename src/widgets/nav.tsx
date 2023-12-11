'use client';
import React, { Fragment } from 'react';
import { UserOutlined, CalendarOutlined, ClockCircleOutlined, FileOutlined, LogoutOutlined, DownOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Popover, Transition } from '@headlessui/react';

export default function Navbar() {
  const navbarItems = [
    { name: 'Doctor Schedules', icon: <ClockCircleOutlined style={{ color: 'black' }} /> },
    { name: 'Patient Appointments', icon: <CalendarOutlined style={{ color: 'black' }} /> },
    { name: 'Forms', icon: <FileOutlined style={{ color: 'black' }} /> },
    { name: 'Profile', icon: <UserOutlined style={{ color: 'black' }} /> },
    { name: 'Sign Out', icon: <LogoutOutlined style={{ color: 'black' }}/>},
  ];

  return (
    <div className="relative inline-block text-left">
      <Popover>
        {({ open }) => (
          <>
            <Popover.Button className="bg-cyan-950 text-white px-4 py-2 rounded flex items-center">
              Options <span className="ml-2"></span><DownOutlined />
            </Popover.Button>

            {open && (
              <Transition
                as={Fragment}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Popover.Panel>
                  <div className="z-10 absolute w-56 mt-1 rounded-md shadow-lg bg-white">
                    <div className="py-1">
                      {navbarItems.map((item, index) => (
                        <Link href="#" key={index}>
                          <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer">
                            <div className="flex items-center space-x-3">
                              <div>{item.icon}</div>
                              <div className="px-1">{item.name}</div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            )}
          </>
        )}
      </Popover>
    </div>
  );
}
