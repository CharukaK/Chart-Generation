import React from 'react';
import LineScatter from './LineScatter';

class ScatterTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'Page A', uv: 100, pv: new Date().getTime()},
                {name: 'Page B', uv: 200, pv: new Date().getTime()}
            ],
            timer: 0
        };
    }

    componentDidMount() {
        setInterval(() => {
            let d=new Date();
            console.info('timer',this.state.timer);
            d.setDate(d.getDate()+this.state.timer);
            console.info('time',d.getTime());
            for (let c = 0; c <1; c++) {

                this.setState({
                    data: this.state.data.concat([
                        {
                            name: 'Page A',
                            uv: parseInt((Math.random() * 10000).toFixed(0)),
                            pv: d.getTime()
                        },
                        {name: 'Page B', uv: parseInt((Math.random() * 10000).toFixed(0)),
                            pv: d.getTime() }
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
                                pv: d.getTime()
                            }
                        ])
                    });
                }
            }
            this.setState({

                timer: this.state.timer + 1
            });
        }, 1000);
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