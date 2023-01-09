import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import ResponsiveAppBar from "./components/AppBar";
import Login from "./pages/login";
import CardDetail from "./components/CardDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="miblog/admin" element={<Login />} />
        <Route path="/" element={<ResponsiveAppBar />}>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/post/:id"
            element={<CardDetail />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
