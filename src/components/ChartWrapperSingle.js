import React from 'react';
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    LineMarkSeries,
    MarkSeries,
    VerticalRectSeries,
    VerticalBarSeries,
    HorizontalBarSeries,
    HorizontalRectSeries,
    ArcSeries,
    Hint,
    DiscreteColorLegend
} from 'react-vis';
import PropTypes from 'prop-types';
import '../../node_modules/react-vis/dist/style.css';

class ChartWrapperSingle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            colorSet: ['#8884d8', '#82ca9d', 'blue', 'orange', 'yellow'],
            value: null
        };

        this.rememberValue = this.rememberValue.bind(this);
        this.forgetValue = this.forgetValue.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let {config, metadata, data} = nextProps;
        let tmp = this.state.data;
        let chart = config.charts[0];
        let xIndex = metadata.names.indexOf(config.x);
        let catIndex = metadata.names.indexOf(chart.color);
        let yIndex = metadata.names.indexOf(chart.y);


        let datum;
        // console.log(nextProps);
        //if config has x defined it's either Line,Bar, Area or Map
        if (config.x) {
            //if chart needs color categorizing

            if (chart.color) {

                data.forEach((d) => {
                    datum = d;
                    //if dataset already has color category
                    if (!tmp.hasOwnProperty(datum[catIndex])) {
                        tmp[datum[catIndex]] = [[]];
                    }

                    if (datum[yIndex] !== null) {
                        let nElem = 0;
                        tmp[datum[catIndex]].forEach((arr) => {
                            nElem += arr.length;
                        });

                        if (nElem > config.maxLength) {
                            tmp[datum[catIndex]][0].shift();
                            // console.log(tmp[datum[catIndex]][0])
                            if (tmp[datum[catIndex]][0].length === 0 && chart.type !== 'bar') {
                                tmp[datum[catIndex]].shift();
                            }
                        }

                        tmp[datum[catIndex]][tmp[datum[catIndex]].length - 1]
                            .push({x: datum[xIndex], y: datum[yIndex]});

                    } else if (chart.type !== 'bar') {
                        tmp[datum[catIndex]].push([]);
                    }

                });
            }
        } else {
            if(config.type==='scatter'){

            }
            //ToDo:Angle calculation for pie charts
        }

        this.setState({
            data: tmp
        });

    }


    rememberValue(value) {
        this.setState({value});
    }

    forgetValue() {
        this.setState({
            value: null
        });
    }

    render() {
        let {config, metadata} = this.props;

        let chartComp = [];
        let stacked = false;
        let items=[{title: 'Rotary', color: '#8884d8'},{title: 'Piston', color: '#3a3'}]

        //
        // this.state.dataSets.forEach((key)=>{
        //    console.info(key);
        // });
        Object.keys(this.state.data).forEach((category) => {
            this.state.data[category].map((dat, i) => {
                switch (config.charts[0].type) {
                    case 'line':
                        chartComp.push(
                            <LineMarkSeries
                                opacity={0.7} key={`line_${category}_${i}`} data={dat}
                                color={this.state.colorSet[Object.keys(this.state.data).indexOf(category)]}
                                onValueMouseOver={this.rememberValue}
                                onValueMouseOut={this.forgetValue}
                            />
                        );
                        break;
                    case 'bar':
                        if (config.alignment === 'vertical') {
                            chartComp.push(
                                <VerticalBarSeries opacity={0.7} key={`line_${category}_${i}`} data={dat}
                                                   color={this.state.colorSet[Object.keys(this.state.data).indexOf(category)]}/>
                            );
                        } else if (config.alignment === 'horizontal') {
                            chartComp.push(
                                <HorizontalBarSeries opacity={0.7} key={`line_${category}_${i}`} data={dat}
                                                     color={this.state.colorSet[Object.keys(this.state.data).indexOf(category)]}/>
                            );
                        }
                        stacked=config.charts[0].mode==='stacked';
                        break;
                }
            });
        });


        return (
            <div>
                <div style={{float:'left'}}>
                {config.x ?

                    (stacked ?

                            <XYPlot
                                width={config.width}
                                height={config.height}
                                xType={metadata.types[metadata.names.indexOf(config.x)]}
                                animation={true}
                                stackBy="y"

                            >

                                <VerticalGridLines/>
                                <HorizontalGridLines/>

                                {chartComp}
                                <XAxis title={config.x}/>
                                <YAxis title={config.charts[0].y}/>
                                {this.state.value ?
                                    <Hint value={this.state.value}/> :
                                    null
                                }
                            </XYPlot> :
                            <XYPlot
                                width={config.width}
                                height={config.height}
                                xType={metadata.types[metadata.names.indexOf(config.x)]}
                                animation={true}

                            >

                                <VerticalGridLines/>
                                <HorizontalGridLines/>

                                {chartComp}
                                <XAxis title={config.x}/>
                                <YAxis title={config.charts[0].y}/>
                                {this.state.value ?
                                    <Hint value={this.state.value}/> :
                                    null
                                }
                            </XYPlot>


                    ) :
                    <XYPlot
                        width={config.width}
                        height={config.height}
                        animation={true}>


                    </XYPlot>
                }
                </div>
                <div>
                <DiscreteColorLegend

                    height={200}
                    width={100}
                    items={items}
                />
                </div>
            </div>
        );
    }
}

ChartWrapperSingle.propTypes = {
    config: PropTypes.object.isRequired,
    metadata: PropTypes.object.isRequired,
    data: PropTypes.array
};

export default ChartWrapperSingle;