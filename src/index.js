import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const pageView = () => {
    if (process.env.NODE_ENV === 'production') {
        ReactGA.initialize('UA-99983371-4');
        ReactGA.pageview(window.location.pathname + window.location.search);
    }
};

ReactDOM.render(<App onLoad={pageView} />, document.getElementById('root'));
registerServiceWorker();
