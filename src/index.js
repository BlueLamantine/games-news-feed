import dataStore from './data/dataStore';
import renderApp from './framework/render';
import App from './components/App/App';

window.dataStore = dataStore;

renderApp(App, document.getElementById('app-root'));
