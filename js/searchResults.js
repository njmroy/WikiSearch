// Exported function to clear search
export const deleteSearchResults = () => {
    //Set parent element to searchResults
    const parentElement = document.getElementById("searchResults");
    let child = parentElement.lastElementChild;
    
    while (child) {
      parentElement.removeChild(child);
      child = parentElement.lastElementChild;
    }
  };
  // Create search result for user
  // For each item in result array, dynamically 
  // create result contents div, image
  // uses 3 helper functions
  export const buildSearchResults = (resultArray) => {
    resultArray.forEach((result) => {
      const resultItem = createResultItem(result);
      const resultContents = document.createElement("div");
      resultContents.classList.add("resultContents");
      if (result.img) {
        const resultImage = createResultImage(result);
        resultContents.append(resultImage);
      }
      const resultText = createResultText(result);
      resultContents.append(resultText);
      resultItem.append(resultContents);
      const searchResults = document.getElementById("searchResults");
      searchResults.append(resultItem);
    });
  };
  
  // Dynamically create div element for result item, title, link
  const createResultItem = (result) => {
    const resultItem = document.createElement("div");
    resultItem.classList.add("resultItem");
    const resultTitle = document.createElement("div");
    resultTitle.classList.add("resultTitle");
    const link = document.createElement("a");
    link.href = `https://en.wikipedia.org/?curid=${result.id}`;
    link.textContent = result.title;
    link.target = "_blank";
    resultTitle.append(link);
    resultItem.append(resultTitle);
    return resultItem;
  };
  // Dynamically create div elements for image
  const createResultImage = (result) => {
    const resultImage = document.createElement("div");
    resultImage.classList.add("resultImage");
    const img = document.createElement("img");
    img.src = result.img;
    img.alt = result.title;
    resultImage.append(img);
    return resultImage;
  };
  
  //dynamically create result text, description 

  const createResultText = (result) => {
    const resultText = document.createElement("div");
    resultText.classList.add("resultText");
    const resultDescription = document.createElement("p");
    resultDescription.classList.add("resultDescription");
    resultDescription.textContent = result.text;
    resultText.append(resultDescription);
    return resultText;
  };
  
  // Clear number of search results 
  export const clearStatsLine = () => {
    document.getElementById("stats").textContent = "";
  };

  // Set number of search results in stat line
  export const setStatsLine = (numberOfResults) => {
    const statLine = document.getElementById("stats");
    if (numberOfResults) {
      statLine.textContent = `Displaying ${numberOfResults} results.`;
    } else {
      statLine.textContent = "Sorry, no results.";
    }
  };