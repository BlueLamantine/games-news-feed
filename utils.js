export function getDateFromUnixTimestamp(dt) {
  return new Date(dt * 1000).toLocaleDateString();
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
  ],
};

export function getNewsForGameUrl(gameId) {
  return `http://cors-anywhere.herokuapp.com/api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=${gameId}&count=3`;
}
