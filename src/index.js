import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import './index.css';
import App from './App';
import AntiAdblock from './AntiAdblock';
import registerServiceWorker from './registerServiceWorker';

const pageView = () => {
    if (process.env.NODE_ENV === 'production') {
        ReactGA.initialize('UA-99983371-4');
        ReactGA.pageview(window.location.pathname + window.location.search);
    }
};

ReactDOM.render(
    <AntiAdblock>
        <App onLoad={pageView} />
    </AntiAdblock>
    , document.getElementById('root'));
registerServiceWorker();
