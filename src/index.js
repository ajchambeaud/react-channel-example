import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App title="ReactChannel test" />, document.getElementById('root'));
registerServiceWorker();
