import React from "react";
import PropTypes from "prop-types";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
);

function Dashboard({ transactions }) {
  const entradas = transactions
    .filter((t) => t.type === "entrada")
    .reduce((acc, t) => acc + t.valor, 0);
  const saidas = transactions
    .filter((t) => t.type === "saida")
    .reduce((acc, t) => acc + t.valor, 0);
  const saldo = entradas - saidas;

  // Gráfico de Rosca - Distribuição das despesas por categoria
  const despesasPorCategoria = transactions
    .filter((t) => t.type === "saida")
    .reduce((acc, t) => {
      acc[t.categoria] = (acc[t.categoria] || 0) + t.valor;
      return acc;
    }, {});

  const doughnutData = {
    labels: Object.keys(despesasPorCategoria),
    datasets: [
      {
        data: Object.values(despesasPorCategoria),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  // Gráfico de Barras - Entradas vs Saídas
  const barData = {
    labels: ["Entradas", "Saídas"],
    datasets: [
      {
        label: "R$",
        data: [entradas, saidas],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  return (
    <div>
      <h2>Saldo Atual: R$ {saldo.toFixed(2)}</h2>
      <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
        <div>
          <h3>Distribuição das Despesas</h3>
          <Doughnut data={doughnutData} />
        </div>
        <div>
          <h3>Entradas vs Saídas</h3>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  transactions: PropTypes.array.isRequired,
};

export default Dashboard;
