import React, { Component } from 'react';

export class PricingBox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="large-box white-overlay">
                <h2 className="text-center bold">{this.props.data.title}</h2>
                <br/>
                <br/>
                {this.props.data.points.map(function(point, i){
                    return <div className="point">
                        <h4 className="text-center bold" key={i}>{point.point}<br/>
                        <span className="small">{point.description}</span>
                    </h4>
                    </div>;
                })}
                <br/>
                <div className="text-center">
                    <button type="button" className="btn btn-primary bold">Subscribe</button>
                </div>
                <br/>
            </div>
        );
    }
}