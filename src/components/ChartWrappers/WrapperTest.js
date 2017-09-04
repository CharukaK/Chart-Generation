import React from 'react';
import {
    XYPlot,
    XAxis,
    YAxis,
    LineMarkSeries,
    HorizontalGridLines,
    VerticalGridLines,
    VerticalBarSeries,VerticalRectSeries,
    AreaSeries
} from 'react-vis';
import '../../../node_modules/react-vis/dist/style.css';


class WrapperTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSets: {},

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
                        .push({x:d[config.x].getTime(),x0:d[config.x].getTime()-86400000,y:d[chart.y],shiftKey:this.state.shiftKey});

                }else{
                    tmp[chart.type][d[chart.color]].push([]);
                }

            });

            this.setState({
                dataSets:tmp,

            });

        });

    }

    colors=['blue','red'];


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
                    Object.keys(this.state.dataSets[chartTypes]).map((categories,i)=>{
                       this.state.dataSets[chartTypes][categories].map((d,k)=>{
                           chartComp.push(<LineMarkSeries data={d} color={this.colors[i]} curve="curveNatural"/>);
                       });
                    });
                    break;
                case 'bar':
                    Object.keys(this.state.dataSets[chartTypes]).map((categories,i)=>{
                        this.state.dataSets[chartTypes][categories].map((d,k)=>{
                            chartComp.push(<VerticalRectSeries opacity={0.5} data={d} color={this.colors[i]}/>);
                        });
                    });
                    break;
                case 'area':
                    Object.keys(this.state.dataSets[chartTypes]).map((categories,i)=>{
                        this.state.dataSets[chartTypes][categories].map((d,k)=>{
                            chartComp.push(<AreaSeries data={d} color={this.colors[i]} opacity={0.5}/>);
                        });
                    });
                    break;

            }
        });


        return (
            <XYPlot
                height={config.height}
                width={config.width}
                xType='time'
                animation={true}
                stackBy="y"

            >



                <XAxis tickTotal={10}/>
                <YAxis/>
                <HorizontalGridLines/>
                <VerticalGridLines/>
                {chartComp}
            </XYPlot>
        );
    }

    myFormatter(t){
        let d=new Date();
        d.setSeconds(t);
        let m=['january','february','march','april','may','june','july','august','september','october','november','december'];
        return d.getDate()+' '+m[d.getMonth()];
    }
}

export default WrapperTest;