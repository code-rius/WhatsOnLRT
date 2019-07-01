import React, { Component } from 'react';

class Channels extends Component {
    // Constructor
    constructor(props) {
        super(props);
        this.state = { apiResponse: "{}" };
    }

    // Calling backend API for data
    callAPI() {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }));
    }

    // Calling callAPI() function
    componentWillMount() {
        this.callAPI();
    }
    render() {
        // Retrieve a JSON from backend. Set it to variable "myJSON"
        var myJSON = this.state.apiResponse;
        // Waiting for data from Backend API
        try {
            // Parsing JSON to get a JS object representation of it
            myJSON = JSON.parse(myJSON)
            // Convert JS Object to an array
            var arr = [];
            Object.keys(myJSON).forEach(function (key) {
                arr.push(myJSON[key]);
            });
        } catch (error) {
            console.log("still waiting for the input");
        }
        return (
            <div className="card-deck">
                {/* For each item in "arr" we return an HTML structure populated with respective data. The structure is defined in "ClassItem"  */}
                {arr.map(item => <ChannelItem key={item.Channel} channel={item.Channel} title={item.Title} time={item.Time} />)}
            </div>
        );
    }
}

class ChannelItem extends Component {

    render() {
        return (
            <div className="card" >
                <div className="card-header text-white bg-dark ">
                    {this.props.channel}
                </div>
                <div className="card-body">
                    <h5 className="card-title">
                        {this.props.time}
                    </h5>
                    <p>
                        {this.props.title}
                    </p>
                </div>

            </div>

        );
    }
}

export default Channels;