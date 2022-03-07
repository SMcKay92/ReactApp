import React from 'react';
import '../css/signin.css';
import dataService from '../services/dataService';
import { Link } from 'react-router-dom';

class Delete extends React.Component {

    handleClick = () => {

            dataService.deleteBand(this.props.match.params.id, (err, success) => {
                if(!success){
                    return console.log(err)
                }
                this.props.history.push('/');
            })
        }

    render(){
        console.log(this.props)
        return(
            <div className="card mx-auto w-50 mt-5">
                <h2 className="text-center card-header">Delete Band?</h2>
                <div className="card-body mx-auto">
                <Link to={{pathname: '/'}}><button className="btn btn-dark">Back</button></Link>
                <h2 className="btn btn-danger" onClick={this.handleClick}>Delete Band</h2>
                </div>
                
            </div>
        )
    }

}

export default Delete;