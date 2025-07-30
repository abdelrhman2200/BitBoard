import React, { useEffect, useState } from "react";
import "./Trending.css";

const NewListing = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTop = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=1"
        );
        const data = await res.json();
        setCoins(data);
      } catch (e) {
        console.error("CoinGecko fetch error:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchTop();
  }, []);

  return (
    <div className="new-listing-page">
      <h2>Top Coins (CoinGecko)</h2>
      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : coins.length ? (
        <div className="listing-grid">
          {coins.map((coin) => (
            <div className="listing-card colorful-card" key={coin.id}>
              <div className="listing-header">
                <img src={coin.image} alt={coin.name} className="coin-image" />
                <div className="coin-title-group">
                  <h3>{coin.name}</h3>
                  <span className="symbol-badge">{coin.symbol.toUpperCase()}</span>
                </div>
              </div>
              <p>
                💰 Price:{" "}
                <span className="positive">${coin.current_price.toFixed(4)}</span>
              </p>
              <p>🏦 Market Cap: ${coin.market_cap.toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No coins found.</p>
      )}
    </div>
  );
};

export default NewListing;
