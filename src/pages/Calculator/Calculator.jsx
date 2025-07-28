import React, { useContext, useEffect, useState } from "react";
import "./Calculator.css";
import { CoinContext } from "../../context/CoinContext";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Calculator = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [inputs, setInputs] = useState([{ coinId: "", amount: "" }]);
  const [chartData, setChartData] = useState(null);
  const [totalValue, setTotalValue] = useState(0);

  const getCurrencySymbol = () => {
    if (currency.name === "usd") return "$";
    if (currency.name === "eur") return "€";
    if (currency.name === "aed") return "د.إ";
    return currency.symbol || "";
  };

  const handleChange = (index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  const addField = () => setInputs([...inputs, { coinId: "", amount: "" }]);

  const removeField = (index) => {
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs);
  };

  useEffect(() => {
    const validInputs = inputs.filter((input) => input.coinId && input.amount > 0);
    let labels = [];
    let data = [];
    let backgroundColors = [];
    let total = 0;

    validInputs.forEach((input, i) => {
      const coin = allCoin.find((c) => c.id === input.coinId);
      if (coin) {
        const value = coin.current_price * parseFloat(input.amount);
        labels.push(coin.name);
        data.push(value);
        backgroundColors.push(`hsl(${(i * 45) % 360}, 70%, 60%)`);
        total += value;
      }
    });

    setChartData({
      labels,
      datasets: [
        {
          label: "Portfolio",
          data,
          backgroundColor: backgroundColors,
          borderColor: "#fff",
          borderWidth: 1,
        },
      ],
    });

    setTotalValue(total);
  }, [inputs, allCoin]);

  return (
    <div className="calculator-page">
      <div className="calculator-form">
        <h2>Crypto Portfolio Calculator</h2>
        {inputs.map((input, index) => (
          <div className="input-row" key={index}>
            <select
              value={input.coinId}
              onChange={(e) => handleChange(index, "coinId", e.target.value)}
            >
              <option value="">Select Coin</option>
              {allCoin.map((coin) => (
                <option value={coin.id} key={coin.id}>
                  {coin.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              min="0"
              placeholder="Amount"
              value={input.amount}
              onChange={(e) => handleChange(index, "amount", e.target.value)}
            />
            {inputs.length > 1 && (
              <button className="remove-btn" onClick={() => removeField(index)}>
                ✕
              </button>
            )}
          </div>
        ))}
        <button className="add-btn" onClick={addField}>+ Add Coin</button>
        <div className="total-value">
          Total Portfolio Value: <strong>{getCurrencySymbol()}{totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</strong>
        </div>
      </div>

      <div className="calculator-chart">
        {chartData && chartData.labels.length > 0 ? (
          <Pie data={chartData} options={{
            plugins: {
              legend: {
                position: "right",
                labels: {
                  color: "#fff",
                  font: { size: 14 },
                },
              },
            },
          }} />
        ) : (
          <p className="chart-placeholder">Your chart will appear here once you enter coins.</p>
        )}
      </div>
    </div>
  );
};

export default Calculator;
