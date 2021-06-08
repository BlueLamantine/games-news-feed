import { createContext, useContext } from 'react';

export const AppContext = createContext({});
export const useAppContext = () => useContext(AppContext);

export const DataContext = createContext({});
export const useDataContext = () => useContext(DataContext);
