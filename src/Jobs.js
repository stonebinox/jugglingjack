import React, { Component } from 'react';
import $ from 'jquery';
import Moment from 'react-moment';

export class Jobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultDisplay: "block",
            errorDisplay: "none",
            applicationsArray: []
        };
        this.getActiveApplications = this.getActiveApplications.bind(this);
        this.displayApplications = this.displayApplications.bind(this);
        this.getActiveApplications();
    }

    getActiveApplications() {
        var that = this;
        $.ajax({
            url: "https://jugglingjack-backend.herokuapp.com/api/getActiveApplications",
            method: "get",
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
                    that.setState({
                        errorDisplay: "block"
                    });
                    break;
                    default:
                    response = JSON.parse(response);
                    var applications = that.state.applicationsArray.slice();
                    applications = applications.concat(response);
                    that.setState({
                        applicationsArray: applications,
                        defaultDisplay: "none"
                    });
                    break;
                    case "NO_APPLICATIONS_FOUND":
                    //do nothing
                    break;
                }
            }
        });
    }

    displayApplications() {
        if (this.state.applicationsArray.length > 0) {
            var applications = this.state.applicationsArray;
            console.log(applications);
            var layout = (<div>
                <h3 className="text-center">Active Applications</h3>
                <br/>
                {applications.map((row, index) => {
                    if ((row != null) && (row != undefined)) {
                        var applicationID = row.idapplication_master;
                        var applicationTitle = row.application_title;
                        var applicationDescription = row.application_description;
                        if (applicationDescription === "") {
                            applicationDescription = row.company_master_idcompany_master.company_description;
                        }
                        var companyName = row.company_master_idcompany_master.company_name;
                        var time = row.timestamp;
                        return (
                            <div className="panel panel-info" key={"jobs_" + index}>
                                <div className="panel-heading bold">{applicationTitle}</div>
                                <div className="panel-body">
                                {applicationDescription}
                                <br/>
                                <small className="bold">{companyName}</small>
                                </div>
                                <div className="panel-footer text-right">
                                    <Moment fromNow>{time}</Moment>&nbsp;&nbsp;
                                    <button type="button" className="btn btn-primary btn-sm">Apply</button>
                                </div>
                            </div>
                        );
                    }
                })}
            </div>);
            return layout;
        }
        return (
            <div className="well">
                <p className="text-center">No job applications to display.</p>
            </div>
        );
    }

    render() {
        return (
            <div className="layer white-overlay" active={this.props.active}>
                <div className="container-fluid" style={{display: this.state.errorDisplay}}>
                    <div className="alert alert-danger text-center">
                        <strong>Problem</strong> Something went wrong while loading some information. Please refresh the page and try again.
                    </div>
                </div>
                <div className="container-fluid" style={{display: this.state.defaultDisplay}}>
                    <h3>Featured jobs</h3>
                    <hr />
                    <p>No listings yet! Check back for updates.</p>
                </div>
                <br/>
                <div className="container" style={{display: this.state.jobsDisplay}}>
                    {this.displayApplications()}
                </div>
            </div>
        );
    }
}