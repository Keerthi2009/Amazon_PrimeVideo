import React, { Component, Fragment } from 'react'
import {Link,withRouter} from 'react-router-dom'
import firebase from "../../firebase";
import {toast} from "react-toastify";

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: "",
            email: "",
            password: ""
         }
        this.handleChange = this.handleChange.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }
    async handleSubmit(e){
        let {email,password} = this.state;
        e.preventDefault();
        console.log(this.state)

        //firebase
        try {
           let userData = await firebase.auth().signInWithEmailAndPassword(email,password);
        if(userData.user.emailVerified){
            toast.success("Successfully Loggedin.....");
            this.props.history.push("/");
        }else{
            let message = `${email} is not yet verified please verify.....`;
            toast.error(message);
        } 
        this.setState({
            email: "",
            password:"",
        })
        }
        catch(err){
            toast.error(err.message);
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
                Sign-In</h1>
                <form onSubmit={this.handleSubmit} >
               <div className="form-group">
                   <label htmlFor="email">Email</label>
                   <input type="email" className="form-control" id="email"
                   name="email" required  value={this.state.email} onChange={this.handleChange}/>
                   </div>
               <div className="form-group">
                   <label htmlFor="password">Password</label>
                   <span className="float-right"><Link to="/password-reset">Forget Password?</Link></span>
                   <input type="password" className="form-control" id="password" 
                    name="password" required  value={this.state.password} onChange={this.handleChange} />
                   </div>
                   <div className="form-group">
                       <button className="btn btn-block btn-warning my-4">
                           Sign-In</button>
                   </div>
                   <div >
                   <p style={{fontSize : "12px"}}>
                       By creating an account, you agree to Amozon's Conditions of 
                       Use and Privacy Notice
                   </p>
                   <span >New to Amazon?</span>
                   <p>
                       <Link to="/signup">create an amazon account</Link>
                   </p>
                   </div>
                 
           </form>
                </div>
           
            </div>
           </section>

        </Fragment>
           
         );
    }
}
 
export default withRouter(Signin);