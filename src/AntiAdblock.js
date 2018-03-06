import React from 'react';
import adblockDetect from 'adblock-detect';

class AntiAdblock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adblockDetected: false,
        };
    }

    componentDidMount() {
        adblockDetect(adblockDetected => {
            this.setState({
                adblockDetected,
            })
        })
    }

    renderAdblockDetectedMessage = () => (
        <div
            className="adblock-message"
            style={{
                position: 'fixed',
                float: 'left',
                textAlign: 'center',
                width: '100%',
                paddingTop: 20,
            }}
        >
            광고 차단 플러그인을 해제해야 컨텐츠를 보실 수 있습니다.
        </div>
    );

    render() {
        return (
            <div>
                {this.state.adblockDetected && this.renderAdblockDetectedMessage()}
                <div
                    className="ads adsby adsbygoogle"
                >
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default AntiAdblock;
