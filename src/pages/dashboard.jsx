import { Container } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import OutlinedCard from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "../app/services/post/postThunk";
import { useParams } from "react-router-dom";
import { Pagination } from "@mui/material";

export default function Dashboard() {
  const [page, setPage] = useState(1);
  const posts_list = useSelector((state) => state.post.post_list);
  const total_post = useSelector((state) => state.post.total_post);
  const dispatch = useDispatch();
  const { category } = useParams();

  const changePage = (ev) => {
    setPage(ev.target.innerText);
  };

  useEffect(() => {
    console.log(category);
    if (category) {
      dispatch(fetchPost({ category, page, limit: 5 }));
    } else {
      dispatch(fetchPost({ page, limit: 5 }))
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    }
  }, [dispatch, category, page]);
  return (
    <Fragment>
      <Helmet>
        <title>Inicio</title>
      </Helmet>
      <Container>
        {posts_list.map((post, index) => {
          return <OutlinedCard key={post.id} post={post} index={index} />;
        })}
        <Pagination
          count={total_post}
          color="primary"
          variant="outlined"
          onChange={changePage}
        />
      </Container>
    </Fragment>
  );
}
