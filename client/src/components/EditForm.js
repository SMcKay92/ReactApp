import React from 'react';
import '../css/signin.css';
import dataService from '../services/dataService';
import Joi from 'joi-browser';

class EditForm extends React.Component {
    state = {
        bandData: {
           Name:"", 
           Genre:"", 
           numberOfAlbums:0, 
           city:"",
           country:"",
           year:0,
          photo:"",
        },
        errors: []
    }

    componentDidMount(){
        dataService.getOneBand(this.props.match.params.id, (err, band) => {
            if(err) return console.log(err)
            this.setState({
                data: {
                Name: band.Name,
                Genre: band.Genre,
                numberOfAlbums: band.numberOfAlbums,
                city: band.founded.city, 
                country: band.founded.country,
                year: band.founded.year,
                photo: band.photo,
                }
            })
            console.log(this.state)
        })
        
      }

    validationSchema = {
        Name: Joi.string().required(),
        Genre: Joi.string().valid("Prog Rock", "Hard Rock", "Heavy Metal", "Speed Metal", "Doom Metal", "Thrash Metal", "Blues", "Rock", "Jazz", "Pop").required(),
        numberOfAlbums: Joi.number(),
        city: Joi.string(),
        country: Joi.string(),
        year: Joi.number(),
        photo: Joi.string()
    }

    handleSubmit = (e) => {
        e.preventDefault() 


        const result = Joi.validate(this.state.bandData, this.validationSchema, {abortEarly: false});

        const errors = []
        if(result.error){
            result.error.details.forEach(detail => {
                
                const error = {}

                error.message = detail.message
                error.field = detail.path[0]

                errors.push(error)

            });
        }
        this.setState({errors: errors})

        if(errors.length === 0 ) {
            console.log(this.state.bandData.bandname)
            dataService.updateBand({
                
                    Name: this.state.bandData.Name, 
                    Genre: this.state.bandData.Genre,
                    numberofAlbums: this.state.bandData.numberOfAlbums,
                    founded:{
                        country:this.state.bandData.country,
                        city:this.state.bandData.city,
                        year: this.state.bandData.year
                    },
                    photo: this.state.bandData.photo
                    
                },
                this.props.match.params.id, (err, success) => {
                if(!success){
                    const errors = []
                    const error = {}

                    switch(err.status){
                        case 404:{
                            
                            error.message = "Band not found"
                            break;
                            
                        }
                        case 400:{
                            error.message = "Server Error"
                            break;
                        }
                    }
                    errors.push(error)
                    this.setState({errors})

                    return
                }

                this.props.history.push('/');
            })
        }
    }

    handleChange = (e) =>{
        const bandData = { ...this.state.bandData }
        bandData[e.target.name] = e.target.value


        this.setState({bandData})
    }

    render(){
        return ( 
            
            <form className="form-signin" onSubmit={this.handleSubmit}>
                <h1 className="h3 mb-3 font-weight-normal text-center">Edit Band</h1>

                <label htmlFor="Name" >Band name:</label>
                <input onChange={this.handleChange} name="Name" type="text" id="Name" className="form-control" 
                value={this.state.bandData.Name} />

                <label htmlFor="inputGenre">Genre:</label>
                <input onChange={this.handleChange} name="Genre" type="text" id="inputGenre" 
                value={this.state.bandData.Genre} className="form-control" />

                <label htmlFor="numberOfAlbums">Number of Albums:</label>
                <input onChange={this.handleChange} name="numberOfAlbums" type="text" id="numberOfAlbums" 
                value={this.state.bandData.numberOfAlbums} className="form-control" />

                <label htmlFor="inputCountry">Country:</label>
                <input onChange={this.handleChange} name="country" type="text" id="inputHP" 
                value={this.state.bandData.country} className="form-control" />

                <label htmlFor="inputCity" >City:</label>
                <input onChange={this.handleChange} name="city" type="text" id="inputCity" 
                value={this.state.bandData.city} className="form-control" />

                <label htmlFor="inputyear" >Year:</label>
                <input onChange={this.handleChange} name="year" type="text" id="inputYear" 
                value={this.state.bandData.year} className="form-control" />

                <label htmlFor="inputImage">Band Photo:</label>
                <input onChange={this.handleChange} name="photo" type="text" id="inputPhoto" className="form-control" value={this.state.bandData.photo} />

                <button className="btn btn-lg btn-primary btn-block mt-4" type="submit">Edit Band</button>
                {   
                    this.state.errors.length > 0 && <div className="alert alert-danger mt-2">
                        <ul>
                            {
                                this.state.errors.map((error, i )=> {
                                    return <li key={i}>{ error.message }</li>
                                })
                            }
                        </ul>
                    </div>
                }
            </form>
        );
    }
}

export default EditForm;