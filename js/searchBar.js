export const setSearchFocus = () => {
    document.getElementById("search").focus();
  };
  // Show clear text button if text is found, otherwise HIDE 
  // get search and clear, modify
  export const showClearTextButton = () => {
    const search = document.getElementById("search");
    const clear = document.getElementById("clear");
    if (search.value.length) {
      clear.classList.remove("none");
      clear.classList.add("flex");
    } else {
      clear.classList.add("none");
      clear.classList.remove("flex");
    }
  };
  
  // Get search element
  // add none and flex to class to clear search
  export const clearSearchText = (event) => {
    event.preventDefault();
    document.getElementById("search").value = "";
    const clear = document.getElementById("clear");
    clear.classList.add("none");
    clear.classList.remove("flex");
    setSearchFocus();
  };
  
  // Listen for clear commands
  export const clearPushListener = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      document.getElementById("clear").click();
    }
  };