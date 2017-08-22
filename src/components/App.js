import React from 'react';
import ChartGenerator from './ChartGenerator';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,Bar,BarChart} from 'recharts';

class App extends React.Component {
    /*******************SAMPLE DATA**************************/
    data = [
        {name: '1', uv: 300, pv: 456},
        {name: '2', uv: -145, pv: 230},
        {name: '3', uv: -100, pv: 345},
        {name: '4', uv: -8, pv: 450},
        {name: '5', uv: 100, pv: 321},
        {name: '6', uv: 9, pv: 235},
        {name: '7', uv: 53, pv: 267},
        {name: '8', uv: 252, pv: -378},
        {name: '9', uv: 79, pv: -210},
        {name: '10', uv: 294, pv: -23},
        {name: '12', uv: 43, pv: 45},
        {name: '13', uv: -74, pv: 90},
        {name: '14', uv: -71, pv: 130},
        {name: '15', uv: -117, pv: 11},
        {name: '16', uv: -186, pv: 107},
        {name: '17', uv: -16, pv: 926},
        {name: '18', uv: -125, pv: 653},
        {name: '19', uv: 222, pv: 366},
        {name: '20', uv: 372, pv: 486},
        {name: '21', uv: 182, pv: 512},
        {name: '22', uv: 164, pv: 302},
        {name: '23', uv: 316, pv: 425},
        {name: '24', uv: 131, pv: 467},
        {name: '25', uv: 291, pv: -190},
        {name: '26', uv: -47, pv: 194},
        {name: '27', uv: -415, pv: 371},
        {name: '28', uv: -182, pv: 376},
        {name: '29', uv: -93, pv: 295},
        {name: '30', uv: -99, pv: 322},
        {name: '31', uv: -52, pv: 246},
        {name: '32', uv: 154, pv: 33},
        {name: '33', uv: 205, pv: 354},
        {name: '34', uv: 70, pv: 258},
        {name: '35', uv: -25, pv: 359},
        {name: '36', uv: -59, pv: 192},
        {name: '37', uv: -63, pv: 464},
        {name: '38', uv: -91, pv: -2},
        {name: '39', uv: -66, pv: 154},
        {name: '40', uv: -50, pv: 186}
    ];

    dataSet1 = {
        metadata:{
            names:['name','uv','pv'],
            types:['ordinal','linear','linear']
        },
        data:[
            {name: '1', uv: 300, pv: 456},
            {name: '2', uv: -145, pv: 230},
        ]
    };

    mapData = [
        {'country': 'ABW', 'population': 103000},
        {'country': 'Afghanistan', 'population': 22720000},
        {'country': 'Ecuador', 'population': 12646000},
        {'country': 'Egypt', 'population': 68470000},
        {'country': 'Eritrea', 'population': 6250000},
        {'country': 'Western Sahara', 'population': 293000},
        {'country': 'Spain', 'population': 39441700},
        {'country' : 'China', 'population' : 1277558000},

    ];

    data1 = [
        {name: 'Page A', uv: 2000, pv: 5000, amt: 2400},
        {name: 'Page B', uv: 2000, pv: 1398, amt: 2210},
        {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
        {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
        {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
        {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
        {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
        {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
        {name: 'Page B', uv: 4000, pv: 9000, amt: 2210},
        {name: 'Page C', uv: 2738, pv: 1728, amt: 2290},
        {name: 'Page D', uv: 1283, pv: 2039, amt: 2000},
        {name: 'Page E', uv: 3000, pv: 2357, amt: 2181},
        {name: 'Page F', uv: 4568, pv: 5000, amt: 2500},
        {name: 'Page G', uv: 7890, pv: 7890, amt: 2100}
    ];



    keys2=['Page A','Page B','Page C','Page D','Page E','Page F','Page G'];

    scatterData01 = [{x: 100, y: 200, z: 200}, {x: 120, y: 100, z: 260},
        {x: 170, y: 300, z: 400}, {x: 140, y: 250, z: 280},
        {x: 150, y: 400, z: 500}, {x: 110, y: 280, z: 200}];
    scatterData02 = [{x: 200, y: 260, z: 240}, {x: 240, y: 290, z: 220},
        {x: 190, y: 290, z: 250}, {x: 198, y: 250, z: 210},
        {x: 180, y: 280, z: 260}, {x: 210, y: 220, z: 230}];


    pieChartData = {
        pieData: [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
            {name: 'Group C', value: 300}, {name: 'Group D', value: 200}],
        colors: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
    };

    /**********************END OF SAMPLE DATA*******************************/


    /*************************CHART CONFIGS**************************************/

    lineChartConfig = {
        type: 'line',
        width: 800,
        height: 450,
        charts: [
            {type: 'line', lineStyle: 'linear', field: 'pv', color: '#8884d8'},
            {type: 'line', lineStyle: 'monotone', field: 'uv', color: '#82ca9d'}
        ],
        axis: {
            xAxis: {dataKey: 'name', label: 'page', minTickGap: 1},
            yAxis: {label: 'value'}
        }

    };

    lineChartConfig2={
      width:800,
      height:450,
      x:'rpm',
      charts:[{type:'line', lineStyle:'linear',y:'torque', color:'engineType'}],
      tickAngle:-30,
      minTickGap:1
    };

    barChartConfig = {
        type: 'bar',
        width: 800,
        height: 450,
        charts: [
            {type: 'bar', field: 'pv', color: '#8884d8'},
            {type: 'bar', field: 'uv', color: '#82ca9d'}
        ],
        axis: {
            xAxis: {dataKey: 'name', label: 'page', minTickGap: 1, tickAngle: -35},
            yAxis: {label: 'value'}
        }

    };


    areaChartConfig = {
        type: 'bar',
        width: 800,
        height: 450,
        charts: [
            {type: 'area', lineStyle: 'linear', field: 'pv', fill: '#8884d8', stack: 'test'},

        ],
        axis: {
            xAxis: {dataKey: 'name', label: 'page', minTickGap: 1, tickAngle: -35},
            yAxis: {label: 'value'}
        }

    };


    barChartStackedConfig = {
        type: 'stack-bar',
        stackOffSet: 'sign', //The type of offset function used to generate the lower and upper values in the series array
        width: 800,
        height: 450,
        charts: [
            {type: 'bar', field: 'pv', color: '#8884d8', stack: 'test'},
            {type: 'bar', field: 'uv', color: '#82ca9d', stack: 'test'}
        ],
        axis: {
            xAxis: {dataKey: 'name', label: 'page', minTickGap: 1, tickAngle: -35},
            yAxis: {label: 'value'}
        }

    };

    pieChartConfig = {
        type: 'pie',
        stackOffSet: 'none',
        width: 800,
        height: 450,
        innerRadius: 60,
        outerRadius: 120,


    };

    areaChartStackedConfig = {
        type: 'stack-area',
        stackOffSet: 'none',
        width: 800,
        height: 450,
        charts: [
            {type: 'area', lineStyle: 'linear', field: 'pv', fill: '#8884d8', stack: 'stack1'},
            {type: 'area', lineStyle: 'linear', field: 'uv', fill: '#82ca9d', stack: 'stack1'}
        ],
        axis: {
            xAxis: {dataKey: 'name', label: 'page', minTickGap: 1, tickAngle: -35},
            yAxis: {label: 'value'}
        }

    };

    scatterChartConfig = {
        type: 'scatter',
        width: 800,
        height: 450,
        charts: [
            {type: 'scatter', shape: 'circle', name: 'School A', data: 0, fill: '#8884d8'},
            {type: 'scatter', shape: 'circle', name: 'School B', data: 1, fill: '#82ca9d'}
        ],
        axis: {
            xAxis: {
                dataKey: 'x',
                name: 'stature',
                unit: 'cm',
                label: 'page',
                minTickGap: 1,
                tickAngle: -35,
                type: 'number'
            },
            yAxis: {dataKey: 'y', name: 'weight', unit: 'kg', label: 'value'},
            zAxis: {dataKey: 'z', range: [60, 400], name: 'score', unit: 'km'}
        }

    };



    tableConfig = {
        type: 'table',
        width: 800,
        height: 400,
        columns: ['name', 'pv', 'uv']
    };

    mapConfig = {
        type: 'map',
        width: 800,
        height: 400,
        charts: {
            type: 'europe',
            x: 'country',
            y: 'population',
            colors: {
                domain: [0, 100000000, 1400000000],
                range: ['#02dc00', '#fffe00', '#ff0010']
            },
            hover: {
                fill: '#607D8B',
                stroke: '#607D8B',
                strokeWidth: 0.75,
                outline: 'none',
            },
            pressed: {
                fill: '#FF5722',
                stroke: '#607D8B',
                strokeWidth: 0.75,
                outline: 'none',
            }
        }
    };

    /********************************END OF CHART CONFIGS****************************************/


    componentDidMount(){
        setInterval(()=>{
            this.dataSet1.data.append([
                {name:'1',pv:(Math.random()*100).toFixed(0),uv:(Math.random()*100).toFixed(0)},
                {name:'2',pv:(Math.random()*100).toFixed(0),uv:(Math.random()*100).toFixed(0)}
            ]);
        },2000);
    }


    render() {
        let test=this.data1.map((elem,i)=>{
           let e={};
           e['uv']=elem.uv;
           this.keys2.map((key)=>{
               if( key===elem.name) {
                   e[key] = elem.pv;

               }
           });
           return e;
        });
        console.info(test);
        return (
            <div>
                <div>
                    <h1>Line Chart</h1>
                    <ChartGenerator config={this.lineChartConfig} data={this.data}/>
                </div>
                <div>
                    <h1>Bar Chart</h1>
                    <ChartGenerator config={this.barChartConfig} data={this.data}/>
                </div>
                <div>
                    <h1>Area Chart</h1>
                    <ChartGenerator config={this.areaChartConfig} data={this.data}/>
                </div>
                <div>
                    <h1>Bar Chart stacked</h1>
                    <ChartGenerator config={this.barChartStackedConfig} data={this.data}/>
                </div>
                <div>
                    <h1>Area Chart stacked</h1>
                    <ChartGenerator config={this.areaChartStackedConfig} data={this.data}/>
                </div>
                <div>
                    <h1>Scatter Chart stacked</h1>
                    <ChartGenerator config={this.scatterChartConfig} data={[this.scatterData01, this.scatterData02]}/>
                </div>
                <div>
                    <h1>Pie Chart</h1>
                    <ChartGenerator config={this.pieChartConfig} data={this.pieChartData}/>
                </div>
                <div>
                    <h1>Table Chart</h1>
                    <ChartGenerator config={this.tableConfig} data={this.data}/>
                </div>

                <div>
                    <h1>Map Chart</h1>
                    <ChartGenerator config={this.mapConfig} data={this.mapData}/>
                </div>
                <div>
                    <LineChart width={2000} height={300} data={test}
                               margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <XAxis dataKey="uv" type='number' />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend />
                        {/*<Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>*/}
                        {/*<Line type="monotone" dataKey="uv" stroke="#82ca9d" />*/}
                        {this.keys2.map((k,i)=>{
                           return <Line connectNulls={false} key={'line'+i} type="monotone" dataKey={k} stroke="#82ca9d" />;
                        })}
                        {/*<Line type="monotone" dataKey="uv" stroke="#82ca9d" />*/}
                    </LineChart>

                    <BarChart width={2000} height={300} data={test}
                              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <XAxis dataKey="uv" />
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend />
                        {this.keys2.map((k,i)=>{
                            return  <Bar key={'barEka'+i} dataKey={k} fill="#82ca9d" />;
                        })}
                        {/*<Bar dataKey="pv" fill="#8884d8" />*/}
                        {/*<Bar dataKey="uv" fill="#82ca9d" />*/}
                    </BarChart>
                </div>
            </div>
        );
    }


}


export default App;