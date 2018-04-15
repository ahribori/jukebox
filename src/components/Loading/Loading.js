import React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import grey from 'material-ui/colors/grey';

class Loading extends React.Component {
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
                        color: grey[600],
                    }}
                    size={100}
                    thickness={1} />
            </div>
        );
    }
}

export default Loading;
