import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Spinner from '../components/Spinner';

const mapStateToProps = (state) => {
    return {
        isFetching: state.isFetching
    };
};

export default connect(
    mapStateToProps
)(Spinner);