// routes.tsx
import { lazy } from "react";
import { Navigate, type RouteObject } from "react-router-dom";
import { AuthRedirect, RedirectToLogin } from "./protectRoute.tsx";
import Users from "./pages/Users.tsx";
import PurchaseRequest from "./pages/PurchaseRequest.tsx";

const Home = lazy(() => import("./pages/Home.tsx"));
const Login = lazy(() => import("./pages/Login.tsx"));
// const About = lazy(() => import("./pages/About"));
// const User = lazy(() => import("./pages/User"));
// const Dashboard = lazy(() => import("./pages/Dashboard"));
// const NotFound = lazy(() => import("./pages/NotFound"));



export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
    

      <Home />
  
    ),
    children:[
      {index:true,element:<Users/>},
      {path:'/purchase',element:<PurchaseRequest/>}
    ]
  },
  { path: "/login", element: (
  
    <AuthRedirect redirectTo="/">

    <Login />
    </AuthRedirect>

) },
  //   { path: "/about", element: <About /> },
  //   { path: "/user/:id", element: <User /> },
  //   { path: "/dashboard/*", element: <Dashboard /> }, // nested
  //   { path: "*", element: <NotFound /> },
];
