export function setTheme(theme) {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  }
  
  export function getTheme() {
    if (typeof document !== "undefined") {
      const theme = localStorage.getItem('theme');
      if (theme) {
        setTheme(theme);
      }
      return theme;
    }
    return null;
  }