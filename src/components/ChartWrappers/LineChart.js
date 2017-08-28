import React from 'react';
import {
    XYPlot,
    LineSeries,
    VerticalGridLines,
    HorizontalGridLines,
    XAxis,
    YAxis,
    VerticalBarSeries,
    MarkSeries,
    LineMarkSeries,
    DiscreteColorLegend,
    Hint
} from 'react-vis';
import '../../../node_modules/react-vis/dist/style.css';


class LineChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSet: new Map()
        };
    }

    componentWillReceiveProps(nextProps) {
        nextProps.data.map((data, i) => {


            let tmp = this.state.dataSet;
            let dm={x:data.x,y:data.y};

            if (this.state.dataSet.has(data.category)) {
                // console.info(tmp.get(data.category));

                if(tmp.get(data.category).length>20){
                    tmp.get(data.category).shift();
                }
                tmp.get(data.category).push(dm);
            } else {
                tmp.set(data.category, [dm]);
            }

            this.setState({
                dataSet: tmp
            });
        });

    }

    legend=[{title:'rotary',color:'blue',disabled:false},{title:'piston',color:'red',disabled:false}];
    render() {


        return (

            <XYPlot height={500} width={800} animation={true}>

                <VerticalGridLines/>
                <HorizontalGridLines/>
                <XAxis title="rpm"/>
                <YAxis title="torque"/>
                <LineMarkSeries data={this.state.dataSet.get('Rotary')} color="blue">
                    <Hint/>
                </LineMarkSeries>
                <LineMarkSeries data={this.state.dataSet.get('Piston')} color="red"/>
                <DiscreteColorLegend items={this.legend} orientation="horizontal"/>

            </XYPlot>

        );
    }
}

export default LineChart;