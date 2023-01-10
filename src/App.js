import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import ResponsiveAppBar from "./components/AppBar";
import Login from "./pages/login";
import CardDetail from "./components/CardDetail";
import { ToastContainer } from "react-toastify";
import useData from "./utils/hooks/useData";
function App() {
  const { data, setData } = useData();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="miblog/admin" element={<Login setData={setData}/>} />
        <Route path="/" element={<ResponsiveAppBar user={data.user} setData={setData}/>}>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/post/:id"
            element={<CardDetail />}
          />
          <Route
            path="/posts/:data"
            element={<Dashboard />}
          />
        </Route>
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
  );
}

export default App;
