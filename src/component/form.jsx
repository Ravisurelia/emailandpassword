import React, { Component } from 'react'
import {GoPrimitiveDot} from "react-icons/go";

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

export default class Form extends Component {
    constructor() {
        super();
        this.state = {
          emailadd: "",
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
    
      }

      handleChange(e) {
        const { name, value } = e.target;
        this.setState({
          [name]: value
        });

        return;
      }
    
      handleBlur(e) {
        const { data } = e.target;
        this.checkingField(data);
        return;
      }


      handleSubmit(e) {
        e.preventDefault();
        let fields = [
          "emailadd",
          "password"
        ];
        let isValid = true;
        fields.forEach(field => {
          isValid = this.checkingField(field) && isValid;
        });
    
        if (isValid) {
            this.setState({ isFormSubmitted: true });
            alert("Thank you for submitting your data!");
        }else {
            this.setState({ isFormSubmitted: false });
        }
    
        return this.state.isFormSubmitted;
      }

      checkingField(data) {
        let isValid = false;
        if (data === "emailadd") isValid = this.checkingEmail();
        else if (data === "password") isValid = this.checkingPassword();
        return isValid;
      }

      checkingEmail() {
        let emailError = "";
        const value = this.state.emailadd;
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
            "Invalid password! conditions not fulfilled. Please try again!";
    
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
                
                <div style={{textAlign:"center"}}>
                    <form onSubmit={this.handleSubmit} >
                        <div className="details">
                            <div className="email">
                                <span className="lable">Email<span className="imp">*</span></span>
                                <input
                                type="email"
                                placeholder="Email Address"
                                name="emailadd"
                                value={this.state.emailadd}
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
                                    <GoPrimitiveDot /> 8 or more letters.
                                </p>
                                <p className="conditions">
                                    <GoPrimitiveDot /> 1 or more lowercase letter.
                                </p>
                                <p className="conditions"> 
                                    <GoPrimitiveDot /> 1 or more uppercase letter.
                                </p>
                                <p className="conditions">
                                    <GoPrimitiveDot /> 1 or more number.
                                </p>
                                <p className="conditions_last">
                                    <GoPrimitiveDot /> 1 or more symbol.
                                {this.state.passwordError && (
                                    <div className="errorMsg">{this.state.passwordError}</div>
                                )}
                                </p>
                                <button>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>   
            </div>
        )
    }
}
