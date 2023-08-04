import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { checkLoginUser } from "./features/userSlice";

function App() {
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);

  const dispatch = useDispatch()
  const userToken = localStorage.getItem("user_token");

  const userGlobal = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(checkLoginUser(userToken)).then(() => setIsCheckingLogin(false));
  }, [dispatch]);

  if (isCheckingLogin) return <div>Checking login...</div>;

  return (
    <div className="bg-neutral-50">
      <Routes>
        <Route path="/items" element={userGlobal.id ? <Home /> : <Navigate to="/" />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
