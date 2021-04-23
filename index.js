import { gameInfo } from './games.js';
import { newsByGame } from './fixtures.js';
import { getDateFromUnixTimestamp } from './utils';

window.dataStore = {
  currentGames: {},
};

renderApp();

function renderApp() {
  document.querySelector('#app-root').innerHTML = `
        ${App()}
    `;
}

function App() {
  return `
        <form id="games">${renderForm()}</form>
        <section id="feed">News feed will be here...</section>
    `;
}
window.renderNewsFeed = renderNewsFeed;

function renderNewsFeed() {
  let content = '';
  Object.keys(window.dataStore.currentGames).map(appid => {
    const newsData = newsByGame[appid];
    if (newsData) {
      const { date, title, contents } = newsData;

      content += `<h3 class="title">${title}</h3>`;
      content += `<div>${getDateFromUnixTimestamp(date)}</div>`;
      content += `<p class="content">${contents}</p>`;
    }
  });

  return content ? `<div>${content}</div>` : 'News feed will be here...';
}

function renderForm() {
  return ` 
        <fieldset>
        <legend class="headline">Select games to track news</legend>
        ${gameInfo.response.apps
          .map(
            ({ appid, name }) =>
              `<label for="${appid}">
                <input
                  type="checkbox"
                  id="${appid}"
                  class="main__checkbox"
                  name="${name}"
                  value="${appid}"
                  aria-label="csgo"
                />
                <span class="gaem__item">${name}</span>
              </label>`,
          )
          .join('')}
        </fieldset>
        `;
}

trackGames();

function trackGames() {
  document.querySelector('#games').addEventListener('change', ({ target }) => {
    if (target.type === 'checkbox') {
      if (target.checked === true) {
        window.dataStore.currentGames[target.value] = target.name;
        document.querySelector('#feed').innerHTML = window.renderNewsFeed();
      } else {
        delete window.dataStore.currentGames[target.value];
        document.querySelector('#feed').innerHTML = window.renderNewsFeed();
      }
    }
  });
}
