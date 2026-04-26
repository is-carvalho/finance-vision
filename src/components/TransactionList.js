import TransactionCard from "./TransactionCard";
import PropTypes from "prop-types";

function TransactionList({ transactions }) {
  if (!transactions.length) return <p>Nenhuma transação registrada.</p>;
  return (
    <div className="lista-transacoes">
      {transactions.map((t) => (
        <TransactionCard
          key={t.id}
          descricao={t.desc}
          valor={t.valor}
          tipo={t.type}
          categoria={t.categoria}
          data={t.data}
        />
      ))}
    </div>
  );
}

TransactionList.propTypes = {
  transactions: PropTypes.array.isRequired,
};

export default TransactionList;
