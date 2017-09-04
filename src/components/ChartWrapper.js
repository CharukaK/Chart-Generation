import React from 'react';
import PropTypes from 'prop-types';
import ChartWrapperSingle from "./ChartWrapperSingle";
import ChartWrapperSingleTest from "./ChartWrapperSingleTest";


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
                        null :
                        <ChartWrapperSingle metadata={metadata} config={config} data={data} />
                }
            </div>

        );
    }
}

export default ChartWrapper;