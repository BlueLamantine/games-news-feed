export function getDateFromUnixTimestamp(dt) {
  return new Date(dt * 1000).toLocaleDateString();
}
export function getMonthOfDate(dt) {
  return new Date(dt * 1000).getMonth();
}

export function getYearOfDate(dt) {
  return new Date(dt * 1000).getFullYear();
}

export const currentDate = Math.floor(Date.now() / 1000);

export function sortDataByNewest(data) {
  return data.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function dataToHTML(data) {
  const parser = new DOMParser();
  const toHTML = parser.parseFromString(data, 'text/html');
  const content = toHTML.body.childNodes;
  const div = document.createElement('div');
  Array.from(content).forEach(el => div.appendChild(el));
  return div;
}

export function getStartDate() {
  let now = new Date();
  let start = new Date(now);
  let dayOfWeek = now.getDay();
  let numDay = now.getDate() + 1;
  start.setDate(numDay - dayOfWeek - 6);

  return Math.floor(start / 1000);
}
