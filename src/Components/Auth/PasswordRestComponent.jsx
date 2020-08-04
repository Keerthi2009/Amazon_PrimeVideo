import React, { Component,Fragment} from 'react';
import {Link,withRouter} from 'react-router-dom'
import firebase from '../../firebase';
import {toast} from 'react-toastify';

class PasswordReset extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email : '',
         }
     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit =  this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }
async handleSubmit(e){
    let {email}= this.state;
    e.preventDefault();
    try{
        await firebase.auth().sendPasswordResetEmail(this.state.email);
    this.props.history.push('/signin');
    toast.success("Please verify in your mail ${email} and change password");
    }
    catch(err){
toast.error(err.message);
this.props.history.push("/password-reset");
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
                    Password Assistance</h1>
                    <p>Enter the email adress or mobile phone number associated with your Amazon account</p>
                    <form onSubmit={this.handleSubmit} >
                   <div className="form-group">
                       <label htmlFor="email">Email(phone for mobile account)</label>
                       <input type="email" className="form-control" id="email"
                       name="email" required  value={this.state.email} onChange={this.handleChange}/>
                       </div>
                       <div className="form-group">
                           <button className="btn btn-block btn-warning my-4">
                               Continue</button>
                       </div>
                       
                       <p style={{fontSize : "12px"}}>
                         Has yoyr email or phone number changed? If you no longer use 
                         the email adress associated with your Amazon account, you may
                         contact <Link to="/amazon.com/Customerservice">Customer Service</Link> for help restoring access to your
                         account
                       </p>
                       <p>
                           <Link to="/signin">signin</Link>
                       </p>
                     
               </form>
                    </div>
               
                </div>
               </section>

            </Fragment>
           
         );
    }
}
 
export default withRouter(PasswordReset);