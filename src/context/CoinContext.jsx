import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const apiKey = import.meta.env.VITE_API_KEY;

const CoinContextProvider = (props) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$"
  });

  const fetchAllCoin = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': apiKey  // Injected securely from .env
      }
    };

    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
        options
      );
      const data = await res.json();
      console.log("✅ CoinGecko API data:", data);
      setAllCoin(data);
    } catch (err) {
      console.error("❌ Error fetching data from CoinGecko:", err);
    }
  };

  useEffect(() => {
    fetchAllCoin();
  }, [currency]);

  return (
    <CoinContext.Provider value={{ allCoin, currency, setCurrency }}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
