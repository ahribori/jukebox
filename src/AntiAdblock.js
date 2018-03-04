import React from 'react';

class AntiAdblock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <div style={{
                    position: 'fixed',
                    float: 'left',
                    textAlign: 'center',
                    width: '100%',
                    padding: 20,
                    zIndex: -1,
                }}>
                    광고 차단 플러그인을 해제해야 컨텐츠를 보실 수 있습니다.
                </div>
                <div className="ads adsby adsbygoogle">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default AntiAdblock;
