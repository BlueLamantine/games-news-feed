const setCurrentKeyword = function (value) {
  window.dataStore.keyword = value;
  window.renderApp();
};

export function renderSearch() {
  return `
    <div>
    <p>Input KEYWORD and press enter</p>
    <input
        type="text"
        id="search-input"
        placeholder="search"
        value="${window.dataStore.keyword}"
        onchange="(${setCurrentKeyword})(this.value);"
    />
    <button 
      type="button"
      onclick="window.renderApp();"
      >Search</button>
    </div>
  `;
}
