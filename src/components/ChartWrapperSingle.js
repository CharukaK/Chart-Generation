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

class ChartWrapperSingle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        let {config, metadata, nextData} = nextProps;
        let tmp = this.state.data;
        let chart = config.charts[0];
        //if config has x defined it's either Line,Bar, Area or Map
        if (config.x) {
            //if chart needs color categorizing
            if (chart.color) {
                nextData.forEach((datum) => {
                    //if dataset already has color category
                    if(!tmp.hasOwnProperty(datum[metadata.names.indexOf(chart.color)])){
                        tmp[datum[metadata.names.indexOf(chart.color)]]=[[]];
                    }

                    if(datum[metadata.names.indexOf(chart.y)]!==null){
                        let nElem=0;
                        tmp[datum[metadata.names.indexOf(chart.color)]].forEach((arr)=>{
                            nElem+=arr.length;
                        });

                        if(nElem>config.maxLength){
                            tmp[datum[metadata.names.indexOf(chart.color)]][0].shift();

                            if(tmp[datum[metadata.names.indexOf(chart.color)]][0].length()===0&&chart.type!=='bar'){
                                tmp[datum[metadata.names.indexOf(chart.color)]].shift();
                            }
                        }

                        tmp[datum[metadata.names.indexOf(chart.color)]][tmp[datum[metadata.names.indexOf(chart.color)]].length-1]
                            .push({x:datum[metadata.names.indexOf(config.x)],y:datum[metadata.names.indexOf(chart.y)]});

                    }else if(chart.type!=='bar'){
                        tmp[datum[metadata.names.indexOf(chart.color)]].push([]);
                    }

                });
            }
        } else {
            //ToDo:Angle calculation for pie charts
        }



    }


    render() {
        let {config, metadata} = this.props;

        let chartComp=[];
        //
        // this.state.dataSets.forEach((key)=>{
        //    console.info(key);
        // });
        Object.keys(this.state.data).forEach((category)=>{
           category.map((dat,i)=>{
              switch (config.charts[0].type){
                  case 'length':
                      chartComp.push(<LineMarkSeries data={dat}/>);
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

ChartWrapperSingle.propTypes = {
    config: PropTypes.object.isRequired,
    metadata: PropTypes.array.isRequired,
    nextData:PropTypes.array
};

export default ChartWrapperSingle;