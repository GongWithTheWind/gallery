import React from 'react';
import ReactDOM from 'react-dom';
import path from 'path';
import App from './components/App.js';

let homeId = window.location.href.split('/');
//       homeId = homeId[homeId.length-2]; //THIS IS A STRING, NEED TO CONVERT TO INT?

ReactDOM.render(<App homeId={homeId}/>, document.getElementById('gallery'));

// window.Gallery = App;