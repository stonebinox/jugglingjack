import React, { Component } from 'react';
import { PricingBox } from './PricingBox.js';

export class Pricing extends Component {
    constructor(props) {
        super(props);
        this.state={
            pricingModels: [
                {
                    id: "free",
                    title: "Free",
                    points: [
                        {
                            point: "1 vacancy",
                            description: "Technical or non technical generalists"
                        },
                        {
                            point: "Company name",
                            description: ""
                        },
                        {
                            point: "Company logo",
                            description: ""
                        },
                        {
                            point: "Company description",
                            description: ""
                        }
                    ]
                }, 
                {
                    id: "basic",
                    title: "Basic $9/month",
                    points: [
                        {
                            point: "1 vacancy",
                            description: "Technical or non technical generalists"
                        },
                        {
                            point: "Company name",
                            description: ""
                        },
                        {
                            point: "Company logo",
                            description: ""
                        },
                        {
                            point: "Company description",
                            description: ""
                        }, 
                        {
                            point: "Homepage promotion",
                            description: ""
                        }
                    ]
                },
                {
                    id: "pro",
                    title: "Pro $14/month",
                    points: [
                        {
                            point: "2 vacancies",
                            description: "Technical or non technical generalists"
                        },
                        {
                            point: "Company name",
                            description: ""
                        },
                        {
                            point: "Company logo",
                            description: ""
                        },
                        {
                            point: "Company description",
                            description: ""
                        }, 
                        {
                            point: "Homepage promotion",
                            description: ""
                        },
                        {
                            point: "Weekly newsletter promotion",
                            description: ""
                        }
                    ]
                }
            ]
        };
    }

    render() {
        return (
            <div className="layer" active={this.props.active}>
                <div className="container">
                    <h1 className="light text-center text-shadow">Pricing</h1>
                    <br/>
                    <div className="row">
                        <div className="col-sm-4">
                            <PricingBox data={this.state.pricingModels[0]} />
                        </div>
                        <div className="col-sm-4">
                            <PricingBox data={this.state.pricingModels[1]} />
                        </div>
                        <div className="col-sm-4">
                            <PricingBox data={this.state.pricingModels[2]} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}