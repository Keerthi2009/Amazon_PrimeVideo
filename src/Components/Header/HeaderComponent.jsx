import React, {Component, Fragment } from 'react';
import {Link, withRouter} from "react-router-dom"
import './HeaderComponent.styles.css';
import firebase from "../../firebase";
import {toast} from "react-toastify";
class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user : this.props.user,
    }
    this.signOut = this.signOut.bind(this);
  }

signOut() {
  firebase
  .auth()
  .signOut()
  .then(() => {
    this.props.history.push('/signin');
    toast.success("successfully signed Out from amazon prime account")
  })
  .catch(err => toast.err(err.message))
}

 render ()  {
   console.log(this.props.user);
   let AnonymousUser = () => (
     <Fragment>
            <li className="nav-item">
              <Link className="nav-link" to="/signin">
                 Sign in
                 </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Sign up</Link>
            </li>
        </Fragment>
   )
   let AuthUser = () => (
     <Fragment>
      <li className="nav-item">
              <a className="nav-link" onClick={this.signOut}>
                Sign out</a>
            </li>
     </Fragment>
   )
     return ( 
         <Fragment>
              <nav className="navbar navbar-expand-lg navbar-dark bg-light">
        <Link className="navbar-brand" to="/"><img src="logo.svg" alt="Logo"/></Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home <span className="sr-only">(current)</span>
                </Link>
            </li>
           {this.props.user ? <AuthUser />: <AnonymousUser />};
          </ul>
        </div>
      </nav>

         </Fragment>
      );
 }
}
 export default withRouter(HeaderComponent) ;