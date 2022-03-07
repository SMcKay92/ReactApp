import React from 'react';
import '../css/signin.css';
import dataService from '../services/dataService';
import Joi from "joi-browser";

export default class CreateForm extends React.Component
{
   constructor(props)
   {
      super(props);
      this.state = 
      {
         data: 
         {
            Name:"", 
           Genre:"", 
           numberOfAlbums:0, 
           city:"",
           country:"",
           year:0,
          photo:"",
         },

         errors: []
      };
   }

   validationSchema = 
   {
      Name: Joi.string().required(),
      Genre: Joi.string().valid("Prog Rock", "Hard Rock", "Heavy Metal", "Speed Metal", "Doom Metal", "Thrash Metal", "Blues", "Rock", "Jazz", "Pop").required(),
      numberOfAlbums: Joi.number(),
      city: Joi.string(),
      country: Joi.string(),
      year: Joi.number(),
      photo: Joi.string()
   }

   handleSubmit = (e) =>
   {
      e.preventDefault();
      const result = Joi.validate(this.state.data, this.validationSchema, { abortEarly: false });
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
         dataService.createBand(this.state.data, (err, success) => 
         {
            if(!success)
            {
               const newErrors = []; //for state
               const error = {};
               console.log(err);

               switch(err.status)
               {
                  case 400: 
                  {
                     error.message = "Server error";
                  }
               }
               newErrors.push(error);
               this.setState({error: newErrors});
               return;
            }
            else return this.props.history.push('/');
         });
      }
   }

   handleChange = (e) =>
   {

      const newData = {...this.state.data};
      console.log(this.state.data)
      newData[e.target.name] = e.target.value;
      this.setState({data: newData});
   }

   render()
   {
      return ( 
         <form className="form-signin" onSubmit={this.handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal text-center">Create Band</h1>
            <label htmlFor="Name" >Band name:</label>
                <input onChange={this.handleChange} name="Name" type="text" id="Name" className="form-control" 
                 />

                <label htmlFor="inputGenre">Genre:</label>
                <input onChange={this.handleChange} name="Genre" type="text" id="inputGenre" 
                 className="form-control" />

                <label htmlFor="numberOfAlbums">Number of Albums:</label>
                <input onChange={this.handleChange} name="numberOfAlbums" type="text" id="numberOfAlbums" 
                className="form-control" />

                <label htmlFor="inputCountry">Country:</label>
                <input onChange={this.handleChange} name="country" type="text" id="inputHP" 
                 className="form-control" />

                <label htmlFor="inputCity" >City:</label>
                <input onChange={this.handleChange} name="city" type="text" id="inputCity" 
                 className="form-control" />

                <label htmlFor="inputyear" >Year:</label>
                <input onChange={this.handleChange} name="year" type="text" id="inputYear" 
                className="form-control" />

                <label htmlFor="inputImage">Band Photo:</label>
                <input onChange={this.handleChange} name="photo" type="text" id="inputPhoto" className="form-control"  />
            <button className="btn btn-lg btn-primary btn-block" type="submit">Create</button>
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