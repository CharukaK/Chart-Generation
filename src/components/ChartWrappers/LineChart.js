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
            let dm = {x: data.x, y: data.y};



            if (this.state.dataSet.has(data.category)) {
                // console.info(tmp.get(data.category));

                if (tmp.get(data.category).length > 20) {
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
        this.forceUpdate();
    }

    legend = [{title: 'rotary', color: 'blue', disabled: false}, {title: 'piston', color: 'red', disabled: false}];

    render() {


        return (

            <XYPlot height={500} width={800} animation={true} xType="time">

                <VerticalGridLines/>
                <HorizontalGridLines/>
                <XAxis title="time" tickFormat={this.myFormatter} tickTotal={10}/>
                <YAxis title="torque"/>
                <LineMarkSeries data={this.state.dataSet.get('Rotary')} color="blue">
                    <Hint/>
                </LineMarkSeries>
                <LineMarkSeries data={this.state.dataSet.get('Piston')} color="red" onValueClick={(event)=>{console.info(event);}}/>
                <DiscreteColorLegend items={this.legend} orientation="horizontal"/>

            </XYPlot>

        );
    }

    myFormatter(t){
        let m;
        switch (t.getMonth()){
            case 0:
                m='january';
                break;
            case 1:
                m='february';
                break;
            case 2:
                m='march';
                break;
            case 3:
                m='april';
                break;
            case 4:
                m='may';
                break;
            case 5:
                m='june';
                break;
            case 6:
                m='july';
                break;
            case 7:
                m='august';
                break;
            case 8:
                m='september';
                break;
            case 9:
                m='october';
                break;
            case 10:
                m='november';
                break;
            case 11:
                m='december';
                break;

        }

        return t.getDate()+' '+m;
    }

}

export default LineChart;