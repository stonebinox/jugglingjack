import React, { Component } from 'react';
import $ from 'jquery';
import StripeCheckout from 'react-stripe-checkout';

export class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            personalCollapse: "panel panel-primary collapse in",
            workCollapse: "panel panel-info collapse",
            planCollapse: "panel panel-success collapse",
            payCollapse: "panel panel-success collapse",
            amount: 0,
            nameFlag: "form-group",
            emailFlag: "form-group",
            password1Flag: "form-group",
            password2Flag: "form-group",
            roleFlag: "form-group",
            cityFlag: "form-group",
            countryFlag: "form-group",
            companyFlag: "form-group",
            companyDescriptionFlag: "form-group",
            signupButtonFlag: "btn btn-success bold",
            signupData: null,
            alertFlag: "none",
            passedPlanID: null,
            user_id: null,
            payFlag: "block",
            payProcessFlag: "none"
        };  
        this.personalClick = this.personalClick.bind(this);
        this.workClick = this.workClick.bind(this);
        this.changeLayout = this.changeLayout.bind(this);
        this.planClick = this.planClick.bind(this);
    }

    changeLayout() {
        var role = parseInt(document.signup2.role.value);
        if ((role != 2) && (role != 42)) {
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
                            password1: password1,
                            password2: password2
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
                    if ((role == 2) || (role == 42)) {
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
                        var passedPlanID = null;
                        if ((role != 2) && (role != 42)) {
                            passedPlanID = 2;
                        }
                        this.setState({
                            signupData: data,
                            workCollapse: "panel panel-info collapse",
                            planCollapse: "panel panel-success collapse in",
                            passedPlanID: passedPlanID
                        });
                        if ((role != 2) && (role != 42)) {
                            var that = this;
                            setTimeout(function(){
                                that.planClick();
                            }, 300);
                        }
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

    planClick() {
        var planID = null;
        if (this.state.passedPlanID == null) {
            planID = document.signup3.plan.value;
        }
        else {
            planID = this.state.passedPlanID;
        }
        if (planID != -1) {
            var data = this.state.signupData;
            data.plan_id = planID;
            this.setState({
                planFlag: "form-group",
                signupData: data,
                signupButtonFlag: "btn btn-success bold disabled"
            });
            var that = this;
            $.ajax({
                url: "https://jugglingjack-backend.herokuapp.com/api/signup",
                data: this.state.signupData,
                method: "post",
                error: function(error) {
                    console.log(error);
                    that.setState({
                        signupButtonFlag: "btn btn-success bold",
                        alertFlag: "block"
                    });
                },
                success: function(response) {
                    console.log(response);
                    that.setState({
                        signupButtonFlag: "btn btn-success bold",
                        alertFlag: "none"
                    });
                    response = $.trim(response);
                    switch (response) {
                        case "INVALID_PARAMETERS":
                        case "ACCOUNT_ALREADY_EXISTS":
                        default:
                        if (response.indexOf("ACCOUNT_CREATED_") != -1) {
                            var sp = response.split("ACCOUNT_CREATED_");
                            var userID = sp[1];
                            var planID = data.plan_id;
                            if ((planID != 2) && (planID != null)) {
                                var amount = 0;
                                switch (parseInt(planID)) {
                                    case 12:
                                    amount = 9;
                                    break;
                                    case 22:
                                    amount = 14;
                                    break;
                                }
                                that.setState({
                                    user_id: userID,
                                    planCollapse: "panel panel-success collapse",
                                    payCollapse: "panel panel-success collapse in",
                                    amount: amount
                                });
                            }
                            else {
                                that.props.layerLoad("login");
                            }
                        }
                        else {
                            that.setState({
                                alertFlag: "block"
                            });
                        }
                        break;
                    }
                }
            });
        }
        else {
            this.setState({
                planFlag: "form-group has-error"
            });
        }
    }

    onToken = (token) => {
        var tokenData = token.id;
        var email = token.email;
        var productID = 2; //to signal that this is for JJ
        var amount = this.state.amount;
        this.setState({
            payFlag: "none",
            payProcessFlag: "block"
        }); 
        var that = this;
        $.ajax({
            method: "POST",
            url: "https://dustpay.herokuapp.com/pay",
            data: {
                token: tokenData,
                email_id: email,
                amount: amount,
                product_id: productID
            },
            error: function(err) {
                console.log(err);
                that.setState({
                    alertFlag: "block"
                });
            },
            success(response) {
                that.setState({
                    alertFlag: "none"
                });
                response = response.trim();
                switch (response) {
                    case "INVALID_REQUEST":
                    default:
                    that.setState({
                        alertFlag: "block"
                    });
                    break;
                    case "PAYMENT_SUCCESSFUL":
                    that.props.layerLoad("login");
                    break;
                }

            }
        });        
    }
    
    render() {
        setTimeout(function(){
            $("#name").focus();
        }, 300);
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
                            <div className="alert alert-danger text-center" style={{display: this.state.alertFlag}}>
                                <strong>Problem</strong> Something went wrong while creating your account. Please try again later.
                            </div>
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
                            <div className="alert alert-danger text-center" style={{display: this.state.alertFlag}}>
                                <strong>Problem</strong> Something went wrong while creating your account. Please try again later.
                            </div>
                            <form name="signup2" autoComplete="off">
                                <div className={this.state.roleFlag}>
                                    <label htmlFor="role">You</label>
                                    <select name="role" id="role" className="form-control" onChange={this.changeLayout}>
                                        <option value="-1">Select option</option>
                                        <option value="42">are looking for a technical generalist</option>
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
                            <div className="alert alert-danger text-center" style={{display: this.state.alertFlag}}>
                                <strong>Problem</strong> Something went wrong while creating your account. Please try again later.
                            </div>
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
                                <br/>
                                <p className="text-center"><small>By clicking <strong>create</strong>, you agree to our <a href="#">terms and conditions</a>.</small></p>
                                <br/>
                                <div className="text-center">
                                    <button type="button" className={this.state.signupButtonFlag} onClick={this.planClick}>Create account!</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={this.state.payCollapse}>
                        <div className="panel panel-heading bold text-center">Account Created!</div>
                        <div className="panel-body">
                            <div className="alert alert-danger text-center" style={{display: this.state.alertFlag}}>
                                <strong>Problem</strong> Something went wrong while creating your account. Please try again later.
                            </div>
                            <div style={{display: this.state.payFlag}}>
                                <h4 className="text-center">Complete Your Payment</h4>
                                <br />
                                <div className="text-center">
                                <StripeCheckout
                                    name="Dust &amp; Co., Inc"
                                    description="Widget"
                                    amount={this.state.amount * 100}
                                    image="https://stripe-images.s3.amazonaws.com/uploads/file_1BgG07KffZLOJcWolh3F4u6X.png?AWSAccessKeyId=ASIAIWVSTUX3GVF4H5ZQ&Expires=1688911608&Signature=EdRhAx58vvXD9aTPSpOCb0Ny7Gk%3D&x-amz-security-token=FQoDYXdzEO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDEWJp9JBTMjgItjXkCK3A04M%2BdRzxPt7p1ZTqLSit0Xw8lRgUxYO%2FE%2BhbGeoF5E8NWnYwuffMV5S2ljP30hHwD8IkNKTBWEz5ghT5H21gLnIDHjIAkfrURFA0ODp%2Fe5p1SGU35ANVcbK7nPF%2BsbNaq9nqsMYSPYXoEEsnGQHvb33ClHOT1%2BBCS59shXSSivuoyg9NspHVQSusnHZBgTptkZNZax1bVzRptlPK07jFF7AZMN2Dyvj7%2B0qZYoTxBN%2FAZ4A2%2BpHplBK22mkAaht6SnARCXnAZXW9UZiRWPIbx6QJ9ni5Fu46B4aU6wzM8i%2FdVAP%2FG1Jbgi4Dl8ZH0jJWuBomC4IShOwkG6svHX9yAAnJ4lcZWO12SYjG7OjDW0q8OSR57%2FuiEdGN1PRia283kMZAWGquJBqqhHto8FmryUTEG9QZQqS38FKG7Bsj%2B8xuw1ue%2B4czaFE6WdruqxeRVT9C6Fjxpj2YEoPmSZvwe2BO1I%2F6Zh3rcN1tEUleqx57HnDxFjTbQZi7osl%2BU2npAhIQ5D6P9oOY0L573Bg2%2FGTLpoVlooIGY9FR46F2GzG7bgqJhWPB6iiFswwdQMmYG4fYUOYWf0orMqN2gU%3D"
                                    token={this.onToken}
                                    stripeKey="pk_live_PSwDNF9BVOIuKl5BBzVXnXsa"
                                    src="https://checkout.stripe.com/checkout.js"
                                />
                                </div>
                            </div>
                            <div style={{display: this.state.payProcessFlag}}>
                                <div className="alert alert-info text-center"><strong>Please Wait</strong> Your payment is being processed.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}