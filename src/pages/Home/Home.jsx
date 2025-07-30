import React, { useContext, useEffect, useState, useRef } from "react";
import "./Home.css";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchApplied, setSearchApplied] = useState(false);
  const searchWrapperRef = useRef(null);

  useEffect(() => {

    setDisplayCoin(allCoin);
    console.log("All coins from context:", allCoin);
  }, [allCoin]);

  const getCurrencySymbol = () => {
    if (currency.name === "usd") return "$";
    if (currency.name === "eur") return "€";
    if (currency.name === "aed") return "د.إ";
    return currency.symbol || "";
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchInput(value);
    setSearchApplied(false);
    if (value.length > 0) {
      const filtered = allCoin.filter((coin) =>
        coin.name.toLowerCase().includes(value)
      );
      setSearchResults(filtered.slice(0, 5));
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const selected = allCoin.filter((coin) =>
      coin.name.toLowerCase().includes(searchInput)
    );
    setDisplayCoin(selected);
    setCurrentPage(1);
    setSearchApplied(true);
    setSearchResults([]);
  };

  const handleDropdownClick = (coin) => {
    setDisplayCoin([coin]);
    setSearchInput(coin.name);
    setSearchApplied(true);
    setSearchResults([]);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(displayCoin.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = displayCoin.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Hottest
          <br />
          Coins On The Market
        </h1>
        <p>Live data. Hot tokens. Smarter trading — all at your fingertips.</p>
        <form
          onSubmit={handleSearchSubmit}
          className="search-wrapper"
          ref={searchWrapperRef}
        >
          <input
            type="text"
            placeholder="Search Crypto..."
            value={searchInput}
            onChange={handleSearchChange}
          />
          <button type="submit">Search</button>
          {searchInput.length > 0 &&
            searchResults.length > 0 &&
            !searchApplied && (
              <ul className="search-dropdown">
                {searchResults.map((coin) => (
                  <li key={coin.id} onClick={() => handleDropdownClick(coin)}>
                    <img src={coin.image} alt={coin.name} />
                    {coin.name}
                  </li>
                ))}
              </ul>
            )}
        </form>
      </div>

      <div className="crypto-table">
        <div className="table-layout table-head">
          <p>#</p>
          <p className="coin-name-cell">Coin</p>
          <p>Symbol</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>

        {currentItems.map((item, index) => (
          <div className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <Link
              to={`/coin/${item.id}`}
              className="coin-name-cell"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img src={item.image} alt={item.name} />
              <span>{item.name}</span>
            </Link>
            <p className="symbol">{item.symbol.toUpperCase()}</p>
            <p>
              {getCurrencySymbol()}
              {item.current_price.toLocaleString()}
            </p>
            <p
              style={{
                textAlign: "center",
                color:
                  item.price_change_percentage_24h > 0 ? "limegreen" : "red",
              }}
            >
              {item.price_change_percentage_24h?.toFixed(2)}%
            </p>
            <p className="market-cap">
              {getCurrencySymbol()}
              {item.market_cap.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          ←
        </button>
        {[...Array(totalPages)].map((_, i) => {
  if (
    i === 0 || // first
    i === totalPages - 1 || // last
    Math.abs(currentPage - (i + 1)) <= 1 // current, prev, next
  ) {
    return (
      <button
        key={i}
        onClick={() => setCurrentPage(i + 1)}
        className={currentPage === i + 1 ? "active" : ""}
      >
        {i + 1}
      </button>
    );
  }

  // Ellipsis
  if (
    (i === 1 && currentPage > 3) || // after first
    (i === totalPages - 2 && currentPage < totalPages - 2)
  ) {
    return <span key={i} style={{ color: "#888", padding: "0 4px" }}>...</span>;
  }

  return null;
})}

      </div>
    </div>
  );
};

export default Home;
