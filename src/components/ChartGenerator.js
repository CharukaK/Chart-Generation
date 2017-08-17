import React from 'react';
import {
    ZAxis,
    ScatterChart,
    Scatter,
    AreaChart,
    BarChart,
    ComposedChart,
    Bar,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    PieChart,
    Pie,
    Tooltip,
    Legend,
    Line,
    ReferenceLine,
    Cell
} from 'recharts';
import Topographies from './MapComponents/Topographies';
import Map from './MapComponents/Map';
import Topography from './MapComponents/Topography';
import Markers from './MapComponents/Markers';
import Marker from './MapComponents/Marker';
import CountryInfo from './MapComponents/jsonMapFiles/countryInfo';
import {scaleLinear} from 'd3-scale';

class ChartGenerator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            height: props.config.height || 450,
            width: props.config.width || 800
        };
    }


    render() {
        let {config} = this.props;
        return (
            <div>
                {
                    config.type === 'line' || config.type === 'bar' || config.type === 'area' ?
                        this.GenerateGraph(this.props.config, this.props.data) :
                        null
                }

                {
                    config.type === 'stack-bar' ?
                        this.StackedBarChart(this.props.config, this.props.data) :
                        null
                }
                {
                    config.type === 'stack-area' ?
                        this.StackedAreaChart(this.props.config, this.props.data) :
                        null
                }

                {
                    config.type === 'scatter' ?
                        this.ScatterPlot(this.props.config, this.props.data) :
                        null
                }

                {
                    config.type === 'pie' ?
                        this.generatePieChart(this.props.config, this.props.data) :
                        null
                }

                {
                    config.type === 'table' ?
                        this.genrateTable(this.props.config, this.props.data) :
                        null
                }


                {
                    config.type==='map' ?
                        this.mapGenerator(this.props.config,this.props.data) :
                        null
                }



            </div>
        );
    }


    GenerateGraph(config, data) {
        return (

            <ComposedChart width={this.state.width} height={this.state.height} data={data}
                           margin={{top: 5, right: 30, left: 20, bottom: 5}}>

                {config.axis.xAxis.tickAngle ?
                    <XAxis dataKey={config.axis.xAxis.dataKey}
                           tick={<CustomizedAxisTick tickAngle={config.axis.xAxis.tickAngle} stroke="#666"/>}
                           minTickGap={1}
                           type={config.axis.xAxis.type}

                    /> :
                    <XAxis dataKey={config.axis.xAxis.dataKey} minTickGap={config.axis.xAxis.minTickGap}
                           type={config.axis.xAxis.type}/>}
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend/>
                <ReferenceLine y={0} stroke='#000'/>

                {
                    config.charts && config.charts.length > 0 ?
                        config.charts.map((chart, i) => {
                            switch (chart.type) {
                                case 'line':
                                    return <Line key={'composed-line' + i} type={chart.lineStyle} dataKey={chart.field}
                                                 stroke={chart.color}/>;
                                case 'bar':
                                    return <Bar key={'composed-bar' + i} dataKey={chart.field} fill={chart.color}/>;
                                case 'area':
                                    return <Area key={'composed-area' + i} type={chart.lineStyle} dataKey={chart.field}
                                                 stroke={chart.stroke} fill={chart.fill}/>;
                            }
                        }) :
                        null
                }

            </ComposedChart>
        );
    }

    StackedBarChart(config, data) {
        return (
            <BarChart stackOffset={config.stackOffSet || 'sign'} width={this.state.width} height={this.state.height}
                      data={data}
                      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                {config.axis.xAxis.tickAngle ?
                    <XAxis dataKey={config.axis.xAxis.dataKey}
                           tick={<CustomizedAxisTick tickAngle={config.axis.xAxis.tickAngle} stroke="#666"/>}
                           minTickGap={1}
                           type={config.axis.xAxis.type}
                    /> :
                    <XAxis type={config.axis.xAxis.type} dataKey={config.axis.xAxis.dataKey}
                           minTickGap={config.axis.xAxis.minTickGap}/>}
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend/>
                <ReferenceLine y={0} stroke='#000'/>
                {
                    config.charts && config.charts.length > 0 ?
                        config.charts.map((chart, i) => {
                            switch (chart.type) {
                                case 'bar':
                                    return <Bar key={'stacked-bar' + i} dataKey={chart.field} fill={chart.color}
                                                stackId={chart.stack}/>;

                            }
                        }) :
                        null
                }

            </BarChart>
        );
    }



    /**
     * This function gives the color based on a value to the given range and domain*/
    mapColorScale(domainValues,colors){
        return scaleLinear().domain(domainValues).range(colors);
    }

    StackedAreaChart(config, data) {
        return (
            <AreaChart stackOffset={config.stackOffSet || 'none'} width={this.state.width} height={this.state.height}
                       data={data}
                       margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                {config.axis.xAxis.tickAngle ?
                    <XAxis type={config.axis.xAxis.type} dataKey={config.axis.xAxis.dataKey}
                           tick={<CustomizedAxisTick tickAngle={config.axis.xAxis.tickAngle} stroke="#666"/>}
                           minTickGap={1}

                    /> :
                    <XAxis type={config.axis.xAxis.type} dataKey={config.axis.xAxis.dataKey}
                           minTickGap={config.axis.xAxis.minTickGap}/>}
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend/>
                <ReferenceLine y={0} stroke='#000'/>
                {
                    config.charts && config.charts.length > 0 ?
                        config.charts.map((chart, i) => {
                            switch (chart.type) {
                                case 'area':
                                    return <Area key={'stacked-area' + i} dataKey={chart.field} fill={chart.fill}
                                                 stackId={chart.stack}/>;

                            }
                        }) :
                        null
                }

            </AreaChart>
        );
    }


    ScatterPlot(config, data) {
        return (
            <ScatterChart lineType='fitting' width={this.state.width} height={this.state.height}
                          margin={{top: 20, right: 20, bottom: 20, left: 20}}>
                <XAxis type={config.axis.xAxis.type} dataKey={config.axis.xAxis.dataKey} name={config.axis.xAxis.name}
                       unit={config.axis.xAxis.unit}/>
                <YAxis dataKey={config.axis.yAxis.dataKey} name={config.axis.yAxis.name} unit={config.axis.yAxis.unit}/>
                <ZAxis dataKey={config.axis.zAxis.dataKey} range={config.axis.zAxis.range} name={config.axis.zAxis.name}
                       unit={config.axis.zAxis.unit}/>
                <CartesianGrid/>
                <Tooltip cursor={{strokeDasharray: '3 3'}}/>
                <Legend/>
                {/*<Scatter name='A school' data={data01} fill='#8884d8' shape="star"/>*/}
                {/*<Scatter name='B school' data={data02} fill='#82ca9d' shape="triangle"/>*/}
                {
                    config.charts && config.charts.length > 0 ?
                        config.charts.map((chart, i) => {
                            switch (chart.type) {
                                case 'scatter':
                                    return <Scatter key={'scatter-' + i} name={chart.name} data={data[chart.data]}
                                                    fill={chart.fill} shape={chart.shape}/>;

                            }
                        }) :
                        null
                }
            </ScatterChart>
        );
    }



    /**
     * This function converts the country name into
     * Alpha - 3 code in case a whole country name is given
     **/
    convertCountryNamesToCode(countryName){

        if(countryName.length === 3){
            return countryName;
        }else {
            return CountryInfo[CountryInfo.map(x=>x.name).indexOf(countryName)]['alpha-3'];
        }



    }

    generatePieChart(config, data) {
        return (
            <PieChart width={this.state.width} height={this.state.height}>
                <Pie
                    data={data.pieData}
                    cx={this.state.width/2}
                    cy={this.state.height/2}
                    labelLine={true}
                    label={<CustomizedPieChartLabel/>}
                    outerRadius={config.outerRadius}
                    innerRadius={config.innerRadius}
                    fill="#8884d8"
                >
                    {
                        data.pieData.map((entry, index) => <Cell key={`pieChart-${index}`} fill={data.colors[index % data.colors.length]}/>)
                    }
                </Pie>
            </PieChart>

        );
    }

    genrateTable(config,data){
        return(
            <table style={{borderCollapse: 'collapse',width:'100%'}}>
                <tr>
                    {
                        config.columns.map((column,i)=>{
                            return(<th key={`tableHeader-${i}`} style={{backgroundColor: '#4CAF50',color: '#fff',textAlign: 'center',border:1,borderColor:'#ddd',padding:8}}>{column}</th>);
                        })
                    }
                </tr>
                {
                    data.map((d,i)=>{
                        return(
                            <tr key={`tableRow-${i}`}>
                                {config.columns.map(
                                    (column,k)=>(
                                        <td key={`r-${i}-${k}`} style={{textAlign: 'center',border:1,borderColor:'#ddd',borderStyle:'solid'}}>
                                            {d[column]}
                                        </td>
                                    )
                                )}
                            </tr>
                        );
                    })
                }
            </table>

        );
    }


    /**
     * This function generates a map to the given configuration
     * */
    mapGenerator(mapConfig,data){
        let trans=null;

        switch (mapConfig.charts.type){
            case 'world':
                trans={scale:100};
                break;
            default:
                console.error('mapTypeNotSupported');
                return;
        }

        return(
            <Map width={800} height={900} config={trans} legend={mapConfig.charts.colors}>

                <Topographies inbuiltMapType="world">
                    {(topographies, projection) => topographies.map((topography, i) => (
                        <Topography
                            key={i}
                            topography={topography}
                            projection={projection}
                            style={{
                                default: {
                                    fill: data.filter(e=>this.convertCountryNamesToCode(e.country)===topography.id).length>0 ?
                                                        this.mapColorScale(mapConfig.charts.colors.domain,mapConfig.charts.colors.range)(data.filter(e=>this.convertCountryNamesToCode(e.country)===topography.id)[0].population):'#607D8B',
                                    stroke: '#607D8B',
                                    strokeWidth: 0.75,
                                    outline: 'none',
                                },
                                hover: {
                                    fill: '#000000',
                                    stroke: '#607D8B',
                                    strokeWidth: 0.75,
                                    outline: 'none',
                                },
                                pressed: {
                                    fill: '#FF5722',
                                    stroke: '#607D8B',
                                    strokeWidth: 0.75,
                                    outline: 'none',
                                },
                            }}
                            onClick={()=>{console.info(topography);}}
                            tooltip={'hello'}
                        />

                    ))}
                </Topographies>

                {/*<Markers>*/}
                    {/*{this.data.map((city, i) => (*/}
                        {/*<Marker*/}
                            {/*key={i}*/}
                            {/*marker={city}*/}
                        {/*>*/}
                            {/*<circle*/}
                                {/*cx={0}*/}
                                {/*cy={0}*/}
                                {/*r={this.cityScale(city.population)}*/}
                                {/*fill='#0DFFE7'*/}
                                {/*stroke='#ffffff'*/}
                                {/*strokeWidth={2}*/}
                            {/*/>*/}

                        {/*</Marker>*/}
                    {/*))}*/}
                {/*</Markers>*/}


            </Map>
        );
    }
}


class CustomizedAxisTick extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {x, y, stroke, payload, tickAngle} = this.props;

        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={-10} dy={16} textAnchor="end" fill={stroke}
                      transform={`rotate(${tickAngle})`}>{payload.value}</text>
            </g>
        );
    }
}


class CustomizedPieChartLabel extends React.Component {
    constructor(props) {
        super(props);
        console.info(props);
    }

    render() {
        let { cx, cy, midAngle, innerRadius, outerRadius, percent, index,name } = this.props;
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius) * 0.5;
        const x  = cx + (outerRadius+20) * Math.cos(-midAngle * RADIAN);
        const y = cy  + (outerRadius+20) * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="#000" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${name} :${(percent * 100).toFixed(0)}%`}
            </text>
        );
    }

}



export default ChartGenerator;
