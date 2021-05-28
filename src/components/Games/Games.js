/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework/element';
import { performRetrieve } from '../../data/newsData';
import { gamesInfo } from '../../data/SteamAPI';
import trackGames from './TrackGames';
import Checkbox from '../Checkbox/Checkbox';
import styles from './Games.css';

export default function AvailableGames() {
  return (
    <form
      id="games"
      onChange={event => {
        trackGames(event);
        performRetrieve();
      }}
    >
      <fieldset class="allowed_games">
        <legend>Select games to track news</legend>
        {gamesInfo.apps.map(({ appid, name }) => (
          <>
            <Checkbox
              id={appid}
              label={name}
              condition={window.dataStore.checkedGamesIDs.includes(appid.toString())}
            />
          </>
        ))}
      </fieldset>
    </form>
  );
}
