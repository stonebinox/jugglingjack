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
            employerDisplay: "block",
            generalistDisplay: "none"
        };
        this.getUser = this.getUser.bind(this);
        this.parseUserData = this.parseUserData.bind(this);
    }

    getUser() {
        var that = this;
        $.ajax({
            url: 'https://jugglingjack-backend.herokuapp.com/api/getUser',
            method: "get",
            data: {
                user_id: this.props.user_id
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
                if (typeof(response) == "object") {
                    that.setState({
                        userData: response
                    });
                    that.parseUserData();
                }
                else {
                    response = $.trim(response);
                    switch (response) {
                        case "INVALID_PARAMETERS":
                        default:
                        console.log(response);
                        that.setState({
                            errorDisplay: "block"
                        });
                        break;
                    }
                }
            }
        });
    }

    parseUserData() {
        if (this.state.userData != null) {
            var user = this.state.userData;
            var plan = user.plan_master_idplan_master;
            var planID = plan.idplan_master;
            if (plan != 2) {
                this.setState({
                    employerDisplay: "none",
                    generalistDisplay: "block"
                });
            }
        }
    }

    render() {
        return (
            <div className="layer white-overlay" active={this.props.active}>
                <div className="container">
                    <h3 className="text-center">Welcome</h3>
                    <div className="well text-center" style={{display: this.state.employerDisplay}}>
                        <span className="badge">{this.state.applicationCount} active application(s)</span>
                        <br/>
                        <br/>
                        <button type="button" className={this.state.buttonClass}>{this.state.buttonLabel}</button>
                        <div className="alert alert-danger text-center" style={{display: this.state.errorDisplay, marginTop: "20px"}}>
                            <strong>Problem</strong> Something went wrong while loading some data. Please refresh the page and try again.
                        </div>
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