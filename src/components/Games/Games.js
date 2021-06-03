/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, render } from '../../framework';
import { gamesInfo } from '../../data/SteamAPI';
import Checkbox from '../Checkbox/Checkbox';
import { useDataContext } from '../../context';
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
  currentGameId,
  setCurrentGameId,
  //selectedGamesIDs,
  setSelectedGamesIDs,
}) {
  const selectedGamesIDs = useDataContext();

  //console.log(Array.from(selectedGamesIDs));
  return (
    <form
      id="games"
      onChange={event => {
        setCurrentGameId(event.target.id);
      }}
    >
      <fieldset class="allowed_games">
        <legend>Select games to track news</legend>
        {gamesInfo.apps.map(({ appid, name }) => (
          <>
            <Checkbox
              id={appid}
              label={name}
              condition={Array.from(selectedGamesIDs).includes(appid.toString())}
            />
          </>
        ))}
      </fieldset>
    </form>
  );
}
