import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui/Progress';
import purple from 'material-ui/colors/purple';

class Loading extends React.Component {
    static propTypes = {
    };

    static defaultProps = {};
    render() {
        return (
            <div style={{
                position: 'fixed',
                display: 'flex',
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(255,255,255,0.7)',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 100,
            }}>
                <CircularProgress
                    style={{
                        color: purple[500],
                    }}
                    size={150}
                    thickness={3} />
            </div>
        );
    }
}

export default Loading;
