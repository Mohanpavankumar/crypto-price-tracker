"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [coin, setCoin] = useState(""); // User's search input
  const [customPrice, setCustomPrice] = useState(null);
  const [error, setError] = useState(null);

  const coinsToFetch = ["bitcoin", "ethereum", "cardano", "dogecoin", "litecoin"];

  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coinsToFetch.join(
            ","
          )}&vs_currencies=usd`
        );
        const data = await response.json();
        setPrices(data);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchCryptoPrices();
  }, []);

  // Function to refresh the prices
  const handleRefresh = () => {
    const fetchCryptoPrices = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coinsToFetch.join(
            ","
          )}&vs_currencies=usd`
        );
        const data = await response.json();
        setPrices(data);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchCryptoPrices();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Function to handle search logic
  const handleSearch = () => {
    const normalizedCoin = coin.trim().toLowerCase(); // Normalize input and remove extra spaces
    if (prices[normalizedCoin]) {
      setCustomPrice(prices[normalizedCoin].usd);
    } else {
      setCustomPrice(null); // If coin is not found, reset the custom price
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Crypto Price Tracker</h1>
        <p className="text-lg mb-6">Real-time cryptocurrency prices at your fingertips.</p>

        <div className="flex flex-col gap-4 sm:flex-row items-center">
          {coinsToFetch.map((coin) => (
            <div key={coin}>
              <h2 className="text-xl font-semibold">{coin.charAt(0).toUpperCase() + coin.slice(1)}</h2>
              <p className="text-2xl">${prices[coin]?.usd || "N/A"}</p>
            </div>
          ))}
        </div>

        {/* Search Bar for other coins */}
        <div className="flex gap-2 items-center mt-6">
          <input
            type="text"
            className="p-2 border rounded"
            placeholder="Enter coin name (e.g., dogecoin)"
            onChange={(e) => setCoin(e.target.value)}
            value={coin}
            onKeyUp={(e) => {
              if (e.key === "Enter") handleSearch(); // Trigger search when pressing Enter
            }}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {/* Display custom price */}
        {customPrice !== null && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Custom Coin Price</h2>
            <p className="text-2xl">
              {coin.charAt(0).toUpperCase() + coin.slice(1)}: ${customPrice}
            </p>
          </div>
        )}

        {customPrice === null && coin !== "" && (
          <p className="mt-6 text-xl text-red-500">
            No data found for {coin.charAt(0).toUpperCase() + coin.slice(1)}.
          </p>
        )}

        {/* Display error message if any */}
        {error && <p className="mt-6 text-xl text-red-500">{error}</p>}

        {/* Refresh Button */}
        <button
          className="px-4 py-2 bg-green-500 text-white rounded mt-6"
          onClick={handleRefresh}
        >
          Refresh Prices
        </button>
      </main>
    </div>
  );
}
