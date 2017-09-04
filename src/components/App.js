import React from 'react';
import Row from './RowComponent';
import ChartWrapper from './ChartWrapper';



class App extends React.Component{

    constructor(props){
        super(props);
    }

    metadata={
        names:['rpm','torque','horsepower', 'EngineType'],
        types:['linear','linear', 'ordinal','ordinal']
    };

    data=[[1, 10, 1, 'Piston'],[1, 20, 1, 'Rotary']];

    /**********************[START]Chart Configs***********************/
    lineChartConfig={
        x : 'rpm',
        charts : [{type: 'line',  y : 'torque', color: 'EngineType'}],
        maxLength: 10,
        width: 400,
        height: 200
    };

    /**********************[END]Chart Configs***********************/

    render(){
        return(
            <div>
                <center><h1>React-vis Samples</h1></center>
                <Row title="Line Charts">
                    <ChartWrapper metadata={this.metadata} data={this.data} config={this.lineChartConfig}/>
                </Row>
            </div>
        );
    }


}

export default App;