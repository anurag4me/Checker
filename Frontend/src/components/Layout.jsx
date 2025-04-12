import React from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
  return (
    <>
      <Navbar />
      {/* Outlet renders the current route selected */}
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
