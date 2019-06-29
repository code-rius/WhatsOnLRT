import React, { Component } from 'react';

class Channels extends Component {

    constructor(props) {
        super(props);
        this.state = { apiResponse: "{}" };
    }

    callAPI() {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }));
    }

    componentWillMount() {
        this.callAPI();
    }
    render() {
        var myJSON = this.state.apiResponse;
        try {
            console.log(JSON.parse(myJSON));
            myJSON = JSON.parse(myJSON)
            var arr = [];
            Object.keys(myJSON).forEach(function (key) {
                arr.push(myJSON[key]);
            });
        } catch (error) {
            console.log("still waiting for the input");
        }
        return (
            <div className="card-deck">
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