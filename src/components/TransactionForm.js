import React, { useState } from "react";
import PropTypes from "prop-types";

const categorias = [
  "Salário",
  "Aluguel",
  "Alimentação",
  "Lazer",
  "Transporte",
  "Outros",
];

function TransactionForm({ onAdd }) {
  const [desc, setDesc] = useState("");
  const [valor, setValor] = useState("");
  const [type, setType] = useState("entrada");
  const [categoria, setCategoria] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!desc || !valor || !categoria)
      return alert("Preencha todos os campos!");
    if (Number(valor) <= 0) return alert("Valor deve ser positivo!");
    onAdd({
      id: Date.now(),
      desc,
      valor: Number(valor),
      type,
      categoria,
      data: new Date().toISOString(),
    });
    setDesc("");
    setValor("");
    setCategoria("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Descrição"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <input
        type="number"
        placeholder="Valor"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        min="0.01"
        step="0.01"
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="entrada">Receita</option>
        <option value="saida">Despesa</option>
      </select>
      <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
        <option value="">Categoria</option>
        {categorias.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button type="submit">Adicionar</button>
    </form>
  );
}

TransactionForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default TransactionForm;
