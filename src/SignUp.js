import React, { Component } from 'react';
import $ from 'jquery';

export class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            personalCollapse: "panel panel-primary collapse in",
            workCollapse: "panel panel-info collapse",
            planCollapse: "panel panel-success collapse",
            nameFlag: "form-group",
            emailFlag: "form-group",
            password1Flag: "form-group",
            password2Flag: "form-group",
            roleFlag: "form-group",
            cityFlag: "form-group",
            countryFlag: "form-group",
            companyFlag: "form-group",
            companyDescriptionFlag: "form-group",
            signupData: null
        };  
        this.personalClick = this.personalClick.bind(this);
        this.workClick = this.workClick.bind(this);
        this.changeLayout = this.changeLayout.bind(this);
    }

    changeLayout() {
        var role = parseInt(document.signup2.role.value);
        if (role != 2) {
            $("#company").attr("disabled", "true");
            $("#companydesc").attr("disabled", "true");
        }
        else {
            $("#company").removeAttr("disabled");
            $("#companydesc").removeAttr("disabled");
        }
    }

    personalClick() {
        var name = document.signup.name.value;
        name = name.trim();
        if (name !== "") {
            this.setState({
                nameFlag: "form-group"
            });
            var email = document.signup.signupemail.value;
            email = email.trim();
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if ((email !== "") && (re.test(email))) {
                this.setState({
                    emailFlag: "form-group"
                });
                var password1 = document.signup.password1.value;
                if (password1.length >= 8) {
                    this.setState({
                        password1Flag: "form-group"
                    });
                    var password2 = document.signup.password2.value;
                    if (password2 === password1) {
                        var data = {
                            name: name,
                            email: email,
                            password: password1
                        };
                        this.setState({
                            signupData: data,
                            personalCollapse: "panel panel-primary collapse",
                            workCollapse: "panel panel-info collapse collapse in"
                        });
                    }
                    else {
                        this.setState({
                            password2Flag: "form-group has-error"
                        });
                    }
                }
                else {
                    this.setState({
                        password1Flag: "form-group has-error"
                    });
                }
            }
            else {
                this.setState({
                    emailFlag: "form-group has-error"
                });
            }
        }
        else {
            this.setState({
                nameFlag: "form-group has-error"
            });
        }
    }

    workClick() {
        var role = document.signup2.role.value;
        if (role !=  -1) {
            this.setState({
                roleFlag: "form-group"
            });
            var city = $.trim(document.signup2.city.value);
            if (city != "") {
                this.setState({
                    cityFlag: "form-group"
                });
                var country = $.trim(document.signup2.country.value);
                if (country != "") {
                    this.setState({
                        countryFlag: "form-group"
                    });
                    var company = "";
                    var companyDescription = "";
                    var continueFlag = false;
                    if (role == 2) {
                        company = $.trim(document.signup2.company.value);
                        if (company != "") {
                            this.setState({
                                companyFlag: "form-group"
                            });
                            companyDescription = $.trim(document.signup2.companydesc.value);
                            if (companyDescription != "") {
                                this.setState({
                                    companyDescriptionFlag: "form-group"
                                });    
                                continueFlag = true;
                            }
                            else {
                                this.setState({
                                    companyDescriptionFlag: "form-group has-error"
                                });    
                            }
                        }
                        else {
                            this.setState({
                                companyFlag: "form-group has-error"
                            });
                        }
                    }
                    else {
                        continueFlag = true;
                    }
                    if (continueFlag) {
                        var data = this.state.signupData;
                        data.admin_id = role;
                        data.city = city;
                        data.country = country;
                        data.company = company;
                        data.company_description = companyDescription;
                        this.setState({
                            signupData: data,
                            workCollapse: "panel panel-info collapse",
                            planCollapse: "panel panel-success collapse in"
                        });
                    }
                }
                else {
                    this.setState({
                        countryFlag: "form-group has-error"
                    });
                }
            }
            else {
                this.setState({
                    cityFlag: "form-group has-error"
                });
            }
        }
        else {
            this.setState({
                roleFlag: "form-group has-error"
            });
        }
    }

    render() {
        return (
            <div className="layer white-overlay" active={this.props.active}>
                <div className="container">
                    <br/>
                    <br/>
                    <h1 className="text-center">Create an account</h1>
                    <br/>
                    <br/>
                    <div className={this.state.personalCollapse}>
                        <div className="panel-heading text-center bold">Personal Details</div>
                        <div className="panel-body">
                            <form name="signup" autoComplete="off">
                                <div className={this.state.nameFlag}>
                                    <label htmlFor="name">Full name</label>
                                    <input type="text" name="name" id="name" placeholder="Your full name" className="form-control" required />
                                </div>
                                <div className={this.state.emailFlag}>
                                    <label htmlFor="signupemail">Email</label>
                                    <input type="email" name="signupemail" id="signupemail" placeholder="Enter a valid email ID" required className="form-control" />
                                </div> 
                                <div className={this.state.password1Flag}>
                                    <label htmlFor="password1">Create password</label>
                                    <input type="password" name="password1" id="password1" placeholder="Minimum 8 characters" required className="form-control" />
                                </div>
                                <div className={this.state.password2Flag}>
                                    <label htmlFor="password2">Repeat password</label>
                                    <input type="password" name="password2" id="password2" placeholder="Ensure it's the same" required className="form-control" />
                                </div>
                                <br/>
                                <div className="text-center">
                                    <button type="button" className="btn btn-primary bold" onClick={this.personalClick}>Proceed <span className="glyphicon glyphicon-menu-right"></span></button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <br />
                    <div className={this.state.workCollapse}>
                        <div className="panel-heading text-center bold">Work Information</div>
                        <div className="panel-body">
                            <form name="signup2" autoComplete="off">
                                <div className={this.state.roleFlag}>
                                    <label htmlFor="role">You</label>
                                    <select name="role" id="role" className="form-control" onChange={this.changeLayout}>
                                        <option value="-1">Select option</option>
                                        <option value="2">are looking for a technical generalist</option>
                                        <option value="2">are looking for a non-technical generalist</option>
                                        <option value="12">are a technical generalist</option>
                                        <option value="22">are a non-technical generalist</option>
                                    </select>
                                </div>
                                <div className={this.state.cityFlag}>
                                    <label htmlFor="city">City</label>
                                    <input type="text" name="city" id="city" className="form-control" required placeholder="Your city" />
                                </div>
                                <div className={this.state.countryFlag}>
                                    <label htmlFor="country">Country</label>
                                    <input type="text" name="country" id="country" className="form-control" required placeholder="Your country" />
                                </div>
                                <div className={this.state.companyFlag}>
                                    <label htmlFor="company">Company</label>
                                    <input type="text" name="company" id="company" className="form-control" required placeholder="Your company" />
                                </div>  
                                <div className={this.state.companyDescriptionFlag}>
                                    <label htmlFor="companydesc">Company description</label>
                                    <textarea name="companydesc" id="companydesc" className="form-control" rows="4" placeholder="Enter a few words about your company"></textarea>
                                </div>
                                <br/>
                                <div className="text-center">
                                    <button type="button" className="btn btn-info bold" onClick={this.workClick}>Last step <span className="glyphicon glyphicon-menu-right"></span></button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <br />
                    <div className={this.state.planCollapse}>
                        <div className="panel-heading bold text-center">Select Your Plan</div>
                        <div className="panel-body">
                            <form name="signup3" autoComplete="off">
                                <div className={this.state.planFlag}>
                                    <label htmlFor="plan">Select plan</label>
                                    <select name="plan" id="plan" className="form-control">
                                        <option value="-1">Select plan</option>
                                        <option value="2">Free - $0/month</option>
                                        <option value="12">Basic - $9/month</option>
                                        <option value="22">Pro - $14/month</option>
                                    </select>
                                </div>
                                <p className="text-center"><small>By clicking <strong>create</strong>, you agree to our <a href="#">terms and conditions</a>.</small></p>
                                <br/>
                                <div className="text-center">
                                    <button type="button" className="btn btn-success bold">Create account!</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}