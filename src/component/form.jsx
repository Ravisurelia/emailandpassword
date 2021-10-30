import React, { Component } from 'react'
import {MdClose} from "react-icons/md";

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

export default class Form extends Component {
    constructor() {
        super();
        this.state = {
          email: "",
          password: "",
          emailError: "",
          passwordError: "",
          isFormSubmitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.checkingField = this.checkingField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkingEmail = this.checkingEmail.bind(this);
        this.checkingPassword = this.checkingPassword.bind(this);
        this.handleCondition = this.handleCondition.bind(this);
    
      }

      handleChange(e) {
        const { data, value } = e.target;
        this.setState({
          [data]: value
        });

        return;
      }
    
      handleBlur(e) {
        const { data } = e.target;
        this.checkingField(data);
        return;
      }

      checkingField(data) {
        let isValid = false;
        if (data === "email") isValid = this.checkingEmail();
        else if (data === "password") isValid = this.checkingPassword();
        return isValid;
      }

      handleCondition (e){
          if (this.state.password === ""){
              return <MdClose />
          }
      }

      handleSubmit(e) {
        e.preventDefault();
        let fields = [
          "email",
          "password",
        ];
        let isValid = true;
        fields.forEach(field => {
          isValid = this.checkingField(field) && isValid;
        });
    
        if (isValid) this.setState({ isFormSubmitted: true });
        else this.setState({ isFormSubmitted: false });
    
        return this.state.isFormSubmitted;
      }

      checkingEmail() {
        let emailError = "";
        const value = this.state.email;
        if (value.trim === "") emailError = "Email Address is required";
        else if (!emailRegex.test(value))
          emailError = "Email is not valid. Please enter a valid Email address!";
    
        this.setState({
          emailError
        });
        return emailError === "";
      }

      checkingPassword() {
        let passwordError = "";
        const value = this.state.password;
        if (value.trim === "") passwordError = "Password is required";
        else if (!passwordRegex.test(value))
          passwordError =
            "Password must contain at least 8 characters, 1 number, 1 upper, 1 lowercase and 1 symbol!";
    
        this.setState({
          passwordError
        });
        return passwordError === "";
      }
    render() {
        return (
            <div>
                <div className="heading">
                    <h3>Registration</h3>
                </div>
                
                {this.state.isFormSubmitted ? (
                <div>
                    <h3>Thanks for signing up, find your details below:</h3>
                    <div>Email Address: {this.state.email}</div>
                </div>
                ) : (
                <div style={{textAlign:"center"}}>
                    <form onSubmit={this.handleSubmit} >
                        <div className="details">
                            <div className="email">
                                <span className="lable">Email<span className="imp">*</span></span>
                                <input
                                type="email"
                                placeholder="Email Address"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                autoComplete="off"
                                />
                    
                                {this.state.emailError && (
                                <div className="errorMsg">{this.state.emailError}</div>
                                )}    
                            </div>
                        
                            <div className="password">
                                <span className="lable">Password<span className="imp">*</span></span>
                                <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                autoComplete="off"
                                />
                                <p className="conditions1">
                                    8 or more letters.
                                </p>
                                <p className="conditions">
                                    1 or more lowercase letter.
                                </p>
                                <p className="conditions"> 
                                    1 or more uppercase letter.
                                </p>
                                <p className="conditions">
                                    1 or more number.
                                </p>
                                <p className="conditions">
                                    1 or more symbol.
                                </p>
                                {/* {this.state.passwordError && (
                                    <div className="errorMsg">{this.state.passwordError}</div>
                                    )} */}
                                <button>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
                )}
                
            </div>
        )
    }
}
