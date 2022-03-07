import React from 'react';
import '../css/main.css'
import 'font-awesome/css/font-awesome.min.css';
import dataService from "../services/dataService"
import Card from './Card';

class Main extends React.Component {

  state = {
    bands: []
  };


componentDidMount()
{
  dataService.getBands((err, bands) => {
      if(err) return console.log(err)
      this.setState({bands})
  }) 
}


  render(){
    return ( 
      <div>
        <section className="jumbotron text-center">
          <div className="container">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search this site" />
              <div className="input-group-append">
                <button className="btn btn-secondary" type="button">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row">

            {
              this.state.bands.map(band => {
                return <Card band={band}/>
              })
              }

            </div>
          </div>
        </div>
      </div>
    );
  }
}
 
export default Main;