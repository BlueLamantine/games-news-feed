import dataStore from './data/dataStore';
import renderApp from './framework/render';
import { performRetrieve, loadData } from './data/newsData';
import App from './components/App';

window.dataStore = dataStore;
window.renderApp = renderApp;
window.performRetrieve = performRetrieve;
window.loadData = loadData;

const ROOTID = 'app-root';
renderApp(App, ROOTID);
