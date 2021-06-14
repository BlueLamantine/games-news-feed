import { createContext, useContext } from 'react';

export const GamesIdsContext = createContext({});
export const useGamesIdsContext = () => useContext(GamesIdsContext);

export const GamesInfoContext = createContext({});
export const useGamesInfoContext = () => useContext(GamesInfoContext);
