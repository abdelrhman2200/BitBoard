import React, { useEffect, useRef } from "react";

const TradingViewChart = ({ symbol = "BINANCE:BTCUSDT" }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!window.TradingView || !chartRef.current) return;

    new window.TradingView.widget({
      container_id: chartRef.current.id,
      autosize: true,
      symbol: symbol, // e.g., "BINANCE:BTCUSDT"
      interval: "D",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      toolbar_bg: "#1e1e1e",
      enable_publishing: false,
      allow_symbol_change: false,
      hide_legend: false,
      save_image: false,
      studies: [],
      withdateranges: true,
      details: true,
    });
  }, [symbol]);

  return (
    <div
      id="tradingview_chart"
      ref={chartRef}
      style={{ height: "500px", width: "100%" }}
    />
  );
};

export default TradingViewChart;
