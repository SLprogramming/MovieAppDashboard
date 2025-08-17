import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useStoreSelector } from "./store/store";







type ProtectedRouteProps = {
  children: ReactNode;
  redirectTo:string,
 
};

export const AuthRedirect = ({ children ,redirectTo}: ProtectedRouteProps) => {
    const {userId} = useStoreSelector(state => state.user)

  if (userId) {
    // Not logged in → redirect to /login
    return <Navigate to={redirectTo} replace />;
  }

  // Logged in → render the child component
  return <>{children}</>;
};
export const RedirectToLogin = ({ children ,redirectTo}: ProtectedRouteProps) => {
    
    const {userId} = useStoreSelector(state => state.user)

  if (!userId) {
    // Not logged in → redirect to /login
    return <Navigate to={redirectTo} replace />;
  }

  // Logged in → render the child component
  return <>{children}</>;
};


