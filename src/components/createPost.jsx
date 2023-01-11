import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, MenuItem, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useDispatch } from "react-redux";
import { postPost } from "../app/services/post/postThunk";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const category = [
  { value: "Desarrollo", label: "Desarrollo" },
  { value: "Variedades", label: "Variedades" },
  { value: "Videojuegos", label: "Videojuegos" },
  { value: "Vida Diaria", label: "Vida Diaria" },
];
const initialState = {
  title: "",
  resume: "",
  category: "Desarrollo",
  content: "",
};
export default function CreatePost({ user }) {
  const [form, setForm] = React.useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      navigate("/");
    }
  });
  const handleChange = (ev) => {
    console.log(ev.target.name);
    setForm({ ...form, [ev.target.name]: ev.target.value });
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    await dispatch(postPost(form))
      .then((res) => {
        console.log(res);
        toast.success(res.payload, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Container>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Typography variant="h5" padding={"10px"}>
            Crear Nuevo Post
          </Typography>
          <Box
            component="div"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <TextField
              id="title"
              name="title"
              label="Titulo del Post"
              variant="outlined"
              value={form.title}
              onChange={handleChange}
            />
            <TextField
              id="resume"
              name="resume"
              label="Resumen del Post"
              variant="outlined"
              value={form.resume}
              onChange={handleChange}
            />
            <TextField
              id="category"
              select
              name="category"
              label="Select"
              defaultValue={form.category}
              helperText="Por favor seleccione categoria del post"
              onChange={handleChange}
            >
              {category.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <TextField
            id="content"
            name="content"
            label="Contenido del Post"
            placeholder="Contenido"
            multiline
            fullWidth
            value={form.content}
            onChange={handleChange}
          />
          <Box
            sx={{ display: "flex", justifyContent: "right", padding: "5px" }}
          >
            <Button variant="outlined" size="large" type="submit">
              Crear
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
