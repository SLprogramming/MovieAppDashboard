// routes.tsx
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const Home = lazy(() => import("./pages/Home.tsx"));
const Login = lazy(() => import("./pages/Login.tsx"));
// const About = lazy(() => import("./pages/About"));
// const User = lazy(() => import("./pages/User"));
// const Dashboard = lazy(() => import("./pages/Dashboard"));
// const NotFound = lazy(() => import("./pages/NotFound"));

export const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
//   { path: "/about", element: <About /> },
//   { path: "/user/:id", element: <User /> },
//   { path: "/dashboard/*", element: <Dashboard /> }, // nested
//   { path: "*", element: <NotFound /> },
];
