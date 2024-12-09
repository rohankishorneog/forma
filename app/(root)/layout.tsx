import React, { ReactNode } from "react";
import NavBar from "../components/NavBar/NavBar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="w-screen h-screen">
      <NavBar />
      {children}
      
    </main>
  );
};

export default Layout;
