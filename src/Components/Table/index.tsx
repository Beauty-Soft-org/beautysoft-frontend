import React from 'react';
import styles from './table.module.css';

interface TableRow {
  [key: string]: any;
}

interface TableProps {
  data: TableRow[];
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
}

const Table: React.FC<TableProps> = ({ data, onDelete, onEdit }) => {
<<<<<<< HEAD
  const columns = data?.length > 0 ? Object.keys(data[0]) : [];
=======
  const columns = data.length > 0 ? Object.keys(data[0]) : [];
>>>>>>> 640ee22f845a448bd6551a21e161878272fe9d55

  const filteredColumns = columns.filter(column => column !== 'id');

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tr}>
<<<<<<< HEAD
            {filteredColumns?.map((column) => (
=======
            {filteredColumns.map((column) => (
>>>>>>> 640ee22f845a448bd6551a21e161878272fe9d55
              <th key={column} className={styles.th}>{column}</th>
            ))}
            {(onDelete || onEdit) &&
              <th className={styles.th}>Ações</th>
            }
          </tr>
        </thead>
        <tbody>
<<<<<<< HEAD
          {data?.map((row, rowIndex) => (
            <tr key={rowIndex} className={styles.tr}>
              {filteredColumns?.map((column, colIndex) => (
=======
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={styles.tr}>
              {filteredColumns.map((column, colIndex) => (
>>>>>>> 640ee22f845a448bd6551a21e161878272fe9d55
                <td className={styles.td} key={colIndex}>{row[column]}</td>
              ))}
              {(onDelete || onEdit) &&
                <td className={styles.td}>
                  {onDelete && <button onClick={() => onDelete(row.id)}>Deletar</button>}
                  {onEdit && <button className={styles.buttonEdit} onClick={() => onEdit(row.id)}>Editar</button>}
                </td>
              }
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
