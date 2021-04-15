// Get search element from DOM 
// reformat search into valid format
export const getSearchTerm = () => {
    const rawSearchTerm = document.getElementById("search").value.trim();
    // Looks for multiple spaces in search
    const regex = /[ ]{2,}/gi;
    // Removes multiple spaces from search term 
    const searchTerm = rawSearchTerm.replaceAll(regex, " ");
    return searchTerm;
  };
  
// Use 3 helper functions to process search term and get results from Wiki API
  export const retrieveSearchResults = async (searchTerm) => {
    const wikiSearchString = getWikiSearchString(searchTerm);
    const wikiSearchResults = await requestData(wikiSearchString);
    let resultArray = [];
    if (wikiSearchResults.hasOwnProperty("query")) {
      resultArray = processWikiResults(wikiSearchResults.query.pages);
    }
    return resultArray;
  };
  
  //Helper - Takes search term and inputs into API request 
  const getWikiSearchString = (searchTerm) => {
    const maxChars = getMaxChars();
    const rawSearchString = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchTerm}&gsrlimit=20&prop=pageimages|extracts&exchars=${maxChars}&exintro&explaintext&exlimit=max&format=json&origin=*`;
    const searchString = encodeURI(rawSearchString);
    return searchString;
  };
  
  //Helper - Responsive amount of maximum characters to display based on screen size 
  const getMaxChars = () => {
    const width = window.innerWidth || document.body.clientWidth;
    let maxChars;
    if (width < 414) maxChars = 65;
    if (width >= 414 && width < 1400) maxChars = 100;
    if (width >= 1400) maxChars = 130;
    return maxChars;
  };
  
  // Wait for JSON data response from Wiki API
  const requestData = async (searchString) => {
    try {
      const response = await fetch(searchString);
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  // Take raw results and deserialize into resultArray
  const processWikiResults = (results) => {
    const resultArray = [];
    Object.keys(results).forEach((key) => {
      const id = key;
      const title = results[key].title;
      const text = results[key].extract;
      const img = results[key].hasOwnProperty("thumbnail")
        ? results[key].thumbnail.source
        : null;
      const item = {
        id: id,
        title: title,
        img: img,
        text: text
      };
      resultArray.push(item);
    });
    return resultArray;
  };