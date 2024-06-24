// Function to set the theme
export function setTheme(theme) {
    // Check if the document object is available (to support server-side rendering)
    if (typeof document !== "undefined") {
      // Set the data-theme attribute on the document's root element
      document.documentElement.setAttribute('data-theme', theme);
      // Save the theme to local storage
      localStorage.setItem('theme', theme);
    }
}
  
// Function to get the theme
export function getTheme() {
  // Check if the document object is available (to support server-side rendering)
  if (typeof document !== "undefined") {
    // Retrieve the theme from local storage
    const theme = localStorage.getItem('theme');
    // If a theme is found, set it
    if (theme) {
      setTheme(theme);
    }
    // Return the theme
    return theme;
  }
  // Return null if the document object is not available
  return null;
}