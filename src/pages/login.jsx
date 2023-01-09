import { Helmet } from "react-helmet";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Container } from "@mui/material";
import { LoginService } from "../services/login";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    LoginService({ email, password })
      .then((res) => {
        debugger;
        navigate("/");
      })
      .catch((err) => {
        debugger;
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
          height: 300,
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        // onSubmit={handleSubmit}
      >
        <Container display="flex" aligncontent={"center"}>
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
          <Button variant="outlined" margin={"center"} onClick={handleSubmit}>
            Login
          </Button>
        </Container>
      </Box>
    </div>
  );
}
