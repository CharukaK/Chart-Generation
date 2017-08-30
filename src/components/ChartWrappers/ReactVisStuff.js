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
            let day=new Date();
            day.setDate(day.getDate()+this.state.timer);
            console.info(day);
            this.setState({
                data: [
                    {category:'Piston',x:day,y:Math.round(Math.random()*100)},
                    {category:'Rotary',x:day,y:this.state.timer===20?null:Math.round(Math.random()*100)}
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