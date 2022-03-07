import React from "react";
import { Link } from 'react-router-dom';

const Card = (props) => {
    return (
    <div className="col-md-4" key={props.band._id}>
        <div className="card mb-4 box-shadow">
        <img 
            className="card-img-top" 
            data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" 
            alt="Thumbnail [100%x225]" 
            style={{height: 225, width: '100%', display: 'block'}}
            src={props.band.photo}
            data-holder-rendered="true" />
        <div className="card-body">
            <p className="card-text">
                Name: {props.band.Name}<br></br>
                Genre: {props.band.Genre}<br></br>
                Number of albums: {props.band.numberOfAlbums}<br></br>

            </p>
                <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                    <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                    <Link to={{pathname: '/bands/edit/'+props.band._id}}><button type="button" className="btn btn-sm btn-outline-secondary">Edit</button></Link>
                    <Link to={{pathname: '/bands/delete/'+props.band._id}}> <button type="button" className="btn btn-sm btn-outline-secondary">Delete</button></Link>
                </div>
                <small className="text-muted">{ props.band.Name }</small>
            </div>
        </div>  
    </div>
  </div>
  )
}

export default Card;