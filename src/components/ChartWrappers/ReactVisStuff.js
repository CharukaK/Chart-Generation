import React from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import LineChart from './LineChart';


class ReactVisStuff extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            timer: 0
        };
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                data: [
                    {category:'Piston',x:this.state.timer,y:Math.round(Math.random()*100)},
                    {category:'Rotary',x:this.state.timer,y:this.state.timer===20?null:Math.round(Math.random()*100)}
                ],
                timer:this.state.timer+1
            });
        }, 1000);
    }

    render() {

        return (
            <div className="App">
                <LineChart data={this.state.data} color={'category'}/>


                {/*<XYPlot height={200} width={200}>*/}
                {/*<VerticalGridLines/>*/}
                {/*<HorizontalGridLines/>*/}
                {/*<XAxis/>*/}
                {/*<YAxis/>*/}
                {/*<VerticalBarSeries data={data}/>*/}
                {/*</XYPlot>*/}

                {/*<XYPlot height={200} width={200}>*/}
                {/*<VerticalGridLines/>*/}
                {/*<HorizontalGridLines/>*/}
                {/*<XAxis/>*/}
                {/*<YAxis/>*/}
                {/*<MarkSeries data={data} />*/}
                {/*</XYPlot>*/}


            </div>

        );
    }
}

export default ReactVisStuff;