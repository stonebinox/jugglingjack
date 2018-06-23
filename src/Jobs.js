import React, { Component } from 'react';

export class Jobs extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="layer" active={this.props.active}>
                <div className="container">
                    <h1 className="text-center light text-shadow">Job Listings</h1>
                </div>
            </div>
        );
    }
}