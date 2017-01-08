import React, {PropTypes} from 'react';

const App = ({children}) => (
    <div className="flex_parent">
        {children}
    </div>
);

App.propTypes = {
    children: PropTypes.object.isRequired
};

export default App;