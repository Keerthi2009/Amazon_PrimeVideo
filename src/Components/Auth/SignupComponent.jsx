import React, { Component, Fragment } from 'react';
import './Auth.styles.css';
import {Link,withRouter} from 'react-router-dom';
import firebase from "../../firebase.js";
import {toast} from "react-toastify";
import md5 from "md5";
class Signup extends Component {
    // static defaultProps = {
    //     username: "keerthi",
    //     password: "keerthi@123",
    //     email:"keerthi@gmail.com"
    // }
    constructor(props) {
        super(props);
        this.state = { 
            username: '',
            password : '',
            email: '',
            conform_password: '',
         }
         this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
        }

handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
}

async handleSubmit(e){

try{
    let {email,password,username,phonenumber} = this.state;
    e.preventDefault();
    let userData= await firebase.auth()
.createUserWithEmailAndPassword(email, password);
console.log(userData.user);
userData.user.sendEmailVerification();
let message=`Please verify at ${email} to login`;
toast.success(message);
// update profile includes images , phone, id,
await userData.user.updateProfile({
    displayName : username,
    photoURL : `https://www.gravatar.com/avatar/${md5(userData.user.email)}?q=identicon`,

   }) ;
//firebase Storage in database
await firebase.database()
.ref()
.child("/users"+userData.user.uid)
.set({
    displayName: userData.user.displayName,
    photoURL:userData.user.photoURL,
    uid : userData.user.uid,
    email : userData.user.email,
    siginupDate: new Date().toString(),
})
this.setState({
    username: '',
    password : '',
    email: '',
    conform_password: '',
});
this.props.history.push('/signin');
}catch(err) {
    toast.error(err.message)
}
}

    render() { 
        return ( 
            <Fragment>
                <section className="vh-100 align-items-center justyfy-content-center d-flex signupComponent">
                <div className=" col-md-4 mx-auto ">
                 <img  src="AV_Logo.png" alt="logo" className="signuplogo my-2" />
                    <div className="card-body card">
                    <h1 className=" h4 ">
                    Create Account</h1>
                    <form onSubmit={this.handleSubmit} >
                   <div className="form-group ">
                       <label htmlFor="username">
                           Your name</label>
                       <input type="text" className="form-control" id="username" name="username" required
                       value={this.state.username} onChange={this.handleChange}/>
                       </div>
                   <div className="form-group">
                       <label htmlFor="email">Email</label>
                       <input type="email" className="form-control" id="email"
                       name="email" required  value={this.state.email} onChange={this.handleChange}/>
                       </div>
                       <div className="form-group">
                       <label htmlFor="phonenumber">Phonenumber</label>
                       <input type="phonenumber" className="form-control" id="phonenumber"
                       name="phonenumber" required  value={this.state.phonenumber} onChange={this.handleChange}/>
                       </div>
                   <div className="form-group">
                       <label htmlFor="password">Password</label>
                       <input type="password" className="form-control" id="password" 
                        name="password" required  value={this.state.password} onChange={this.handleChange} />
                       </div>
                       <div className="form-group">
                       <label htmlFor="conform_password">Re-enter password</label>
                       <input type="password" className="form-control" id="conform_password"
                         name="conform_password" required  value={this.state.conform_password} onChange={this.handleChange} />
                       </div>
                       <div className="form-group">
                           <button className="btn btn-block btn-warning my-4">Create your Amazon account</button>
                       </div>
                       <hr/>
                       <p style={{fontSize : "12px"}}>
                           By creating an account, you agree to Amozon's Conditions of 
                           Use and Privacy Notice
                           <p>Alredy have an account?<Link to="/signin">Sign-In</Link></p>
                       </p>
               </form>
                    </div>
               
                </div>
               </section>

            </Fragment>
           
         );
    }
}
 
export default withRouter(Signup);