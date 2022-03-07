import React from 'react';
import '../css/signin.css';
import authService from '../services/authService';
import {Redirect} from "react-router-dom";
import JoiBrowser from "joi-browser";

export default class SignIn extends React.Component
{
   constructor(props)
   {
      super(props);
      this.state = 
      {
         credentials:
         {
            email: "",
            password: ""
         },
         errors: []
      };
   }

   validationSchema = 
   {
      email: JoiBrowser.string().email().required(),
      password: JoiBrowser.string().required()
   }

   handleSubmit = (e) =>
   {
      e.preventDefault();
      const result = JoiBrowser.validate(this.state.credentials, this.validationSchema, { abortEarly: false });
      const newErrors = [];

      if(result.error)
      {
         result.error.details.forEach(detail => 
         {
            //create new object
            const validationError = {};

            //fill with needed error data
            validationError.message = detail.message;
            validationError.field = detail.path[0];

            //add to newErrors array
            newErrors.push(validationError);
         });
      }
      this.setState({errors: newErrors});

      if(newErrors.length === 0)
      {
         authService.login(this.state.credentials, (err, success) => 
         {
            if(!success)
            {
               const newErrors = []; //for state
               const error = {};
               console.log(err);

               switch(err.status)
               {
                  case 401: 
                  {
                     error.message = "Invalid login";
                     break;
                  }
                  case 404: 
                  {
                     error.message = "User does not exist";
                     break;
                  }
               }
               newErrors.push(error);
               this.setState({errors: newErrors});
               return;
            }
            this.forceUpdate();
         });
      }
   }

   handleChange = (e) =>
   {

      const newCredentials = {...this.state.credentials};
      newCredentials[e.target.name] = e.target.value;
      this.setState({credentials: newCredentials});
   }

   render()
   {
      if(authService.isAuthenticated()) return <Redirect to="/"/>;
      else return ( 
         <form className="form-signin" onSubmit={this.handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal text-center">Sign in</h1>
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input onChange={this.handleChange} name="email" type="text" id="inputEmail" className="form-control" placeholder="Email address" autoFocus />
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input onChange={this.handleChange} name="password" type="password" id="inputPassword" className="form-control" placeholder="Password" />
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            {
               this.state.errors.length > 0 && 
                  <div className="alert alert-danger mt-2">
                     <ul>
                        {
                           this.state.errors.map((error, index) => 
                           {
                              return <li key={index}>{error.message}</li>
                           })
                        }
                     </ul>
                  </div>
            }
         </form>
      );
   }
}