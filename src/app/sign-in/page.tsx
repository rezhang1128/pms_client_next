'use client';

import { Formik, Form, Field } from 'formik';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://media.istockphoto.com/id/1077026512/photo/nature-inspired-table.jpg?s=612x612&w=0&k=20&c=TthBCamXFsPZt2CaCfd2EzuzeImWiwKTUZJTMEIKFcI=')" }}>
      <div className="bg-white bg-opacity-90 px-12 py-6 rounded-lg shadow-md relative">
        <div className="h-24 w-5/6 bg-cyan-950 absolute -top-4 left-1/2 transform -translate-x-1/2 rounded-lg flex items-center justify-center">
          <p className="text-white font-mono font-semibold tracking-widest text-4xl">Vendure</p>
        </div>

        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          <Form className="w-full max-w-xl space-y-4 mt-24"> 
            <div className="flex flex-col">
              <Field type="text" name="username" placeholder="Username or email" className="border border-gray-300 rounded-md py-2 px-6 w-full" /> 
            </div>
            <div className="flex flex-col pb-5">
              <Field type="password" name="password" placeholder="Password" className="border border-gray-300 rounded-md py-2 px-6 w-full" /> 
            </div>
            
            <button type="submit" className="w-full bg-cyan-950 text-white rounded-md py-2 mt-2 hover:bg-blue-600 transition duration-300">Sign In</button>

            <div className="text-center pt-2">
              <a href="#" className="text-sm text-amber-900">Forgot your Password?</a>
            </div>
            <div className="text-center">
              <p className="text-sm">Don't have an account? <a href="../sign-up" className="text-amber-500 font-semibold">Sign up</a></p>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}