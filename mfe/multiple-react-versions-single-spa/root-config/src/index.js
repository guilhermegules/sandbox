import { registerApplication, start } from 'single-spa';

export const reactVersionMap = {
  '@mfe/app-react-17': { module: 'react-17', domModule: 'react-dom-17', version: '17.0.2', color: '#61dafb' },
  '@mfe/app-react-18': { module: 'react-18', domModule: 'react-dom-18', version: '18.3.1', color: '#764abc' },
  '@mfe/app-react-19': { module: 'react-19', domModule: 'react-dom-19', version: '19.2.7', color: '#00d8ff' },
};

registerApplication({
  name: '@mfe/app-react-17',
  app: () => System.import('@mfe/app-react-17'),
  activeWhen: ['/react-17'],
});

registerApplication({
  name: '@mfe/app-react-18',
  app: () => System.import('@mfe/app-react-18'),
  activeWhen: ['/react-18'],
});

registerApplication({
  name: '@mfe/app-react-19',
  app: () => System.import('@mfe/app-react-19'),
  activeWhen: ['/react-19'],
});

start();
