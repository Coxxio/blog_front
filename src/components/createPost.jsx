import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, MenuItem, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { getOnePost, postPost, putPost } from "../app/services/post/postThunk";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { setNewPost } from "../app/services/post/postSlice";

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
  const post_actual = useSelector((state) => state.post.post_actual);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  React.useEffect(() => {
    if (!user) {
      navigate("/");
    }
    if (id) {
      dispatch(getOnePost(id));
    } else {
      dispatch(setNewPost(initialState));
    }
  }, [dispatch, navigate, id, user]);
  const handleChange = (ev) => {
    dispatch(setNewPost({ ...post_actual, [ev.target.name]: ev.target.value }));
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!id) {
      await dispatch(postPost(post_actual))
        .then((res) => {
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
    } else {
      await dispatch(putPost(post_actual))
        .then((res) => {
          toast.success(res.payload.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate(`/post/${post_actual.id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
              value={post_actual.title}
              onChange={handleChange}
            />
            <TextField
              id="resume"
              name="resume"
              label="Resumen del Post"
              variant="outlined"
              value={post_actual.resume}
              onChange={handleChange}
            />
            <TextField
              id="category"
              select
              name="category"
              label="Select"
              defaultValue={post_actual.category}
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
            value={post_actual.content}
            onChange={handleChange}
          />
          <Box
            sx={{ display: "flex", justifyContent: "right", padding: "5px" }}
          >
            <Button variant="outlined" size="large" type="submit">
              {id ? "Editar" : "Crear"}
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
