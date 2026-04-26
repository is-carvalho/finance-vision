import React from "react";
import PropTypes from "prop-types";

function TransactionCard({ descricao, valor, tipo, categoria, data }) {
  const estiloValor = {
    color: tipo === "entrada" ? "#2ecc71" : "#e74c3c",
    fontWeight: "bold",
  };

  return (
    <div
      className="transaction-card"
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 8,
        padding: 8,
        borderBottom: "1px solid #eee",
      }}
    >
      <span>
        <strong>{descricao}</strong> <small>({categoria})</small>{" "}
        <small>{new Date(data).toLocaleDateString()}</small>
      </span>
      <span style={estiloValor}>
        {tipo === "entrada" ? "+ " : "- "}R$ {valor.toFixed(2)}
      </span>
    </div>
  );
}

TransactionCard.propTypes = {
  descricao: PropTypes.string.isRequired,
  valor: PropTypes.number.isRequired,
  tipo: PropTypes.string.isRequired,
  categoria: PropTypes.string,
  data: PropTypes.string,
};

export default TransactionCard;
