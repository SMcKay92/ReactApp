import Axios from 'axios'
import Decode from "jwt-decode";


class Auth {


    register(registrationData, callback){
      Axios.post(`${process.env.REACT_APP_API_ROOT_URL}/users/register`, registrationData)
      .then(response => 
      {
         console.log(response);
         localStorage.setItem("token", response.headers["x-auth-token"])
         callback(null, true)
         
      })
      .catch(error => {
        console.log(error.response)
        callback(error.response, false)

    })
  }
  
    login(credentials, callback) {

        Axios.post(`${process.env.REACT_APP_API_ROOT_URL}/users/login`, credentials)
        .then((response) =>
        {
            console.log(response);
            localStorage.setItem("token", response.headers["x-auth-token"]);
            callback(null, true);
        })
        .catch((error) => {
          console(error.response);
          callback(error.response, false);
        })
    }

    getToken() {
      return localStorage.getItem('token')
    }
  
    logout() {
      localStorage.removeItem('token')
    }
  
    isAuthenticated() {
      return localStorage.getItem('token') !== null
    }
    
    getUser()
    {
       const token = localStorage.getItem("token");
       if(token)
       {
          const decoded = Decode(token);
          return decoded.email;
       }
       else return null;
    }
  }
  
  export default new Auth();
  