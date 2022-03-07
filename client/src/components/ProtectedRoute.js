import React from "react";
import {Route, Redirect} from "react-router-dom";
import authService from "../services/authService";

const ProtectedRoute = ({component: Component, ...rest}) =>
{
   return (
      <Route {...rest} render=
      {(props) => 
         {
            if(authService.isAuthenticated()) return <Component {...props}/>;
            else return <Redirect to={{pathname: "/signin", referer: props.location.pathname}}/>
         }
      }/>
   );
}

export default ProtectedRoute;