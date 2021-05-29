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

export const herokuURL = 'https://not-so-corsy.herokuapp.com/getdata';

export function getNewsForGameUrl(gameId) {
  return `http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=${gameId}&count=20`;
}

export function loadNewsData(currentGameId) {
  const sourceURL = getNewsForGameUrl(currentGameId);

  return (
    fetch(herokuURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: sourceURL }),
    })
      .then(response => response.json())
      //.then(data => ({ data }.data));
      .then(data => ({ data }))
  );
}
