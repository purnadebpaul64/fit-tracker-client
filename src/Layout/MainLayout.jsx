import React from "react";
import { Outlet } from "react-router";
import Footer from "../Components/Shared/Footer/Footer";
import Navbar from "../Components/Shared/Navbar/Navbar";

const MainLayout = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div>
        <Navbar></Navbar>
      </div>
      <div>
        <Outlet></Outlet>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </section>
  );
};

export default MainLayout;
