export const gamesInfo = {
  apps: [
    {
      appid: 730,
      name: 'CS:GO',
    },
    {
      appid: 570,
      name: 'Dota 2',
    },
    {
      appid: 1091500,
      name: 'Cyberpunk 2077',
    },
    {
      appid: 945360,
      name: 'Among Us',
    },
    {
      appid: 271590,
      name: 'Grand Theft Auto V',
    },
    {
      appid: 252490,
      name: 'Rust',
    },
    {
      appid: 550,
      name: 'Left 4 Dead 2',
    },
    {
      appid: 221100,
      name: 'Day Z',
    },
    {
      appid: 1313860,
      name: 'EA SPORTS FIFA 21',
    },
    {
      appid: 1222670,
      name: 'The Sims 4',
    },
    {
      appid: 1085660,
      name: 'Destiny 2',
    },
    {
      appid: 578080,
      name: 'PUBG',
    },
    {
      appid: 8930,
      name: "Sid Meier's Civilization V",
    },
    {
      appid: 377160,
      name: 'Fallout 4',
    },
    {
      appid: 1172470,
      name: 'Apex Legends',
    },
    {
      appid: 252950,
      name: 'Rocket League',
    },
    {
      appid: 292030,
      name: 'The Witcher 3: Wild Hunt',
    },
    {
      appid: 220,
      name: 'Half-Life 2',
    },
    {
      appid: 346110,
      name: 'ARK: Survival Evolved',
    },
    {
      appid: 440,
      name: 'Team Fortress 2',
    },
  ],
};

export const herokuURL = 'https://not-so-corsy.herokuapp.com/getdata';

export function getNewsForGameUrl(gameId) {
  return `http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=${gameId}&count=20`;
}

export function loadNewsData(currentGameId) {
  const sourceURL = getNewsForGameUrl(currentGameId);

  return fetch(herokuURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: sourceURL }),
  })
    .then(response => response.json())
    .then(data => ({ data }));
}
