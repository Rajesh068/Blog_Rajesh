import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Register from "./Pages/Register.js"
import Login from "./Pages/Login.js"
import Single from "./Pages/Single.js"
import Home from "./Pages/Home.js"
import Navbar from "./Components/Navbar.js";
import Write from "./Pages/Write.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ()=>{
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/post/:id",
        element:<Single/>
      },
      {
        path:"/write",
        element:<Write/>
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/register",
        element: <Register/>,
      },
    ]
  },
  // {
  //   path: "/register",
  //   element: <Register/>,
  // },
  // {
  //   path: "/login",
  //   element: <Login/>,
  // },
  // {
  //   path: "/register",
  //   element: <Register/>,
  // },
]);


function App() {
  return (
    <div className="app" >
      <div className="container">
      <RouterProvider router={router} />
      </div>
    </div>
  );
}





export default App;
