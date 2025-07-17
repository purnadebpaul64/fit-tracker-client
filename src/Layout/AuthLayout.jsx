import React from "react";
import { Outlet } from "react-router";

import img from "../assets/auth_right_column2.webp";

const AuthLayout = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="grid min-h-screen md:grid-cols-2">
        <div className="flex items-center justify-center">
          <Outlet />
        </div>

        <div className="h-full w-full hidden md:flex">
          <img
            src={img}
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
