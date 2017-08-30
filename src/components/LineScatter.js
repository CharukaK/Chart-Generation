import React from 'react';
import {Scatter, ScatterChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import PropTypes from 'prop-types';

export default class LineScatter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: props.width,
            height: props.height,
            xAxis: 'pv',
            yAxis: 'uv',
            dataMin: 0,
            dataMax: 0
        };
    }

    colorDomain = ['#11d800', '#0009ca', '#ff0013', '#ff709d'];

    componentWillReceiveProps(nextProps) {

        this.forceUpdate();
    }


    render() {

        // console.log(this.state);
        let data2 = {};
        let keys = [];

        this.props.dataSet.map((d, i) => {
            if (Object.keys(data2).length === 0) {
                this.state.dataMax=d.pv;
                this.state.dataMin=d.pv;
            }
            console.info(d);
            if (keys.includes(d.name)) {
                data2[d.name].push(d);
                if(d.pv>this.state.dataMax){
                   this.state.dataMax=d.pv;
                }
            } else {
                keys.push(d.name);
                data2[d.name] = [d];
            }
        });
        // console.log(this.state.data);
        return (
            <ScatterChart width={this.state.width} height={this.state.height}
                          margin={{top: 20, right: 20, bottom: 20, left: 20}}>
                <XAxis dataKey='pv' ss={this.state.xAxis} domain={[this.state.dataMin, this.state.dataMax]} tick={<CustomizedAxisTick/>} name='stature' unit='cm' type='number'/>
                <YAxis dataKey='uv' ss={this.state.yAxis} name='weight' unit='kg' type='number'/>
                <CartesianGrid/>
                <Tooltip cursor={{strokeDasharray: '3 3'}}/>
                <Legend/>http://localhost:9000/
                {/*<Scatter name='A school' line={true} data={dataA} fill='#8884d8' shape="circle"/>*/}
                {/*<Scatter name='B school' line={true} data={dataB} fill='#82ca9d' shape="circle"/>*/}

                {/*{*/}
                {/*this.state.keys.map((k,i)=>{*/}
                {/*return(<Scatter key={i} name={k} line={true} data={this.state.data[k]} fill={this.colorDomain[i]} shape="circle"/>);*/}
                {/*})*/}
                {/*}*/}
                {
                    keys.map((k, i) => {
                        console.log('AAAAAAAAAAAAAA');
                        console.log(data2[k]);
                        return <Scatter key={i} name={k} line={true} data={data2[k]} fill={this.colorDomain[i]}
                                        shape="circle"/>;
                    })
                }

            </ScatterChart>
        );
    }


}

class CustomizedAxisTick extends React.Component {
    render() {
        const {x, y, stroke, payload} = this.props;
        // console.info(payload);
        var d = new Date(0);
        d.setUTCSeconds(parseInt(payload.value));
        var month = new Array(12);
        month[0] = 'January';
        month[1] = 'February';
        month[2] = 'March';
        month[3] = 'April';
        month[4] = 'May';
        month[5] = 'June';
        month[6] = 'July';
        month[7] = 'August';
        month[8] = 'September';
        month[9] = 'October';
        month[10] = 'November';
        month[11] = 'December';
        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={16} textAnchor="end" fill="#666"
                      transform="rotate(-35)">{`${d.getDate()} ${month[d.getUTCMonth()]}`}</text>
            </g>
        );
    }
}

LineScatter.propTypes = {
    dataSet: PropTypes.array
};