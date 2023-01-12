import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Delete } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../app/services/post/postThunk";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #FF5733",
  boxShadow: 24,
  p: 4,
};

export default function DeletePost({ post_actual }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async () => {
    await dispatch(deletePost(post_actual)).then((res) => {
      toast.success(res.payload.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
    navigate("/");
  };

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <Delete />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Esta seguro que desea elimiar el post {post_actual.title}?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "right" }}>
            <Button color="success" variant="outlined" onClick={handleClose}>
              Cancelar
            </Button>
            <Button color="error" variant="outlined" onClick={handleDelete}>
              Eliminar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
