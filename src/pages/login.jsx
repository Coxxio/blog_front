import { Helmet } from "react-helmet";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Container, Typography } from "@mui/material";
import { LoginService } from "../services/login";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login({ setData }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    LoginService({ email, password })
      .then((res) => {
        setData(res.data);
        navigate("/");
      })
      .catch((err) => {
        toast.error("Error al iniciar sesion", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Box
        component="form"
        border={2}
        borderRadius
        margin={"auto"}
        marginTop={20}
        sx={{
          width: 300,
          height: "auto",
          padding: "15px",
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        // onSubmit={handleSubmit}
      >
        <Container display="flex" aligncontent={"center"}>
          <Typography>Admin Login</Typography>
          <TextField
            id="email_input"
            label="Email"
            type="email"
            value={email}
            autoComplete="current-email"
            onChange={({ target }) => setEmail(target.value)}
          />

          <TextField
            id="password_input"
            label="Password"
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="outlined" margin={"center"} onClick={handleSubmit}>
              Login
            </Button>
          </Box>
        </Container>
      </Box>
    </div>
  );
}
