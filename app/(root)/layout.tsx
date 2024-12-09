import React, { ReactNode } from "react";
import NavBar from "../components/NavBar/NavBar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <NavBar />
      {children}
    </main>
  );
};

export default Layout;
