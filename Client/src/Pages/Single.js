import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext.js";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { Avatar, Box, Button, Container, Stack } from "@mui/material";

function Single() {
  const [posts, setposts] = useState([]);
  const location = useLocation().search;
  const pathname = window.location.pathname;
  const postId = pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handlePostDelete = () => {
    const currentPostId = postId.split("%")[0];
    const del = axios.delete(`http://localhost:3000/posts/${currentPostId}`,
    );

    toast.success("Post Deleted Successfully");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };


  const handlePostUpdate = () => {
    const currentPostId = postId.split("%")[0];
    setTimeout(() => {
      navigate(`/write`,{state:{
        post:posts,
        postid:currentPostId
      }});
    }, 1000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/posts/${postId}`);
        setposts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [postId]);
  return (
    <>
      <div>
      <Container width="500px" sx={{display:"flex",alignItems:"center"}}>
        <Box style={{display:"flex",justifyContent:"center"}} >


        <Container maxWidth="m">
              <Box sx={{ height: "100%", marginTop: "2vh" }}>
                <div>
                  <img style={{ height: "45vh" }} src={posts?.img}></img>
                  <h1>{posts.title}</h1>
                  <p>{posts.desc}</p>
                  <p style={{marginTop:"1vh",fontWeight:"500"}}>{moment(posts.date).fromNow()}</p>


                  <p style={{fontWeight:"500"}}>Written By : {posts.username}</p>

                  {currentUser != null ? (
                    currentUser.username == posts.username ? (
                      <Box sx={{ marginTop: "2vh" }}>
                        <Button
                          style={{
                            backgroundColor: "black",
                            color: "white",
                            marginRight: "1vw",
                          }}
                          variant="contained"
                          onClick={handlePostUpdate}
                        >
                          Edit Post
                        </Button>
                        <Button
                          onClick={handlePostDelete}
                          color="error"
                          variant="contained"
                        >
                          Delete Post
                        </Button>
                      </Box>
                    ) : (
                      <></>
                    )
                  ) : (
                    <></>
                  )}
                  <ToastContainer />
                </div>
              </Box>
            </Container>

        </Box>
      </Container>
        
      </div>
      <ToastContainer />
    </>
  );
}

export default Single;
