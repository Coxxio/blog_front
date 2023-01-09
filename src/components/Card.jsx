import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions, CardHeader } from "@mui/material";
import * as dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { setNewIndex } from "../app/services/post/postSlice";
import { useNavigate } from "react-router-dom";

export default function OutlinedCard({ post, index }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setNextPrevious = async () => {
    await dispatch(setNewIndex(index));
    navigate(`/post/${post.id}`)
  }
  return (
    <Box>
      <Card variant="outlined" sx={{ minWidth: 275 }}>
        <CardHeader
          title={post.title}
          subheader={
            "Fecha de Publicacion: " + dayjs(post.pub_date).format("DD/MM/YYYY")
          }
        />
        <CardContent maxHeight={400}>
          <Typography variant="h5" component="div">
            {post.resume}
          </Typography>
          <Box
            component="div"
            sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
          >
            <Typography
              variant="body2"
              maxHeight={100}
              textOverflow={"ellipsis"}
            >
              {post.content}
            </Typography>
          </Box>
        </CardContent>
          <CardActions>
              <Button size="small" onClick={setNextPrevious}>Learn More</Button>
          </CardActions>
      </Card>
    </Box>
  );
}
