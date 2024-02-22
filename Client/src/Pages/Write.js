import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState,useRef,usememo } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import moment from "moment";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {useLocation} from 'react-router-dom';
import JoditEditor from 'jodit-react';




function Write() {
  const navigate = useNavigate();
  const location = useLocation();

  const postIdToEdit  = location?.state?.postid;
  const postEdit = location?.state?.post;
  const [categorySelect, setcategorySelect] = React.useState("");
  const getUID = localStorage.getItem("user");
  const userData = JSON.parse(localStorage.getItem("user"))




  const [inputs, setinputs] = useState({
    title: "",
    desc: "",
    img: "",
    date: null,
    uid: null,
    category: null,
  });

  useEffect(() => {
    if(postIdToEdit){
      setinputs({
        title:postEdit.title,
    desc: postEdit.desc,
    img: postEdit.img,
    date: postEdit.date,
    uid: postEdit.uid,
    category: postEdit.category,

      })
    }
  }, [])
  


  const handleChange = (e) => {
    setinputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setinputs((prev) => ({ ...prev, date: moment().format() }));
    setinputs((prev) => ({ ...prev, uid: JSON.parse(getUID).id }));
    setinputs((prev) => ({ ...prev, category: categorySelect }));
  };

  const handleCategoryChange = (event) => {
    setcategorySelect(event.target.value);
  };
  const addData = async (e) => {
    e.preventDefault();
    const addPost = await axios.post("http://localhost:8080/api/posts/", inputs);
    toast.success("Post Added Successfully");
    setTimeout(() => {
      navigate("/")
    }, 1000);
    console.log(addPost);
  };



  const updatePost = async (e)=>{
       await axios.put(`http://localhost:8080/api/posts/${postIdToEdit}`,inputs);
    toast.success("Post Updated Successfully");
    setTimeout(() => {
      navigate("/")
    }, 1000);
  }
  console.log(inputs);

  return (
    <div>
      {userData?<><Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "5vh",
          "&:hover": {},
        }}
      >
        <Box sx={{ width: "50%", padding:"4vh",border:"1px solid gray",         boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
 }}>
        <h1
            style={{
              fontFamily: "poppins",
              fontWeight: "500",
              fontSize: "2vw",
              cursor: "default",
              fontStyle: "italic",
              marginTop: "25px",
              marginBottom:"15px"
            }}
          >
            
            {postIdToEdit?<>Edit Your Post !</>:<>Create A Post !</>}
          </h1>
          <Stack spacing={2}>
            <TextField
              id="outlined-basic"
              label="Enter Title"
              variant="outlined"
              name="title"
              onChange={handleChange}
              value={inputs.title}
            />
            <TextField
              id="outlined-basic"
              label="Enter Description"
              multiline
              rows={6}
              variant="outlined"
              name="desc"
              onChange={handleChange}
              value={inputs.desc}

            />
            <TextField
              id="outlined-basic"
              label="Enter Image Url"
              variant="outlined"
              name="img"
              onChange={handleChange}
              value={inputs.img}

            />
            {postIdToEdit?<>
              </>:<><Select
              value={categorySelect}
              onChange={handleCategoryChange}  
            
            >

              <MenuItem value={"windows"}>Windows</MenuItem>
              <MenuItem value={"android"}>Android</MenuItem>
              <MenuItem value={"ios"}>IOS</MenuItem>
              <MenuItem value={"macos"}>MacOs</MenuItem>
              <MenuItem value={"linux"}>Linux</MenuItem>
            </Select></>}

            <br></br>
            <Box style={{ display: "flex", justifyContent: "center" }}>
              
            {postIdToEdit?
            <>
            <Button
                variant="contained"
                sx={{
                  background: "black",
                  color: "white",
                  width: "50%",
                  padding: "10px",
                }}
                onClick={updatePost}
              >
                            

                UPDATE POST
              </Button>
            </>:
            <>
            <Button
                variant="contained"
                sx={{
                  background: "black",
                  color: "white",
                  width: "50%",
                  padding: "10px",
                }}
                onClick={addData}
              >
                            

                ADD POST
              </Button>
            </>}
              
            </Box>
          </Stack>
        </Box>
      </Box></>:<>
      <center style={{marginTop:"3vh"}} ><h1>You Are Not Authrosied</h1></center>
      </>}
    </div>
  );
}

export default Write;
