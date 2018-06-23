import React, { Component } from 'react';

export class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div style={{marginTop: "300px"}}>
                    <h1 className="light">Find work as a generalist at a startup.</h1>
                    <h3 className="light">Apply to awesome technical and non technical generalist jobs<br /> at startups around the world.</h3>
                </div>
            </div>
        );
    }
}