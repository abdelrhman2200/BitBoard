# 💹 Crypto Tracker & Portfolio Calculator (React Tutorial Project)

This is a tutorial-based React project that allows users to track live cryptocurrency data, view detailed charts, and calculate the total value of their crypto portfolio.

---

## 📌 Features

- ✅ Live coin prices from [CoinGecko API](https://www.coingecko.com/en/api)
- ✅ Search functionality with dropdown suggestions
- ✅ Individual coin pages with real-time TradingView charts
- ✅ Portfolio calculator to track your holdings
- ✅ Interactive pie chart (coin distribution)
- ✅ PDF export of your portfolio summary

---

## 🛠 Built With

- **React** (with hooks & functional components)
- **React Router DOM** (for navigation)
- **CoinGecko API** (for coin market data)
- **TradingView Widget** (for chart embedding)
- **Chart.js** (pie chart visualization)
- **jsPDF** (export PDF functionality)

---

## 🧮 Pages Overview

### `/` Home Page:
- Shows top 10 coins with pagination
- Live pricing and market cap
- Search bar with dropdown

### `/coins/:id` Coin Details:
- Detailed view using CoinGecko data
- Live TradingView chart (7-day trend)

### `/calculator` Portfolio Calculator:
- Add any coins and their amounts
- Calculates total portfolio value
- Displays pie chart (live updates)
- PDF export of current holdings
- Remove coins from the list

---

## 📦 How to Run Locally

```bash
# Clone the repo
git clone https://github.com/abdelrhman2200/BitBoard.git
cd  BitBoard

# Install dependencies
npm install

# Start the development server
npm run dev
