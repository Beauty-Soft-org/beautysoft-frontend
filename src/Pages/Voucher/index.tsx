import React, { useState } from 'react';
import styles from './voucher.module.css';
import axios from 'axios';
import { LiaToggleOffSolid, LiaToggleOnSolid } from 'react-icons/lia'
import { Link } from 'react-router-dom';

const Voucher: React.FC = () => {
  const [nome, setNome] = useState<string>('');
  const [valor, setValor] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [habilitado, setHabilitado] = useState<boolean>(true);

  const handleClickCadastro = () => {
    console.log('Cadastro');
    const filter = {
      nome,
      descricao,
      campo: habilitado,
    }

    console.log(filter)

    const apiUrl = 'http://localhost:5082/api/Voucher';

    axios.post(apiUrl, filter)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Erro ao cadastrar procedimento:', error);
      });

  };

  return (
    <div>
      <div className={styles.cadastroContainer}>
        <div className={styles.cadastroBox}>
          <h2>Cadastro de Voucher</h2>
          <div className={styles.formGroup}>
            <label>Nome:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Descrição:</label>
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Habilitado:</label>
            {(habilitado === true ?
              <LiaToggleOnSolid className={styles.toggle} onClick={() => setHabilitado(false)} /> :
              <LiaToggleOffSolid className={styles.toggle} onClick={() => setHabilitado(true)} />)}
          </div>
          <button className={styles.cadastroButton} onClick={handleClickCadastro}>
            Cadastrar
          </button>
          <Link to="/">
            <button className={styles.voltarButton}>
              Voltar para o menu
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Voucher;