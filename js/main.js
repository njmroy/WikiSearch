import {
    setSearchFocus,
    showClearTextButton,
    clearSearchText,
    clearPushListener
  } from "./searchBar.js";
  import {
    deleteSearchResults,
    buildSearchResults,
    clearStatsLine,
    setStatsLine
  } from "./searchResults.js";
  import { getSearchTerm, retrieveSearchResults } from "./dataFunctions.js";
  
  document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
      initApp();
    }
  });
  
  // Main app function, listeners for search, input, click, keydown, submit, clear
  const initApp = () => {
    setSearchFocus();
    const search = document.getElementById("search");
    search.addEventListener("input", showClearTextButton);
    const clear = document.getElementById("clear");
    clear.addEventListener("click", clearSearchText);
    clear.addEventListener("keydown", clearPushListener);
    const form = document.getElementById("searchBar");
    form.addEventListener("submit", submitTheSearch);
  };
  
  // Procedural "workflow" function
  // what happens when search is submited
  // Delete previous search results first, 
  // Process new search
  const submitTheSearch = (event) => {
    event.preventDefault();
    deleteSearchResults();
    processTheSearch();
    setSearchFocus();
  };
  
  // Procedural search
  // Clear stats
  // Get search term
  // Send to Wiki and process
  // Build results if result exists
  const processTheSearch = async () => {
    clearStatsLine();
    const searchTerm = getSearchTerm();
    if (searchTerm === "") return;
    const resultArray = await retrieveSearchResults(searchTerm);
    if (resultArray.length) buildSearchResults(resultArray);
    setStatsLine(resultArray.length);
  };