import React, { Component } from 'react';

export class Jobs extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="layer white-overlay" active={this.props.active}>
                <div className="container-fluid">
                    <h3>Featured jobs</h3>
                    <hr />
                    <p>No listings yet! Check back for updates.</p>
                </div>
            </div>
        );
    }
}