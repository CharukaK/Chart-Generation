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
    ArcSeries
} from 'react-vis';
import PropTypes from 'prop-types';
import '../../node_modules/react-vis/dist/style.css';

export default class ChartWrapperSingleTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            colorSet: ['red', 'green', 'blue', 'orange', 'yellow']
        };
    }

    componentWillReceiveProps(nextProps) {
        let {config, metadata, data} = nextProps;
        let chart = config.charts[0];
        let tmp = this.state.data;
        if (config.x) {
            if (chart.color) {
                data.map((d, i) => {
                    if (!tmp.hasOwnProperty(d[chart.color])) {
                        tmp[d[chart.color]] = [[]];
                    }

                    if (d[chart.y] !== null) {
                        let nElem=0;
                        tmp[d[chart.color]].forEach((arr)=>{
                            nElem+=arr.length;
                        });

                        if(nElem>config.maxLength){
                            tmp[d[chart.color]][0].shift();
                            if(tmp[d[chart.color]][0].length===0&&chart.type!=='bar'){
                                tmp[d[chart.color]].shift();
                            }
                        }
                        tmp[d[chart.color]][tmp[d[chart.color]].length-1].push({x:d[config.x],y:d[chart.y]});
                    }else {
                        tmp[d[chart.color]].push([]);
                    }
                });
            }
        }
        this.setState({
            data:tmp
        });
    }

    render() {
        let {config, metadata} = this.props;

        let chartComp=[];

        //
        // this.state.dataSets.forEach((key)=>{
        //    console.info(key);
        // });
        Object.keys(this.state.data).forEach((category)=>{
            this.state.data[category].map((dat,i)=>{
                switch (config.charts[0].type){
                    case 'line':
                        chartComp.push(
                            <LineMarkSeries key={`line_${category}_${i}`} data={dat} color={this.state.colorSet[Object.keys(this.state.data).indexOf(category)]}/>
                        );
                        break;
                    case 'bar':
                        if(config.alignment==='vertical'){
                            chartComp.push(
                                <VerticalBarSeries key={`line_${category}_${i}`} data={dat} color={this.state.colorSet[Object.keys(this.state.data).indexOf(category)]}/>
                            );
                        }else if(config.alignment==='horizontal'){
                            chartComp.push(
                                <HorizontalBarSeries key={`line_${category}_${i}`} data={dat} color={this.state.colorSet[Object.keys(this.state.data).indexOf(category)]}/>
                            );
                        }
                        break;
                }
            });
        });


        return (
            <div>
                {config.x ?
                    <XYPlot
                        width={config.width}
                        height={config.height}
                        xType={metadata.types[metadata.names.indexOf(config.x)]}
                        animation={true}>
                        <XAxis title={config.x}/>
                        <YAxis title={config.charts[0].y}/>
                        <VerticalGridLines/>
                        <HorizontalGridLines/>
                        {chartComp}
                    </XYPlot> :
                    <XYPlot
                        width={config.width}
                        height={config.height}
                        animation={true}>


                    </XYPlot>
                }
            </div>
        );
    }
}