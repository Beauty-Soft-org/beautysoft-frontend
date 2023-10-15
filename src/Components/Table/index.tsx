import React from 'react';
import styles from './table.module.css';

interface TableRow {
  [key: string]: any;
}

interface TableProps {
  data: TableRow[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const Table: React.FC<TableProps> = ({ data, onDelete, onEdit }) => {
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  const filteredColumns = columns.filter(column => column !== 'id');

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {filteredColumns.map((column) => (
              <th key={column}>{column}</th>
            ))}
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {filteredColumns.map((column) => (
                <td key={column}>{row[column]}</td>
              ))}
              <td>
                <button onClick={() => onDelete(row.id)}>Deletar</button>
                <button className={styles.buttonEdit} onClick={() => onEdit(row.id)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
