import React from 'react';
import NavBar from './components/NavBar';
import Main from './components/Main';
import SignIn from './components/SignIn';
import Footer from './components/Footer';
import Register from './components/Register';
import CreateForm from './components/CreateForm';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import './css/app.css';
import SignOut from './components/SignOut';
import DeleteForm from './components/DeleteForm';
import EditForm from './components/EditForm';



class App extends React.Component {
  render() {
     return (
        <React.Fragment>
           <Router>
           <Route path="*" component={NavBar} />
              <div id="main-content">
                 <Switch>
                    <Route exact path="/signin" component={SignIn}/>
                    <Route exact path="/signout" component={SignOut}/>
                    <Route exact path="/register" component={Register}/>
                    <ProtectedRoute exact path="/create" component={CreateForm}/>
                    <ProtectedRoute exact path="/bands/edit/:id" component={EditForm} />
                    <ProtectedRoute exact path="/bands/delete/:id" component={DeleteForm} />  
                    <Route exact path="/" component={Main}/>
                    <Route path="*" component={NoMatch}/>
                 </Switch>
              </div>
              <Footer />
           </Router>
        </React.Fragment>
     );

     function NoMatch(props) {
        return (
           <div>
              <h3>
                Does not exist <code>{props.location.pathname}</code>
              </h3>
           </div>
        );
     }
  }
}
export default App;
