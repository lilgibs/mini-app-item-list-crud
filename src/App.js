import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { checkLoginUser } from "./features/userSlice";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

function App() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible)
  }

  const contentStyle = {
    marginLeft: isSidebarVisible ? '240px' : '0', // Geser konten sesuai dengan lebar sidebar
    transition: 'margin-left 0.3s ease-in-out',
    flex: '1',
    zIndex: 0
  }

  return (
    <div className="bg-neutral-50">
      <div className="flex">
        <Sidebar visible={isSidebarVisible} />
        {/* <div className="flex flex-col w-full"> */}
        <div style={contentStyle}>
          <Navbar onToggleSidebar={toggleSidebar} />
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
        {/* </div> */}
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;