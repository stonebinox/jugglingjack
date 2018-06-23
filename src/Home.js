import React, { Component } from 'react';

export class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div style={{marginTop: "350px"}}>
                    <h1 className="light">Find work at a startup as a Juggling Jack.</h1>
                    <h3 className="light">Apply to awesome technical and non technical generalist jobs<br /> at startups around the world.</h3>
                </div>
            </div>
        );
    }
}