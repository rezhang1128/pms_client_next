"use client";

import { Button } from "antd";
import { Formik, Form, Field } from "formik";

export default function SignInPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/1077026512/photo/nature-inspired-table.jpg?s=612x612&w=0&k=20&c=TthBCamXFsPZt2CaCfd2EzuzeImWiwKTUZJTMEIKFcI=')",
      }}
    >
      <div className="bg-white bg-opacity-90 px-12 py-6 rounded-lg shadow-md relative sm:mx-4">
        <div className="h-24 w-5/6 bg-cyan-950 absolute -top-4 left-1/2 transform -translate-x-1/2 rounded-lg flex items-center justify-center">
          <p className="text-white font-mono font-semibold tracking-widest text-4xl">
            Vendure
          </p>
        </div>

        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          <Form className="w-full max-w-xl space-y-4 mt-24">
            <div className="flex flex-col">
              <label htmlFor="username" className="text-gray-700 font-semibold mb-1">Username or Email:</label>
              <Field
                type="text"
                id="username"
                name="username"
                className="border border-gray-300 rounded-md py-2 px-6 w-full"
              />
            </div>
            <div className="flex flex-col pb-5">
              <label htmlFor="password" className="text-gray-700 font-semibold mb-1">Password:</label>
              <Field
                type="password"
                id="password"
                name="password"
                className="border border-gray-300 rounded-md py-2 px-6 w-full"
              />
            </div>


            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
            >
              Sign In
            </Button>

            <div className="text-center pt-2">
              <a href="#" className="text-sm text-amber-900">
                Forgot your Password?
              </a>
            </div>
            <div className="text-center">
              <p className="text-sm">
                Don&apos;t have an account?{" "}
                <a href="../sign-up" className="text-amber-500 font-semibold">
                  Sign up
                </a>
              </p>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}