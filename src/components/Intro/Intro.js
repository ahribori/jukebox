import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';
import Checkbox from 'material-ui/Checkbox';
import PlaylistAddIcons from 'material-ui-icons/PlaylistAdd';
import PlaylistPlayIcons from 'material-ui-icons/PlaylistPlay';

import {
    setAppStateToLocalStorage,
    getAppStateToLocalStorage,
} from '../../utils/storage';

class Intro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            checked: false,
        };
    }

    handleClose = () => {
        if (this.state.checked) {
            const appState = getAppStateToLocalStorage();
            appState.tutorial = false;
            setAppStateToLocalStorage(appState);
            console.log(appState)
        }
        this.setState({ open: false });
    };

    handleChecked = (e) => {
        this.setState({
            checked: !this.state.checked,
        })
    };

    render() {
        return (
            <Dialog
                onClose={this.handleClose}
                disableBackdropClick={true}
                disableEscapeKeyDown={true}
                aria-labelledby="simple-dialog-title"
                open={this.state.open}
            >
                <DialogTitle id="simple-dialog-title">매일 업데이트 되는 TOP 100 인기차트 노래 듣기, 주크박스에 오신 것을 환영합니다!</DialogTitle>
                <DialogContent style={{
                    fontWeight:300,
                }}>
                    <ul>
                        <li>노래는 인기 순위를 반영하여 매일 업데이트 됩니다. (서버 사정에 따라 반영이 늦을 수도 있습니다)</li>
                        <li>
                            <PlaylistAddIcons style={{ position:'relative', top: 6 }} />
                            버튼을 눌러 내 플레이리스트에 노래를 저장할 수 있습니다.</li>
                        <li>
                            <PlaylistPlayIcons style={{ position:'relative', top: 6 }} />
                            버튼을 눌러 내 플레이리스트를 열고 닫을 수 있습니다.</li>
                        <li style={{ position:'relative', top: 6 }}>내 플레이리스트는 현재 사용하고 계신 웹 브라우저에 저장됩니다.</li>
                    </ul>
                </DialogContent>
                <DialogActions>
                    <div>
                        <Checkbox
                            checked={this.state.checked}
                            onChange={this.handleChecked}
                            value="checked"
                        />
                        <span style={{ fontWeight: 300 }}>
                            다시 보지 않기
                        </span>
                    </div>
                    <Button onClick={this.handleClose} color="primary" autoFocus>
                        닫기
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default Intro;
