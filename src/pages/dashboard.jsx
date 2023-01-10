import { Container } from "@mui/system";
import React, { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import OutlinedCard from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "../app/services/post/postThunk";
import { useParams } from "react-router-dom";

export default function Dashboard() {
  const posts_list = useSelector((state) => state.post.post_list);
  const dispatch = useDispatch();
  const { data } = useParams();

  useEffect(() => {
    console.log(data);
    if (data) {
      dispatch(fetchPost(data));
    } else {
      dispatch(fetchPost())
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    }
  }, [dispatch, data]);
  return (
    <Fragment>
      <Helmet>
        <title>Inicio</title>
      </Helmet>
      <Container>
        {posts_list.map((post, index) => {
          return <OutlinedCard key={post.id} post={post} index={index} />;
        })}
      </Container>
    </Fragment>
  );
}
