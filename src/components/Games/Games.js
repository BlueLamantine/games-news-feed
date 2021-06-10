import React from 'react';
import { gamesInfo } from '../../data/SteamAPI';
import Checkbox from '../Checkbox/Checkbox';
import { useAppContext } from '../../context';
import styles from './Games.css';
export default function Games({ setCurrentGameId }) {
  const selectedGamesIDs = useAppContext();

  return (
    <div className={styles.side_wrapper}>
      <form
        id="games"
        onChange={event => {
          setCurrentGameId(event.target.id);
        }}
      >
        <fieldset>
          <div className={styles.side_title}>Select games to track news</div>
          <div className={styles.side_menu}>
            {gamesInfo.apps.map(({ appid, name }) => (
              <Checkbox
                key={appid}
                id={appid}
                label={name}
                condition={Array.from(selectedGamesIDs).includes(appid.toString())}
              />
            ))}
          </div>
        </fieldset>
      </form>
    </div>
  );
}
