import LOGIN from "./page/Login";
import EMP from "./page/emp";
import Logout from "./page/Logout";
import MAN from "./page/Man";
import { createBrowserRouter,RouterProvider } from "react-router-dom";


     const router=createBrowserRouter([
      {
        path:"/",
        element:<LOGIN />,
      },
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