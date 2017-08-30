import React from 'react';
import LineScatter from './LineScatter';

class ScatterTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'Page A', uv: 100, pv: 100},
                {name: 'Page B', uv: 200, pv: 100}
            ],
            timer: 0
        };
    }

    componentDidMount() {
        setInterval(() => {
            for (let c = 0; c <1; c++) {
                this.setState({
                    data: this.state.data.concat([
                        {
                            name: 'Page A',
                            uv: parseInt((Math.random() * 10000).toFixed(0)),
                            pv: this.state.timer
                        },
                        {name: 'Page B', uv: parseInt((Math.random() * 10000).toFixed(0)), pv: this.state.timer }
                    ])
                });
            }
            if (this.state.timer > 100000) {
                for (let c = 0; c < 1; c++) {
                    this.setState({
                        data: this.state.data.concat([
                            {
                                name: 'Page C',
                                uv: parseInt((Math.random() * 10000).toFixed(0)),
                                pv: this.state.timer
                            }
                        ])
                    });
                }
            }
            this.setState({

                timer: this.state.timer + 1000
            });
        }, 100);
    }

    render() {
        return (
            <div>
                <LineScatter dataSet={this.state.data} width={1000} height={900}/>

            </div>
        );
    }
}


export default ScatterTest;