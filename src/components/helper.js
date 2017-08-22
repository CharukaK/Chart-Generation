import React from 'react';


export class CustomizedAxisTick extends React.Component {
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


export class CustomizedAxisLabel extends React.Component{
    constructor(props){
        super(props);
        console.log(props);
    }

    render(){
        const {stroke} = this.props;
        return(
            <g >
                <text x={0} y={0} dy={18} textAnchor="end" fill={stroke}
                      transform='rotate(-90)'>{this.props.text}</text>
            </g>
        );
    }
}


export const colorPalette=[

];