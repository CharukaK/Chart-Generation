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
            dataSets: {},
            shiftKey:0
        };
    }

    componentWillReceiveProps(nextProps) {
        let {config, data} = nextProps;
        let tmp = this.state.dataSets;

        config.charts.forEach((chart) => {
            if (!tmp.hasOwnProperty(chart.type)) {
                tmp[chart.type]={};
            }

            data.forEach((d) => {

                if(!tmp[chart.type][d[chart.color]]){
                    tmp[chart.type][d[chart.color]]=[[]];
                }



                if(d[chart.y]!==null){
                    // tmp.get(chart.type).get(d[chart.color])[tmp.get(chart.type).get(d[chart.color]).length-1].concat([{x:d[config.x],y:d[chart.y]}]);
                    // tmp.get(chart.type).get(d[chart.color]).get(tmp.get(chart.type).get(d[chart.color]).keys().length-1)
                    //     .concat([{x:,y:}]);
                    let n=0;
                    // console.info(n);
                    tmp[chart.type][d[chart.color]].forEach((arr)=>{
                        n+=arr.length;
                    });
                    // console.info(n);
                    if(n>20){
                        tmp[chart.type][d[chart.color]][0].shift();
                        if(tmp[chart.type][d[chart.color]][0].length===0){
                            tmp[chart.type][d[chart.color]].shift();
                        }

                    }




                    tmp[chart.type][d[chart.color]][tmp[chart.type][d[chart.color]].length-1]
                        .push({x:d[config.x],y:d[chart.y],shiftKey:this.state.shiftKey});

                }else{
                    tmp[chart.type][d[chart.color]].push([]);
                }

            });

            this.setState({
                dataSets:tmp,
                shiftKey:this.state.shiftKey+1
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
        Object.keys(this.state.dataSets).forEach((chartTypes)=>{
            switch (chartTypes){
                case 'line':
                    Object.keys(this.state.dataSets[chartTypes]).forEach((categories)=>{
                       this.state.dataSets[chartTypes][categories].map((d,i)=>{
                           chartComp.push(<LineMarkSeries data={d}/>);
                       });
                    });
                    break;

            }
        });


        return (
            <XYPlot
                height={config.height}
                width={config.width}
                xType={metadata.types[metadata.names.indexOf(config.x)]}
                animation={true}>



                <XAxis/>
                <YAxis/>
                <HorizontalGridLines/>
                <VerticalGridLines/>
                {chartComp}
            </XYPlot>
        );
    }
}

export default WrapperTest;