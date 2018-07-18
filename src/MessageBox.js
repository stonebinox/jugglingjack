import React, { Component } from 'react';
import $ from 'jquery';

export class MessageBox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        setTimeout(function(){
            $("#myModal").modal("show");
        }, 500);
        return (
            <div class="container-fluid">
                <div id="myModal" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <a href="#" data-dismiss="modal" className="close">&times;</a>
                                <h4 className="modal-title">{this.props.data.title}</h4>
                            </div>
                            <div className="modal-body">
                                <p>{this.props.data.body}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}