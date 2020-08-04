import React, { Component, Fragment } from 'react';
import HeaderComponent from './Components/Header/HeaderComponent';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import HomeComponent from './Components/HomeComponent/HomeComponent';
import Signin from './Components/Auth/SigninComponent';
import Signup from './Components/Auth/SignupComponent';
import PasswordReset from './Components/Auth/PasswordRestComponent';
import PageNotFoundComponent from './Components/PagenotFound/PageNotFoundComponent';
import { ToastContainer } from 'react-toastify';
import firebase from "./firebase";
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData : "",
          }
    }
//call firebase api
async componentDidMount() {
    await firebase.auth().onAuthStateChanged(user => {
        if(user) {
            this.setState({userData : user});
            this.props.history.push("/");
        }
        else {
            this.setState({userData : ""});
            this.props.history.push("/signin");
        }
    })
}
render() { 
        return ( 
            <Fragment>
                <Router>
                <header>
                    {/* conditional rendring */}
                <HeaderComponent user = {this.state.userData} />
               
                </header>
                <ToastContainer />
                <main >
                    <Switch>     
                <Route path="/" exact component={HomeComponent} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/password-reset" exact component={PasswordReset} />
                <Route path="**" component={PageNotFoundComponent} />
                    </Switch>
                </main>
                </Router>
            </Fragment>
         );
    }
}
 
export default App;