import React, { useContext, useEffect, useState, useRef } from "react";
import "./Calculator.css";
import { CoinContext } from "../../context/CoinContext";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";

ChartJS.register(ArcElement, Tooltip, Legend);

const Calculator = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [inputs, setInputs] = useState([{ coinId: "", amount: "" }]);
  const [chartData, setChartData] = useState(null);
  const [totalValue, setTotalValue] = useState(0);
  const chartRef = useRef();

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
        labels.push(`${coin.name} (${coin.symbol.toUpperCase()})`);
        data.push(value);
        backgroundColors.push(`hsl(${(i * 45) % 360}, 70%, 60%)`);
        total += value;
      }
    });

    const labeledData = data.map((val, i) => {
      const percent = ((val / total) * 100).toFixed(1);
      return `${labels[i]} - ${percent}%`;
    });

    setChartData({
      labels: labeledData,
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

const downloadPDF = async () => {
  const doc = new jsPDF();
  const symbol = getCurrencySymbol();

  const validInputs = inputs.filter((input) => input.coinId && input.amount > 0);
  if (!validInputs.length) {
    alert("Please enter at least one coin.");
    return;
  }

  
  doc.setFontSize(16);
  doc.setTextColor(40);
  doc.text("Portfolio Details", 14, 20);

 
  const rows = validInputs.map((input) => {
    const coin = allCoin.find((c) => c.id === input.coinId);
    const amount = parseFloat(input.amount);
    const price = coin?.current_price || 0;
    const total = price * amount;
    const percent = ((total / totalValue) * 100).toFixed(2);
    return [
      coin.name,
      coin.symbol.toUpperCase(),
      amount,
      `${symbol}${price.toLocaleString()}`,
      `${symbol}${total.toLocaleString()}`,
      `${percent}%`,
    ];
  });

  autoTable(doc, {
    head: [["Coin", "Symbol", "Amount", "Unit Price", "Value", "%"]],
    body: rows,
    styles: { fontSize: 10 },
    headStyles: { fillColor: [121, 39, 255] },
    margin: { top: 26 }, 
  });

  doc.setFontSize(12);
  doc.setTextColor(40);
  doc.text(
    `Total Portfolio Value: ${symbol}${totalValue.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    })}`,
    14,
    doc.lastAutoTable.finalY + 10
  );

  const chartContainer = chartRef.current;
  const originalBg = chartContainer.style.backgroundColor;
  chartContainer.style.backgroundColor = "#1a1a2e";

  const canvas = await html2canvas(chartContainer, { scale: 3, backgroundColor: null });
  const imgData = canvas.toDataURL("image/png");
  const width = 180;
  const height = (canvas.height * width) / canvas.width;
  doc.addImage(imgData, "PNG", 14, doc.lastAutoTable.finalY + 20, width, height);

  chartContainer.style.backgroundColor = originalBg;

  doc.save("portfolio.pdf");
};

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
            <div className="inline-container">
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
          </div>
        ))}
        <button className="add-btn" onClick={addField}>
          + Add Coin
        </button>
        <div className="total-value">
          Total Portfolio Value:{" "}
          <strong>
            {getCurrencySymbol()}
            {totalValue.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </strong>
        </div>
      </div>

      <div className="calculator-chart">
        <p>Portfolio Chart</p>
        <div ref={chartRef}>
          {chartData && chartData.labels.length > 0 ? (
            <Pie
              data={chartData}
              options={{
                plugins: {
                  legend: {
                    position: "right",
                    labels: {
                      color: "#fff",
                      font: { size: 14 },
                    },
                  },
                },
              }}
            />
          ) : (
            <p className="chart-placeholder">
              Your chart will appear here once you enter coins.
            </p>
          )}
        </div>
        <button className="download-btn" onClick={downloadPDF}>
          Download Portfolio as PDF
        </button>
      </div>
    </div>
  );
};

export default Calculator;
