import { createContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import { MyDarkTheme, MyLightTheme } from "../views/Styles";
import BalanceModel from "../models/BalanceModel";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const [darkThemeOverride, setDarkThemeOverride] = useState(false);
  // instead of true, would be ideal to get this state directly from the settings storage object.

  const [themeColorStyle, setThemeColorStyle] = useState(
    darkThemeOverride === true
      ? MyDarkTheme
      : colorScheme === "dark"
      ? MyDarkTheme
      : MyLightTheme
  );

  useEffect(() => {
    setThemeColorStyle(
      darkThemeOverride === true
        ? MyDarkTheme
        : colorScheme === "dark"
        ? MyDarkTheme
        : MyLightTheme
    );
  }, [colorScheme, darkThemeOverride, themeColorStyle]);

  let balanceModel = new BalanceModel();
  const [balance, setBalance] = useState(balanceModel.getBalance());

  useEffect(() => {
    setBalance(balanceModel.getBalance());
  }, [balanceModel]);

  let context = {
    darkThemeOverride,
    setDarkThemeOverride,
    themeColorStyle,
    setThemeColorStyle,
    balance,
    setBalance,
    balanceModel,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export { AppContext, AppContextProvider };
