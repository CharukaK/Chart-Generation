import React from 'react';
import {Scatter, ScatterChart, XAxis, YAxis,CartesianGrid,Tooltip,Legend} from 'recharts';
import PropTypes from 'prop-types';

export default class LineScatter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: props.width,
            height: props.height,
            xAxis:'pv',
            yAxis:'uv'
        };
    }

    colorDomain=['#11d800','#0009ca','#ff0013','#ff709d'];

    componentWillReceiveProps(nextProps){


    }


    render() {

        // console.log(this.state);
        let data2={};
        let keys=[];

        this.props.dataSet.map((d,i)=>{
           console.info(d);
           if(keys.includes(d.name)){
               data2[d.name].push(d);
           } else{
               keys.push(d.name);
               data2[d.name]=[d];
           }
        });
        // console.log(this.state.data);
        return (
            <ScatterChart width={this.state.width} height={this.state.height}
                          margin={{top: 20, right: 20, bottom: 20, left: 20}}>
                <XAxis dataKey='uv' ss={this.state.xAxis} name='stature' unit='cm' type='number'/>
                <YAxis dataKey='pv' ss={this.state.yAxis} name='weight' unit='kg' type='number'/>
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
                    keys.map((k,i)=>{
                        console.log('AAAAAAAAAAAAAA');
                        console.log(data2[k])
                        return <Scatter key={i} name={k} line={true} data={data2[k]} fill={this.colorDomain[i]} shape="circle"/>;
                    })
                }

            </ScatterChart>
        );
    }
}


LineScatter.propTypes={
    dataSet:PropTypes.array
};