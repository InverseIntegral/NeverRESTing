import React, {PropTypes} from 'react';
import {If, Then} from 'react-if';

const Spinner = ({isFetching}) => {
    return (
        <If condition={isFetching}>
            <Then>
                <div className="center">
                    <div className="preloader-wrapper small active">
                        <div className="spinner-layer spinner-blue-only">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div>
                            <div className="gap-patch">
                                <div className="circle"></div>
                            </div>
                            <div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </Then>
        </If>
    );
};

Spinner.propTypes = {
    isFetching: PropTypes.bool.isRequired
};

export default Spinner;