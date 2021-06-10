import { useEffect, useState } from 'react';
import { loadNewsData } from './data/SteamAPI';

export default function useDataNews() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dataStorage, setDataStorage] = useState({});
  const [currentGameId, setCurrentGameId] = useState('');
  const [selectedGamesIDs, setSelectedGamesIDs] = useState([]);

  useEffect(() => {
    if (currentGameId) {
      selectedGamesIDs.includes(currentGameId.toString())
        ? setSelectedGamesIDs(
            selectedGamesIDs.filter(filterID => filterID !== currentGameId.toString()),
          )
        : setSelectedGamesIDs([...selectedGamesIDs, currentGameId]);

      const currentGameDataIsLoaded = dataStorage[currentGameId];
      if (currentGameDataIsLoaded) {
        setCurrentGameId('');
        return;
      }

      setIsLoading(true);
      loadNewsData(currentGameId)
        .then(({ error, data }) => {
          if (error) {
            setError(error);
          } else if (data) {
            setDataStorage({ ...dataStorage, [currentGameId]: data });
          }
        })
        .catch(setError)
        .finally(() => setIsLoading(false));

      setCurrentGameId('');
    }
  }, [currentGameId]);

  return {
    currentGameId,
    setCurrentGameId,
    isLoading,
    error,
    dataStorage,
    selectedGamesIDs,
  };
}
