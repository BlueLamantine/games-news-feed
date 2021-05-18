import getAvailableGames from './Games';
import getResults from './NewsResults';

export default function App() {
  return `<div>
    ${getAvailableGames()}
    ${getResults()}
    </div> `;
}
