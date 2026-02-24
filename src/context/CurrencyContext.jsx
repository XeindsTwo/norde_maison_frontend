import {createContext, useContext, useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

const CurrencyContext = createContext();

const AVAILABLE = ["rub", "kzt", "byn"];

export const CurrencyProvider = ({children}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getInitialCurrency = () => {
    const fromUrl = searchParams.get("currency");
    const fromStorage = localStorage.getItem("currency");

    if (AVAILABLE.includes(fromUrl)) return fromUrl;
    if (AVAILABLE.includes(fromStorage)) return fromStorage;

    return "rub";
  };

  const [currency, setCurrencyState] = useState(getInitialCurrency);

  const setCurrency = (newCurrency) => {
    if (!AVAILABLE.includes(newCurrency)) return;

    setCurrencyState(newCurrency);
    localStorage.setItem("currency", newCurrency);

    searchParams.set("currency", newCurrency);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{currency, setCurrency}}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);