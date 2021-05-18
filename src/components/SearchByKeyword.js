export function renderSearch(searchByKeywordCB, clearInputCB) {
  return `
    <div>
    <p>Input KEYWORD and press enter</p>
    <input
        type="text"
        value="${window.dataStore.keyword}"
        onchange="(${searchByKeywordCB})(this.value);" 
    />
    <button 
      type="button"
      onclick="(${clearInputCB})"
      >Clear</button>
    </div>
  `;
}
