import { useEffect, useState } from '../framework';
import { loadNewsData } from '../data/SteamAPI';

export function useDataNews() {
  const [currentGameId, setCurrentGameId] = useState('');
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [selectedGamesIDs, setSelectedGamesIDs] = useState([]);
  const [dataStorage, setDataStorage] = useState({});

  useEffect(() => {
    if (currentGameId) {
      const currentGameDataIsLoaded = dataStorage[currentGameId];
      if (currentGameDataIsLoaded) return;

      loadNewsData(currentGameId)
        .then(({ error, data }) => {
          if (error) {
            setError(error);
          } else if (data) {
            dataStorage[currentGameId] = data;
          }
        })
        .catch(setError)
        .finally(() => setIsDataLoaded(true));
    }
  }, [currentGameId]);

  return {
    currentGameId,
    setCurrentGameId,
    selectedGamesIDs,
    setSelectedGamesIDs,
    error,
    isDataLoaded,
    dataStorage,
  };
}
