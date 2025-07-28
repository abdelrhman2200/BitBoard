import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CoinDetails.css';

const CoinDetails = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
        const data = await res.json();
        setCoin(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [id]);

  useEffect(() => {
    if (!coin) return;

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;

    script.onload = () => {
      new window.TradingView.widget({
        width: '100%',
        height: 500,
        symbol: `BINANCE:${coin.symbol.toUpperCase()}USDT`,
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: 'dark',
        style: '1',
        locale: 'en',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        hide_legend: false,
        container_id: 'tv-chart'
      });
    };

    document.getElementById('tv-chart').innerHTML = ''; // Reset if navigating
    document.getElementById('tv-chart').appendChild(script);
  }, [coin]);

  if (loading) return <div className="coin-details"><p>Loading...</p></div>;
  if (!coin) return <div className="coin-details"><p>Coin not found.</p></div>;

  return (
    <div className="coin-details">
      <Link to="/" className="back-button">← Back</Link>
      <div className="coin-header">
        <img src={coin.image.large} alt={coin.name} />
        <h1>{coin.name} ({coin.symbol.toUpperCase()})</h1>
      </div>

      <p className="desc" dangerouslySetInnerHTML={{ __html: coin.description.en.split('. ')[0] + '.' }}></p>

      <div className="coin-info">
        <p><strong>Current Price:</strong> ${coin.market_data.current_price.usd.toLocaleString()}</p>
        <p><strong>Market Cap:</strong> ${coin.market_data.market_cap.usd.toLocaleString()}</p>
        <p><strong>24H High:</strong> ${coin.market_data.high_24h.usd.toLocaleString()}</p>
        <p><strong>24H Low:</strong> ${coin.market_data.low_24h.usd.toLocaleString()}</p>
        <p><strong>Circulating Supply:</strong> {coin.market_data.circulating_supply.toLocaleString()}</p>
      </div>

      <div className="chart-placeholder">
        <h3>Live Price Chart</h3>
        <div id="tv-chart" className="tv-chart"></div>
      </div>
    </div>
  );
};

export default CoinDetails;
