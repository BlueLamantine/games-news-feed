export function getDateFromUnixTimestamp(dt) {
  return new Date(dt * 1000).toLocaleDateString();
}
export function getMonthOfDate(dt) {
  return new Date(dt * 1000).getMonth();
}

export function getYearOfDate(dt) {
  return new Date(dt * 1000).getFullYear();
}

export const gamesInfo = {
  apps: [
    {
      appid: 730,
      name: 'Counter-Strike: Global Offensive',
    },
    {
      appid: 1091500,
      name: 'Cyberpunk 2077',
    },
    {
      appid: 570,
      name: 'Dota 2',
    },
    {
      appid: 578080,
      name: 'PUBG',
    },
    {
      appid: 440,
      name: 'TF2',
    },
  ],
};

export const ALLNEWS = 'alltime';

export const timestamps = [
  { id: 'all', value: 'alltime', name: 'All news' },
  { id: 'today', value: 'today', name: 'Today' },
  { id: 'week', value: 'week', name: 'For last 7 days' },
  { id: 'month', value: 'month', name: 'This month' },
];

export const herokuURL = 'https://not-so-corsy.herokuapp.com/getdata';

export function getNewsForGameUrl(gameId) {
  return `http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=${gameId}&count=20`;
}

export function sortDataByNewest(data) {
  return data.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getStartDate() {
  let now = new Date();
  let start = new Date(now);
  let dayOfWeek = now.getDay();
  let numDay = now.getDate() + 1;
  start.setDate(numDay - dayOfWeek - 6);

  return Math.floor(start / 1000);
}
