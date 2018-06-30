import React, { Component } from 'react';

export class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="layer" active={this.props.active}>
                <div className="container">
                    <div style={{marginTop: "400px"}}>
                        <h1 className="light text-shadow">Find work as a generalist at a startup.</h1>
                        <h3 className="light text-shadow">Apply to awesome technical and non technical generalist jobs<br /> at startups around the world.</h3>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                </div>
            </div>
        );
    }
}