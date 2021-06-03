import { useEffect, useState } from '../framework';
import { loadNewsData } from '../data/SteamAPI';
import { currentDate } from '../utils';

export function useApp() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataStorage, setDataStorage] = useState({});
  const [currentGameId, setCurrentGameId] = useState('');

  useEffect(() => {
    if (currentGameId) {
      const currentGameDataIsLoaded = dataStorage[currentGameId];
      if (currentGameDataIsLoaded) return;
      // setIsLoading(true); - forever loading
      loadNewsData(currentGameId)
        .then(({ error, data }) => {
          if (error) {
            setError(error);
          } else if (data) {
            // setDataStorage({ ...dataStorage, [currentGameId]: data }); - doest work, why?
            dataStorage[currentGameId] = data;
          }
        })
        .catch(setError)
        .finally(() => setIsLoading(false));
    }
  }, [currentGameId]);

  const { selectedGamesIDs } = useDataNews(currentGameId, setCurrentGameId);
  return {
    currentGameId,
    setCurrentGameId,
    isLoading,
    error,
    cached: {
      data: dataStorage,
      IDs: selectedGamesIDs,
    },
    dataStorage,
    selectedGamesIDs,
  };
}

export function useDataNews(currentGameId, setCurrentGameId) {
  const [selectedGamesIDs, setSelectedGamesIDs] = useState([]);
  useEffect(() => {
    if (currentGameId) {
      selectedGamesIDs.includes(currentGameId.toString())
        ? setSelectedGamesIDs(
            selectedGamesIDs.filter(filterID => filterID !== currentGameId.toString()),
          )
        : setSelectedGamesIDs([...selectedGamesIDs, currentGameId]);
      setCurrentGameId('');
    }
  }, [currentGameId]);

  //console.log(dataStorage);
  return {
    selectedGamesIDs,
    setSelectedGamesIDs,
  };
}
