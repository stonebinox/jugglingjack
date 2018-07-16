import React, { Component } from 'react';
import $ from 'jquery';

export class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            applicationCount: 0,
            buttonLabel: "Activate application",
            buttonClass: "btn btn-primary btn-sm",
            userData: null,
            errorDisplay: "none",
            employerDisplay: "none",
            generalistDisplay: "none",
            companyData: null,
            user_id: null,
            applicationData: null
        };
        this.getUser = this.getUser.bind(this);
        this.parseUserData = this.parseUserData.bind(this);
        this.getCompanyData = this.getCompanyData.bind(this);
        this.activateApplication = this.activateApplication.bind(this);
        this.getApplications = this.getApplications.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            user_id: nextProps.userID
        });
        if (nextProps.userID != null) {
            var that = this;
            setTimeout(function(){
                that.getUser();
            },500);
        }
        else {
            this.setState({
                userData: null,
                companyData: null,
                applicationData: null
            });
        }
    }

    getUser() {
        var that = this;
        $.ajax({
            url: 'https://jugglingjack-backend.herokuapp.com/api/getUser',
            method: "get",
            data: {
                user_id: that.state.user_id
            },
            error: function(error) {
                console.log(error);
                that.setState({
                    errorDisplay: "block"
                });
            },
            success: function(response) {
                that.setState({
                    errorDisplay: "none"
                });
                response = $.trim(response);
                switch (response) {
                    case "INVALID_PARAMETERS":
                    console.log(response);
                    that.setState({
                        errorDisplay: "block"
                    });
                    break;
                    default:
                    response = JSON.parse(response);
                    that.setState({
                        userData: response
                    });
                    that.getCompanyData();
                    that.parseUserData();
                    break;
                }
            }
        });
    }

    getCompanyData() {
        var userID = this.state.userData.iduser_master;
        var that = this;
        $.ajax({
            url: "https://jugglingjack-backend.herokuapp.com/api/getCompanyFromUserID",
            method: "get",
            data: {
                user_id: userID
            },
            error: function(error) {
                console.log(error);
                that.setState({
                    errorDisplay: "block"
                });
            },
            success: function(response) {
                that.setState({
                    errorDisplay: "none"
                });
                response = $.trim(response);
                switch (response) {
                    case "INVALID_PARAMETERS":
                    case "INVALID_USER_ID":
                    case "INVALID_COMPANY_ID":
                    console.log(response);
                    that.setState({
                        errorDisplay: "block"
                    });
                    break;
                    default:
                    response = JSON.parse(response);
                    that.setState({
                        companyData: response
                    });
                    that.getApplications();
                    break;
                }
            }
        });
    }

    getApplications() {
        if (this.state.companyData != null) {
            var that = this;
            $.ajax({
                url: "https://jugglingjack-backend.herokuapp.com/api/getApplicationsFromCompany",
                method: "get",
                data: {
                    company_id: that.state.companyData.idcompany_master
                },
                error: function(error) {
                    console.log(error);
                    that.setState({
                        errorDisplay: "block"
                    });
                },
                success: function(response) {
                    that.setState({
                        errorDisplay: "none"
                    });
                    response = $.trim(response);
                    console.log(response);
                    switch (response) {
                        case "INVALID_PARAMETERS":
                        case "INVALID_COMPANY_ID":
                        that.setState({
                            errorDisplay: "block"
                        });
                        break;
                        case "NO_APPLICATIONS_FOUND":
                        that.setState({
                            buttonClass: "btn btn-primary btn-sm",
                            buttonLabel: "Activate application",
                            applicationData: null,
                            applicationCount: 0
                        });
                        break;
                        default:
                        response = JSON.parse(response);
                        that.setState({
                            applicationData: response,
                            applicationCount: response.length,
                            buttonLabel: "Deactivate application",
                            buttonClass: "btn btn-warning btn-sm"
                        });

                        break;
                    }
                }
            });
        }
    }

    parseUserData() {
        if (this.state.userData != null) {
            var user = this.state.userData;
            var admin = user.admin_master_idadmin_master;
            var adminID = admin.idadmin_master;
            if (adminID != 2) {
                this.setState({
                    employerDisplay: "none",
                    generalistDisplay: "block"
                });
            }
            else {
                this.setState({
                    employerDisplay: "block",
                    generalistDisplay: "none"
                });
            }
        }
    }

    activateApplication() {
        if (this.state.companyData != null) {
            var that = this;
            $.ajax({
                url: "https://jugglingjack-backend.herokuapp.com/api/createApplication",
                method: "post",
                data: {
                    company_id: that.state.companyData.idcompany_master,
                    application_title: that.state.userData.admin_master_idadmin_master.admin_description,
                    application_description: ""
                },
                error: function(error) {
                    console.log(error);
                    that.setState({
                        errorDisplay: "block"
                    });
                },
                success: function(response) {
                    that.setState({
                        errorDisplay: "none"
                    });
                    response = $.trim(response);
                    console.log(response);
                    switch (response) {
                        case "INVALID_PARAMETERS":
                        case "INVALID_COMPANY_ID":
                        default:
                        that.setState({
                            errorDisplay: "block"
                        });
                        break;
                        case "APPLICATION_CREATED":
                        that.setState({
                            errorDisplay: "none",
                            buttonLabel: "Deactivate application",
                            buttonClass: "btn btn-warning btn-sm"
                        });
                        break;
                    }
                }
            });
        }
        else {
            this.getCompanyData();
        }
    }

    render() {
        return (
            <div className="layer white-overlay" active={this.props.active}>
                <div className="container">
                    <h3 className="text-center">Welcome</h3>
                    <div className="alert alert-danger text-center" style={{display: this.state.errorDisplay, marginTop: "20px"}}>
                        <strong>Problem</strong> Something went wrong while loading some data. Please refresh the page and try again.
                    </div>
                    <div className="well text-center" style={{display: this.state.employerDisplay}}>
                        <span className="badge">{this.state.applicationCount} active application(s)</span>
                        <br/>
                        <br/>
                        <button type="button" className={this.state.buttonClass} onClick={this.activateApplication}>{this.state.buttonLabel}</button>
                    </div>
                    <hr/>
                    <div className="panel panel-warning" style={{display: this.state.employerDisplay}}>
                        <div className="panel-heading bold text-center">Responses</div>
                        <div className="panel-body text-center">
                            <div className="alert alert-warning text-center"><strong>Coming soon.</strong> For now, check your <strong>email</strong>!</div>
                        </div>
                    </div>
                    <div className="panel panel-warning" style={{display: this.state.generalistDisplay}}>
                        <div className="panel-heading bold text-center">Responses From Employers</div>
                        <div className="panel panel-body text-center">
                            <div className="alert alert-warning text-center"><strong>Coming soon.</strong> For now, check out the <strong>Jobs</strong> section and your email for responses!</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}