import {createContext,useState,useEffect} from 'react';
import { useColorScheme } from 'react-native';
import { MyDarkTheme, MyLightTheme} from "../views/Styles";

const AppContext = createContext();

const AppContextProvider = ({children}) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(colorScheme);
  const [themeColorStyle, setThemeColorStyle] = useState(
    theme === 'dark' ? MyDarkTheme :
    (theme === 'auto') ? (colorScheme === 'dark' ? MyDarkTheme : MyLightTheme) : MyLightTheme);

  //state = {theme, setTheme, themeColorStyle, setThemeColorStyle};

  useEffect(() => {
    console.log(`colorscheme theme: ${theme}`)
      setThemeColorStyle(theme === 'dark' ? MyDarkTheme : MyLightTheme);
    }, [theme]);

    return (
        <AppContext.Provider value={{theme, setTheme, themeColorStyle, setThemeColorStyle}}>
            {children}
        </AppContext.Provider>
    )
}

export {
    AppContext,
    AppContextProvider
}
