import React from 'react';
import {Redirect} from "react-router-dom";
import authService from '../services/authService';

export default class SignOut extends React.Component
{
   componentDidMount = () =>
   {
      authService.logout(() => 
      {
         this.props.history.push("/");
      });
   }

   render()
   {
      return <React.Fragment></React.Fragment>
   }
}