import React, { useState, useEffect } from "react";
import "./App.css";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Dashboard from "./components/Dashboard";

const LOCAL_STORAGE_KEY = "finance-vision-transactions";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) setTransactions(JSON.parse(data));
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(transactions));
    }
  }, [transactions, isLoaded]);

  const addTransaction = (transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  const filteredTransactions = transactions.filter((t) => {
    if (filter === "all") return true;
    if (filter === "entrada") return t.type === "entrada";
    if (filter === "saida") return t.type === "saida";
    return true;
  });

  return (
    <div className="container">
      <h1>Finance Vision</h1>
      <TransactionForm onAdd={addTransaction} />
      <Dashboard transactions={transactions} />
      <div style={{ margin: "20px 0" }}>
        <button onClick={() => setFilter("all")}>Todas</button>
        <button onClick={() => setFilter("entrada")}>Receitas</button>
        <button onClick={() => setFilter("saida")}>Despesas</button>
      </div>
      <TransactionList transactions={filteredTransactions} />
    </div>
  );
}

export default App;
