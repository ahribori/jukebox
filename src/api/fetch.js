import axios from 'axios';

export const fetchPlaylistItems = () => axios({
    method: 'get',
    url: `${process.env.REACT_APP_API_ORIGIN}/api/playlist`,
});