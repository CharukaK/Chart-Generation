import React from 'react';
import {
    XYPlot,
    XAxis,
    YAxis,
    LineMarkSeries,
    HorizontalGridLines,
    VerticalGridLines
} from 'react-vis';
import '../../../node_modules/react-vis/dist/style.css';


class WrapperTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSets: new Map()
        };
    }

    componentWillReceiveProps(nextProps) {
        let {config, data} = nextProps;
        let tmp = this.state.dataSets;
        console.info(tmp);
        config.charts.forEach((chart) => {
            if (!tmp.has(chart.type)) {
                tmp.set(chart.type, new Map());
            }

            data.forEach((d) => {

                if(!tmp.get(chart.type).has(d[chart.color])){
                    tmp.get(chart.type).set(d[chart.color],new Map());
                }



                if(d[chart.y]!==null){
                    // tmp.get(chart.type).get(d[chart.color])[tmp.get(chart.type).get(d[chart.color]).length-1].concat([{x:d[config.x],y:d[chart.y]}]);
                    // tmp.get(chart.type).get(d[chart.color]).get(tmp.get(chart.type).get(d[chart.color]).keys().length-1)
                    //     .concat([{x:,y:}]);
                }else{
                    // tmp.get(chart.type).get(d[chart.color]).push
                }

            });

            this.setState({
                dataSets:tmp
            });

        });

    }


    render() {
        let {config, metadata} = this.props;

        let chartComp=[];
        //
        // this.state.dataSets.forEach((key)=>{
        //    console.info(key);
        // });


        return (
            <XYPlot
                height={config.height}
                width={config.width}
                xType={metadata.types[metadata.names.indexOf(config.x)]}>


                <XAxis/>
                <YAxis/>
                <HorizontalGridLines/>
                <VerticalGridLines/>

            </XYPlot>
        );
    }
}

export default WrapperTest;