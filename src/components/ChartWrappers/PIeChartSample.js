import React from 'react';

import {XYPlot, ArcSeries,XAxis,YAxis,VerticalGridLines,HorizontalGridLines } from 'react-vis';
import '../../../node_modules/react-vis/dist/style.css';

export default class PIeChartSample extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const myData = [
            {angle0: 0, angle: Math.PI / 4, opacity: 0.2, radius: 2, radius0: 1,color:'red'},
            {angle0: Math.PI / 4, angle: 2 * Math.PI / 4, radius: 3, radius0: 0,color:'blue' },
            {angle0: 2 * Math.PI / 4, angle: 3 * Math.PI / 4, radius: 2, radius0: 0,color:'black'},
            {angle0: 3 * Math.PI / 4, angle: 4 * Math.PI / 4, radius: 2, radius0: 0,color:'orange'},
            {angle0: 4 * Math.PI / 4, angle: 5 * Math.PI / 4, radius: 5, radius0: 0,color:'green'},
            {angle0: 0, angle: 5 * Math.PI / 4, radius: 1.1, radius0: 0.8,color:'yellow' }
        ];
        return (
            <div style={{padding: 10}}>
                <XYPlot
                    xDomain={[-5, 5]}
                    yDomain={[-5, 5]}
                    width={800}
                    height={800}>
                    <VerticalGridLines/>
                    <HorizontalGridLines/>
                    <XAxis />
                    <YAxis />
                    <ArcSeries
                        animation
                        radiusDomain={[0, 5]}
                        center={{x: 0, y: 0}}
                        data={myData}
                        colorType={'literal'}
                    />
                </XYPlot>

            </div>
        );
    }
}