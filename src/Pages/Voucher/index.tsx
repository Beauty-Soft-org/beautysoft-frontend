import React, { useEffect, useState } from 'react';
import styles from './voucher.module.css';
import axios from 'axios';
import { LiaToggleOffSolid, LiaToggleOnSolid } from 'react-icons/lia';
import { Link } from 'react-router-dom';
import Table from '../../Components/Table';
import Config from '../../Config.json';
import Modal from 'react-modal';

const Voucher: React.FC = () => {
  const [nome, setNome] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [data, setData] = useState<any[]>([]);
  const [row, setRow] = useState<number | undefined>();
  const [habilitado, setHabilitado] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [alterar, setAlterar] = useState<boolean>(false);
  const [nomeError, setNomeError] = useState<string | null>(null);
  const [descricaoError, setDescricaoError] = useState<string | null>(null);
  const [deletingIndex, setDeletingIndex] = useState<number | undefined>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleClickCadastro = () => {
    setNomeError(nome ? null : "Nome é obrigatório!");
    setDescricaoError(descricao ? null : "Descrição é obrigatória!");

    const filter = {
      nome,
      descricao,
      campo: habilitado,
    };

    const apiUrl = `${Config.baseUrl}/api/Voucher`;

    if (nome && descricao) {
      axios.post(apiUrl, filter)
        .then(() => {
          setRefresh(prev => !prev);
          limpar();
        })
        .catch((error) => {
          console.error('Erro ao cadastrar voucher:', error);
        });
    }
  };

  const handleClickAlterar = () => {
    setNomeError(nome ? null : "Nome é obrigatório!");
    setDescricaoError(descricao ? null : "Descrição é obrigatória!");

    const filter = {
      nome,
      descricao,
      campo: habilitado,
    };

    const apiUrl = `${Config.baseUrl}/api/Voucher/${row}`;

    axios.put(apiUrl, filter)
      .then(() => {
        console.log('Voucher alterado com sucesso!');
        setRefresh(prev => !prev);
        setAlterar(false);
        limpar();
      })
      .catch((error) => {
        console.error('Erro ao alterar voucher:', error);
      });
  };

  const fetchData = () => {
    const apiUrl = `${Config.baseUrl}/api/Voucher`;

    axios.get(apiUrl)
      .then((response) => {
        console.log('Vouchers exibidos com sucesso!');
        const modifiedData = response.data.map((item: any) => ({
          Nome: item.nome,
          id: item.id,
          Descrição: item.descricao,
          Habilitado: item.campo.toString(),
        }));

        console.log('modifiedData', modifiedData);
        setData(modifiedData);
      })
      .catch((error) => {
        console.error('Erro ao buscar vouchers:', error);
      });
  };

  const limpar = () => {
    setNome('');
    setDescricao('');
    setHabilitado(true);
  };

  const handleDelete = () => {
    if (deletingIndex !== undefined) {
      const apiUrl = `${Config.baseUrl}/api/Voucher/${deletingIndex}`;

      axios.delete(apiUrl)
        .then(() => {
          setRefresh(prev => !prev);
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error('Erro ao deletar voucher:', error);
        });
    }
  };

  const voltarCadastro = () => {
    setAlterar(false);
    limpar();
  };

  const handleEdit = (index: number) => {
    setAlterar(true);
    setRow(index);

    const apiUrl = `${Config.baseUrl}/api/Voucher/${index}`;

    axios.get(apiUrl)
      .then((response) => {
        setNome(response.data.nome);
        setDescricao(response.data.descricao);
        setHabilitado(response.data.campo);
      })
      .catch((error) => {
        console.error('Erro ao buscar voucher:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  return (
    <div className={styles.cadastroContainer}>
      <div className={styles.visualizarBox}>
        <Modal
          className={styles.modal}
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Confirmação de Exclusão"
        >
          <h2>Tem certeza de que deseja excluir este voucher?</h2>
          <div className={styles.contentButtonsModal}>
            <button onClick={handleDelete}>Confirmar</button>
            <button style={{ marginLeft: '1rem' }} onClick={() => setIsModalOpen(false)}>Cancelar</button>
          </div>
        </Modal>
        {data.length === 0 ? <span className={styles.titleVisualizar}>Sem vouchers para serem exibidos</span> :
          <div>
            <span className={styles.titleVisualizar}>{data.length === 1 ? 'Voucher' : 'Vouchers'}</span>
            <div className={styles.contentTable}>
              <Table
                data={data}
                onDelete={(index: number) => {
                  setDeletingIndex(index);
                  setIsModalOpen(true);
                }}
                onEdit={handleEdit}
              />
            </div>
          </div>
        }
      </div>
      <div className={styles.cadastroBox}>
        <h2>Cadastro de Voucher</h2>
        <div className={styles.formGroup}>
          <label>Nome:</label>
          {nomeError && <span className={styles.errorText}>{nomeError}</span>}
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Descrição:</label>
          {descricaoError && <span className={styles.errorText}>{descricaoError}</span>}
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Habilitado:</label>
          {habilitado ?
            <LiaToggleOnSolid className={styles.toggle} onClick={() => setHabilitado(false)} /> :
            <LiaToggleOffSolid className={styles.toggle} onClick={() => setHabilitado(true)} />}
        </div>
        <button className={styles.cadastroButton} onClick={alterar ? handleClickAlterar : handleClickCadastro}>
          {alterar ? <span>Alterar</span> : <span>Cadastrar</span>}
        </button>
        {alterar ?
          <button onClick={voltarCadastro} className={styles.voltarButton}>
            Voltar para o cadastro
          </button> :
          <Link to="/">
            <button className={styles.voltarButton}>
              Voltar para o menu
            </button>
          </Link>}
      </div>
    </div>
  );
};

export default Voucher;
