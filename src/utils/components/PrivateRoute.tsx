import WithAuth, {type WithInjectedAuth} from "../context/WithAuth.tsx";
import {Navigate} from "react-router-dom";
import type {JSX} from "react";

const PrivateRoute = (props: { children: React.ReactNode } & WithInjectedAuth): JSX.Element => {
  console.log("PrivateRoute", props.isAuthenticated);
  return props.isAuthenticated ? (
    <>{props.children}</>
  ) : (
    <Navigate
      replace={true}
      to="/login"
      state={{ from: `${location.pathname}${location.search}` }}
    />
  )
}

const PrivateRouteWithAuth =  WithAuth(PrivateRoute);
export default PrivateRouteWithAuth;