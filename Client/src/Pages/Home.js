import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import moment from "moment";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Container, Divider, Stack } from "@mui/material";
// const blogsamples = require("../BlogsSample.js");
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Home() {
  const [posts, setposts] = useState([]);
  const cat = useLocation().search;
  const location = useLocation();
  console.log(posts);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/posts${cat}`);
        setposts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div>
      <Container maxWidth="m">
        <Stack>
          <h1
            style={{
              fontFamily: "poppins",
              fontWeight: "500",
              fontSize: "2vw",
              cursor: "default",
              marginTop: "25px",
              textDecoration:"underline"
            }}
          >
            Latest Blog Posts
          </h1>
        </Stack>

        <Box sx={{ width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item >
              <div>
                <Grid container rowSpacing={1} columnSpacing={{ md: 3 }}>
                  {posts.map((value, index) => {
                    return (
                      <Grid item>
                        <Card sx={{ width: "23vw " }} elevation={2}>
                          <CardMedia component="img" image={value.img} />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              <Link
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                                to={`/post/${posts[index].id}}`}
                              >
                                {value.title}
                              </Link>
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button size="small">
                              {" "}
                              {moment(value.date).fromNow()}
                            </Button>
                            <Button size="small">{value.username}</Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </div>{" "}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default Home;
