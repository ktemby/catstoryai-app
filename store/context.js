import { createContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { MyDarkTheme, MyLightTheme} from "../views/Styles";

const AppContext = createContext();

const AppContextProvider = ({children}) => {
  const colorScheme = useColorScheme();
  const [darkThemeOverride, setDarkThemeOverride] = useState(false);
  // instead of true, would be idea to get this state directly from the settings storage object.

  const [themeColorStyle, setThemeColorStyle] = useState(darkThemeOverride === true ? MyDarkTheme : ((colorScheme === 'dark') ? MyDarkTheme : MyLightTheme));

  let context = {darkThemeOverride, setDarkThemeOverride, themeColorStyle, setThemeColorStyle};

  useEffect(() => {
    //setTheme(theme === 'auto' ? colorScheme : 'dark');
    setThemeColorStyle(darkThemeOverride === true ? MyDarkTheme : ((colorScheme === 'dark') ? MyDarkTheme : MyLightTheme));
  }, [colorScheme, darkThemeOverride, themeColorStyle]);

    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    )
}

export {
    AppContext,
    AppContextProvider
}


/*
setThemeColorStyle( (value === true) ? MyDarkTheme
  : (colorScheme === 'dark') ? MyDarkTheme : MyLightTheme);
*/
