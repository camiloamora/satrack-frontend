export const setColorSheme = ({ isDarkMode, setIsChecked }) => {
  const colorScheme = isDarkMode ? "dark" : "light";
  document.querySelector("body").dataset.colorScheme = colorScheme;
  window.localStorage.setItem("prefers-color-scheme", colorScheme);
  setIsChecked(isDarkMode);
};

export const initialColorSheme = ({ setIsChecked }) => {
  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme:dark)');
  darkModeMediaQuery?.addListener((event) => {
    setColorSheme({
      isDarkMode: event.matches,
      setIsChecked,
    });
  });

  const localStorageColorScheme = window.localStorage.getItem(
    "prefers-color-scheme"
  );

  if (localStorageColorScheme) {
    setColorSheme({
      isDarkMode: localStorageColorScheme === "dark",
      setIsChecked,
    });
  } else {
    // Load from media query
    const isDarkMode = darkModeMediaQuery?.matches;
    setColorSheme({ isDarkMode, setIsChecked });
  }
};
