import dataStore from './data/dataStore';
import renderApp from './framework/render';
import { performRetrieve, loadData } from './data/newsData';

window.dataStore = dataStore;
window.renderApp = renderApp;
window.performRetrieve = performRetrieve;
window.loadData = loadData;

renderApp();
