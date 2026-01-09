// routes.tsx
import { lazy } from "react";
import {  type RouteObject } from "react-router-dom";
import { AuthRedirect, IndexRedirect } from "./protectRoute.tsx";
import Users from "./pages/Users.tsx";
import PurchaseRequest from "./pages/PurchaseRequest.tsx";
import Plans from "./pages/Plans.tsx";
import Index from "./pages/Index.tsx";
import Payment from "./pages/Payment.tsx";
import Message from "./pages/AdminChatUI.tsx";
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
      {index:true,element:(
    <AuthRedirect redirectTo="/users">

    <Index />
    </AuthRedirect>)},
      {path:"/users",element:(
      <IndexRedirect redirectTo="/">

        <Users/>
      </IndexRedirect>
    )},
      {path:'/purchase',element:(
      <IndexRedirect redirectTo="/">

        <PurchaseRequest/>
      </IndexRedirect>
    )},
      {path:'/plans',element:(
      <IndexRedirect redirectTo="/">

      <Plans/>
      </IndexRedirect>
    )},
      {path:'/message',element:(
      <IndexRedirect redirectTo="/">

      <Message/>
      </IndexRedirect>
    )},
      {path:'/payment',element:(
      <IndexRedirect redirectTo="/">

      <Payment/>
      </IndexRedirect>
    )},
    ]
  },
  { path: "/login", element: (
  
    <AuthRedirect redirectTo="/users">

    <Login />
    </AuthRedirect>

) },
  //   { path: "/about", element: <About /> },
  //   { path: "/user/:id", element: <User /> },
  //   { path: "/dashboard/*", element: <Dashboard /> }, // nested
  //   { path: "*", element: <NotFound /> },
];
