import React from 'react';
import PropTypes from 'prop-types';
import ChartWrapperSingle from "./ChartWrapperSingle";


class ChartWrapper extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {config,metadata,data} = this.props;
        return (

            <div>
                {
                    config.charts.length > 1 ?
                        <ChartWrapperSingle metadata={metadata} config={config} data={data} /> :
                        null
                }
            </div>

        );
    }
}

export default ChartWrapper;