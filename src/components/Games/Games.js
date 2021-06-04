/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, render } from '../../framework';
import { gamesInfo } from '../../data/SteamAPI';
import Checkbox from '../Checkbox/Checkbox';
import { useAppContext } from '../../context';

export default function Games({ setCurrentGameId }) {
  const selectedGamesIDs = useAppContext();

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
