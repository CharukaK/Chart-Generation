import React from 'react';
import Row from './RowComponent';
import ChartWrapper from './ChartWrapper';
import ScatterPlot from './ChartWrappers/Scatter';
import PIeChartSample from "./ChartWrappers/PIeChartSample";


class App extends React.Component{

    constructor(props){
        super(props);
        this.state={
            timer:1
        };
    }

    metadata={
        names:['rpm','torque','horsepower', 'EngineType'],
        types:['linear','linear', 'ordinal','ordinal']
    };

    colorSet=['red', 'green', 'blue', 'orange', 'yellow'];

    data=[[1, 10, 1, 'Piston'],[1, 20, 1, 'Rotary']];

    /**********************[START]Chart Configs***********************/
    lineChartConfig={
        x : 'rpm',
        charts : [{type: 'line',  y : 'torque', color: 'EngineType'}],
        colorSet:this.colorSet,
        maxLength: 10,
        width: 700,
        height: 450
    };

    barChartConfigVertical={
        x : 'rpm',
        charts : [{type: 'bar',  y : 'torque', color: 'EngineType'}],
        colorSet:this.colorSet,
        maxLength: 10,
        width: 700,
        height: 450,
        alignment:'vertical'
    };
    barChartConfigVerticalStacked={
        x : 'rpm',
        charts : [{type: 'bar',  y : 'torque', color: 'EngineType', mode:'stacked'}],
        colorSet:this.colorSet,
        maxLength: 10,
        width: 700,
        height: 450,
        alignment:'vertical'
    };
    barChartConfigHorizontal={
        x : 'torque',
        charts : [{type: 'bar',  y : 'rpm', color: 'EngineType'}],
        colorSet:this.colorSet,
        maxLength: 10,
        width: 700,
        height: 450,
        alignment:'horizontal'
    };
    areaChartConfig={
        x : 'rpm',
        charts : [{type: 'area',  y : 'torque', color: 'EngineType'}],
        colorSet:this.colorSet,
        maxLength: 10,
        width: 700,
        height: 450,

    };

    areaChartConfigStacked={
        x : 'rpm',
        charts : [{type: 'area',  y : 'torque', color: 'EngineType', mode:'stacked'}],
        colorSet:this.colorSet,
        maxLength: 10,
        width: 700,
        height: 450,

    };

    /**********************[END]Chart Configs***********************/

    componentDidMount(){
        setInterval(()=>{
            this.data=[[this.state.timer, Math.random()*100, Math.random()*100, 'Piston'],[this.state.timer, Math.random()*100, Math.random()*100, 'Rotary']];
            this.setState({
                timer:this.state.timer+1
            });
        },2000);
    }

    render(){
        return(
            <div>
                <center><h1>React-vis Samples</h1></center>
                <Row title="Line Charts">
                    <ChartWrapper metadata={this.metadata} data={this.data} config={this.lineChartConfig}/>
                </Row>

                <Row title="Vertical Bar Chart">
                    <ChartWrapper metadata={this.metadata} data={this.data} config={this.barChartConfigVertical}/>
                </Row>

                <Row title="Horizontal Bar Chart">
                    <ChartWrapper metadata={this.metadata} data={this.data} config={this.barChartConfigHorizontal}/>
                </Row>

                <Row title="Vertical Bar Chart Stacked">
                    <ChartWrapper metadata={this.metadata} data={this.data} config={this.barChartConfigVerticalStacked}/>
                </Row>

                <Row title="Area Chart">
                    <ChartWrapper metadata={this.metadata} data={this.data} config={this.areaChartConfig}/>
                </Row>
                <Row title="Area Chart Stacked">
                    <ChartWrapper metadata={this.metadata} data={this.data} config={this.areaChartConfigStacked}/>
                </Row>

                <Row title="Scatter Plot">
                    <ScatterPlot/>
                </Row>
                <Row title="Arc Series">
                    <PIeChartSample/>
                </Row>

            </div>
        );
    }


}

export default App;