/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, render } from '../../framework';
import { gamesInfo } from '../../data/SteamAPI';
import Checkbox from '../Checkbox/Checkbox';

function trackGames({ target }, setCurrentGameId, selectedGamesIDs, setSelectedGamesIDs) {
  const id = target.id;
  if (selectedGamesIDs.includes(id)) {
    setSelectedGamesIDs(selectedGamesIDs.filter(filterID => filterID !== id));
  } else {
    setSelectedGamesIDs([...selectedGamesIDs, id]);
    setCurrentGameId(id);
  }
  render();
}

export default function AvailableGames({
  setCurrentGameId,
  selectedGamesIDs,
  setSelectedGamesIDs,
}) {
  return (
    <form
      id="games"
      onChange={event => {
        trackGames(event, setCurrentGameId, selectedGamesIDs, setSelectedGamesIDs);
      }}
    >
      <fieldset class="allowed_games">
        <legend>Select games to track news</legend>
        {gamesInfo.apps.map(({ appid, name }) => (
          <>
            <Checkbox
              id={appid}
              label={name}
              condition={selectedGamesIDs.includes(appid.toString())}
            />
          </>
        ))}
      </fieldset>
    </form>
  );
}
