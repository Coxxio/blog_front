import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import ResponsiveAppBar from "./components/AppBar";
import Login from "./pages/login";
import CardDetail from "./components/CardDetail";
import { ToastContainer } from "react-toastify";
import useData from "./utils/hooks/useData";
import CreatePost from "./components/createPost";
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
            element={<CardDetail user={data.user}/>}
          />
          <Route
            path="/posts/:category"
            element={<Dashboard />}
          />
          <Route
            path="/new_post"
            element={<CreatePost user={data.user}/>}
          />
        </Route>
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
  );
}

export default App;
