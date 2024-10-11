import LOGIN from "./Login";
import EMP from "./emp";
import Logout from "./Logout";
import MAN from "./Man";
import { createBrowserRouter,RouterProvider } from "react-router-dom";


     const router=createBrowserRouter([
          {
            path:"/login",
            element:<LOGIN />,
          },
          {
            path:"/:id/employee",
            element:<EMP />,
            errorElement:<LOGIN/>
          },
          {
            path:"/:id/manager",
            element:<MAN />,
            errorElement:<LOGIN />
          },
          {
            path:"/:id/logout",
            element:<Logout/>
          }
        ])
        
        export default function  App(){
          
          return (
         <RouterProvider router={router}/>
          )}