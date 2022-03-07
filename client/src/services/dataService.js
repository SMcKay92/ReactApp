import Axios from 'axios'

class DataService{

    //CRUD

    getBands(callback){
        //get all bands

        Axios.get(`${process.env.REACT_APP_API_ROOT_URL}/bands`)
            .then(response =>
      {
            console.log(response.data)
            callback(null, response.data)
      })
            .catch(error => {
                callback(error.response, null)
            })
    }

    getOneBand(bandID, callback)
    {
       Axios.get(`${process.env.REACT_APP_API_ROOT_URL}/heroes/${bandID}`)
        .then((response) => 
       {
          callback(null, response.data);
       })
       .catch(err =>
       {
          callback(err.response, null);
       });
    }

    createBand(newBand, callback)
   {
      Axios.post(`${process.env.REACT_APP_API_ROOT_URL}/bands`, newBand)
      .then((response) => 
      {
         callback(null, response.data);
      })
      .catch((error) => 
      {
         callback(error.response, null);
      });
   }

   updateBand(updatedBand, bandId, callback)
   {
      Axios.put(`${process.env.REACT_APP_API_ROOT_URL}/bands/${bandId}`, updatedBand)
      .then((response) => 
      {
         callback(null, response.data);
      })
      .catch((error) => 
      {
         callback(error.response, null);
      });
   }

   deleteBand(bandId, callback)
   {
      Axios.delete(`${process.env.REACT_APP_API_ROOT_URL}/bands/${bandId}`)
      .then(() => 
      {
         callback(null);
      })
      .catch(err =>
      {
         callback(err.response, null);
      });
   }

}

export default new DataService