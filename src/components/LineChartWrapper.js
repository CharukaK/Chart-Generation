/**
 * Wrapper for LineChart Component by Re-Charts
 * */

import React from 'react';
import {LineChart, XAxis, YAxis, Line, Tooltip, Text, Legend, CartesianGrid, ReferenceLine} from 'recharts';
import {CustomizedAxisTick, CustomizedAxisLabel} from './helper';
import PropTypes from 'prop-types';


export default class LineChartWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            config: props.config,
            metadata: props.data.metadata,
            data: props.data.data
        };
    }

    render() {

        let {width, height, x, tickAngle, minTickGap, charts} = this.state.config;
        let data2 = null;
        charts[0].color ?
            data2 = this.state.data.map((elem) => {
                let e = {};
                e[x] = elem[x];
                e['' + elem[charts[0].color]] = elem[charts[0].y];

                return e;
            }) : data2 = this.state.data;


        return (
            <LineChart width={width} height={height} data={data2}
                       margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                {
                    tickAngle ?
                        <XAxis
                            dataKey={x}
                            tick={<CustomizedAxisTick tickAngle={tickAngle} stroke="#666"/>}
                            minTickGap={minTickGap || 1}
                            type={
                                this.state.metadata.types[this.state.metadata.names.indexOf(x)] === 'linear' ?
                                    'number' : 'category'
                            }
                        /> :
                        <XAxis
                            dataKey={x}
                            minTickGap={minTickGap || 1}
                            type={
                                this.state.metadata.types[this.state.metadata.names.indexOf(x)] === 'linear' ?
                                    'number' : 'category'
                            }/>
                }
                <YAxis
                    label={
                        <CustomizedAxisLabel
                            text={charts[0].y}/>
                    }
                />
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip content={<CustomToolTip  />}/>
                <Legend layout='vertical' align='right'/>
                <ReferenceLine y={0} stroke='#000'/>

                {
                    data2.map((line,i)=>{
                        return <Line connectNulls={true} key={'line'+i} type="monotone" dataKey={line} stroke="#82ca9d" />;
                    })
                }

            </LineChart>
        );
    }
}


class CustomToolTip extends React.Component {


    constructor(props) {
        super(props);
    }

    style = {
        background: '#000000',
        opacity: '80%',
        color: '#ffffff'
    };

    render() {
        const {active} = this.props;

        if (active) {
            const {payload, label,x,y} = this.props;
            return (
                <div style={this.style}>
                    <p className="label">{`${label} : ${payload[0].value}`}</p>
                </div>
            );
        }

        return null;
    }

}


CustomToolTip.propTypes = {
    type: PropTypes.string,
    payload: PropTypes.array,
    label: PropTypes.string,
    active: PropTypes.bool
};

LineChartWrapper.propTypes = {
    config: PropTypes.object,
    data: PropTypes.object
};