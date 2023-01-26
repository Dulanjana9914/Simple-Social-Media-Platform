import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./screens/homepage";
import LoginPage from "./screens/loginpage";
import { useSelector } from "react-redux";
import Register from "./screens/registerpage";

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div className="app">  
      <BrowserRouter>
        <Routes>
            <Route path="/" exact element={<LoginPage />} />
            <Route path="/register" exact element={<Register />} />
            <Route path="/posts"  element={isAuth ? <HomePage /> : <Navigate to="/" />} />
        </Routes>
     </BrowserRouter>  
    </div>
  );
}

export default App;
