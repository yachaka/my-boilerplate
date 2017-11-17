
import app from './server';
import http from 'http';

const server = http.createServer(app);

let currentApp = app;

server.listen(process.env.PORT || 3000);

// HMR
if (module.hot) {
  const chalk = require('chalk');
  console.log('✅  Server-side HMR Enabled!');

  module.hot.accept('./server', () => {
    const d = new Date();
    
    console.log(" ");
    console.log(chalk.gray(`${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`));
    console.log('🔁  HMR Reloading `./server`...');

    server.removeListener('request', currentApp);
    const newApp = require('./server').default;
    server.on('request', newApp);
    currentApp = newApp;
  });
}
