import { createContext } from "react";
import { useState } from "react";
import { useLayoutEffect } from "react";

export const TrendingContext = createContext({});

export const TrendingProvider = ({ children }) => {
  const [trendData, setTrendData] = useState()

  const getTrendData = async () => {
    // https://api.coingecko.com/api/v3/coins/list

   

    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/search/trending`
      ).then((res) => res.json().then((json) => json));

      console.log("coindata",data);
      setTrendData(data.coins);
    } catch (error) {
      console.log(error);
    }
  };



  const resetTrendingResult = () => {
    getTrendData();
  };

  useLayoutEffect(() => {
    getTrendData();
  }, []);
  return (
    <TrendingContext.Provider
      value={{
        trendData,
        resetTrendingResult,
      }}
    >
      {children}
    </TrendingContext.Provider>
  );
};
