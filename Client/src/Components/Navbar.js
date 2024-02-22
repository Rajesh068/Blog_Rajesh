import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Logo from "../Images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import compose from "../Images/compose.png"




function Navbar() {

    const navigate = useNavigate();
    const {currentUser,logout} = React.useContext(AuthContext);


  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{backgroundColor:"black",padding:"20px",color:"white"}} elevation={0}>
          <Toolbar>
            <img style={{height:"70px",cursor:"pointer"}} src={Logo} onClick={()=>{navigate('/')}}></img>
            
            <div style={{ flexGrow: 1,display:"flex",gap:"3vw" }}>
            <Typography variant="h6" component="div"  >
            <Link style={{ textDecoration: 'none',color:"white" }} to="?cat=windows" >WINDOWS</Link>
            </Typography>
            <Typography variant="h6" component="div" >
            <Link style={{ textDecoration: 'none',color:"white" }} to="?cat=android" >ANDROID</Link>
            </Typography>
            <Typography variant="h6" component="div" >
            <Link style={{ textDecoration: 'none',color:"white" }} to="?cat=ios" >IOS</Link>
            </Typography>
            <Typography variant="h6" component="div" >
            <Link style={{ textDecoration: 'none',color:"white" }} to="?cat=macos" >MACOS</Link>
            </Typography>
            <Typography variant="h6" component="div" >
            <Link style={{ textDecoration: 'none',color:"white" }} to="?cat=linux" >LINUX</Link>
            </Typography>
            </div>


            <div style={{display:"flex",flexDirection:"row",alignItems:"center",gap:"1.2vw"}}>
            <Typography variant="h6" component="div" >
            {currentUser?<>Welcome {currentUser.username} !</>:<></>}
            </Typography>
               {currentUser?<> <IconButton onClick={()=>{navigate("/write")}} >
                    <img height={50} style={{marginRight:"15px"}} src={compose}></img>
                </IconButton></>:<></>}
                
            {currentUser?<>
              <Button color="inherit" sx={{border:"3px solid white !important"}}  variant="outlined" onClick={logout} >Logout</Button>

            </>:<>
            <Button color="inherit" sx={{border:"3px solid white !important"}}  variant="outlined" onClick={()=>{navigate('/login')}} >Login</Button>

            </>}
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <ToastContainer />
    </div>
  );
}

export default Navbar;
