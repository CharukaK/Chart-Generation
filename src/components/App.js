import React from 'react';
import Row from './RowComponent';
import ChartWrapper from './ChartWrapper';



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
        width: 400,
        height: 200
    };

    barChartConfigVertical={
        x : 'rpm',
        charts : [{type: 'bar',  y : 'torque', color: 'EngineType'}],
        colorSet:this.colorSet,
        maxLength: 10,
        width: 400,
        height: 200,
        alignment:'vertical'
    };

    barChartConfigHorizontal={
        x : 'rpm',
        charts : [{type: 'line',  y : 'torque', color: 'EngineType'}],
        colorSet:this.colorSet,
        maxLength: 10,
        width: 400,
        height: 200,
        alignment:'vertical'
    };
    /**********************[END]Chart Configs***********************/

    componentDidMount(){
        setInterval(()=>{
            this.data=[[this.state.timer, Math.random()*100, Math.random()*100, 'Piston'],[this.state.timer, Math.random()*100, Math.random()*100, 'Rotary']];
            this.setState({
                timer:this.state.timer+1
            });
        },500);
    }

    render(){
        return(
            <div>
                <center><h1>React-vis Samples</h1></center>
                <Row title="Line Charts">
                    <ChartWrapper metadata={this.metadata} data={this.data} config={this.lineChartConfig}/>
                </Row>

                <Row title="Bar Charts">
                    <ChartWrapper metadata={this.metadata} data={this.data} config={this.barChartConfigVertical}/>
                </Row>
            </div>
        );
    }


}

export default App;