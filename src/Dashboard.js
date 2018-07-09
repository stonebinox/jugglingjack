import React, { Component } from 'react';
import $ from 'jquery';

export class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="layer white-overlay" active={this.props.active}>
                <div className="container">
                    <h3 className="text-center">Welcome</h3>
                </div>
            </div>
        );
    }
}