import React, { useEffect, useState, useCallback } from 'react';
import styles from './procedimentos.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Table from '../../Components/Table';
import { LiaToggleOffSolid, LiaToggleOnSolid } from 'react-icons/lia';
import Config from '../../Config.json';
import Modal from 'react-modal';

const Procedimentos: React.FC = () => {
  const [nome, setNome] = useState<string>('');
  const [valor, setValor] = useState<string>('');
  const [tempo, setTempo] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [tipoProcedimento, setTipoProcedimento] = useState<number>(1);
  const [imagem, setImagem] = useState<File | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [alterar, setAlterar] = useState<boolean>(false);
  const [row, setRow] = useState<number | undefined>();
  const [nomeError, setNomeError] = useState<string | null>(null);
  const [tempoError, setTempoError] = useState<string | null>(null);
  const [descricaoError, setDescricaoError] = useState<string | null>(null);
  const [valorError, setValorError] = useState<string | null>(null);
  const [habilitado, setHabilitado] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [deletingIndex, setDeletingIndex] = useState<number | undefined>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (e.target.files[0].type.startsWith('image/')) {
        setImagem(e.target.files[0]);
      } else {
        setImagem(null);
      }
    }
  };

  const handleClickCadastro = () => {
    setNomeError(nome ? null : "Nome é obrigatório!");
    setDescricaoError(descricao ? null : "Descrição é obrigatória!");
    setValorError(valor ? null : "Valor é obrigatório!");
    setTempoError(tempo ? null : "Tempo é obrigatório!");

    const filter = {
      nome,
      descricao,
      valor,
      tempo,
      imagem: imagem?.name?.toString(),
      tipoProcedimento,
    };

    const apiUrl = `${Config.baseUrl}/api/Procedimento`;

    axios.post(apiUrl, filter)
      .then(() => {
        setRefresh(!refresh);
        limpar();
      })
      .catch((error) => {
        console.error('Erro ao cadastrar procedimento:', error);
      });
  };

  const handleClickAlterar = () => {
    setNomeError(nome ? null : "Nome é obrigatório!");
    setDescricaoError(descricao ? null : "Descrição é obrigatória!");
    setValorError(valor ? null : "Valor é obrigatório!");
    setTempoError(tempo ? null : "Tempo é obrigatório!");

    const filter = {
      nome,
      descricao,
      valor,
      tempo,
      imagem: imagem?.name?.toString() || imagem,
      tipoProcedimento,
    };

    const apiUrl = `${Config.baseUrl}/api/Procedimento/${row}`;

    axios.put(apiUrl, filter)
      .then(() => {
        setRefresh(!refresh);
        setAlterar(false);
        limpar();
      })
      .catch((error) => {
        console.error('Erro ao alterar procedimento:', error);
      });
  };

  const limpar = () => {
    setNome('');
    setDescricao('');
    setValor('');
    setTempo('');
    setTipoProcedimento(1);
    setImagem(null);
  };

  const fetchData = useCallback(() => {
    const apiUrl = `${Config.baseUrl}/api/Procedimento`;

    axios.get(apiUrl)
      .then((response) => {
        const modifiedData = response.data.map((item: any) => ({
          Nome: item.nome,
          id: item.id,
          Descrição: item.descricao,
          "Tipo de Procedimento": item.tipoProcedimento === 1 ? 'Corporal' : 'Facial',
          Imagem: item.imagem,
          Valor: ` R$ ${item.valor}`,
          Tempo: item.tempo,
        }));
        setData(modifiedData);
      })
      .catch((error) => {
        console.error('Erro ao buscar procedimentos:', error);
      });
  }, []);


  const handleDelete = () => {
    if (deletingIndex !== undefined) {
      const apiUrl = `${Config.baseUrl}/api/Procedimento/${deletingIndex}`;

      axios.delete(apiUrl)
        .then(() => {
          setRefresh(!refresh);
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error('Erro ao deletar procedimento:', error);
        });
    }
  };

  const handleEdit = (index: number) => {
    setAlterar(true);
    setRow(index);

    const apiUrl = `${Config.baseUrl}/api/Procedimento/${index}`;

    axios.get(apiUrl)
      .then((response) => {
        setNome(response.data.nome);
        setDescricao(response.data.descricao);
        setValor(response.data.valor);
        setTempo(response.data.tempo);
        setTipoProcedimento(response.data.tipoProcedimento);
        setImagem(response.data.imagem);
      })
      .catch((error) => {
        console.error('Erro ao buscar procedimento:', error);
      });
  };

  const voltarCadastro = () => {
    setAlterar(false);
    limpar();
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className={styles.cadastroContainer}>
      <div className={styles.visualizarBox}>
        <Modal
          className={styles.modal}
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Confirmação de Exclusão"
        >
          <h2>Tem certeza de que deseja excluir este procedimento?</h2>
          <div className={styles.contentButtonsModal}>
            <button onClick={handleDelete}>Confirmar</button>
            <button style={{ marginLeft: '1rem' }} onClick={() => setIsModalOpen(false)}>Cancelar</button>
          </div>
        </Modal>
        {data.length === 0 ? <span className={styles.titleVisualizar}>Sem procedimentos para serem exibidos</span> :
          <div>
            <span className={styles.titleVisualizar}>{data.length === 1 ? 'Procedimento' : 'Procedimentos'}</span>
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
        {alterar ? <h2>Alterar Procedimento</h2> : <h2>Cadastro de Procedimentos</h2>}
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
          <label>Valor:</label>
          {valorError && <span className={styles.errorText}>{valorError}</span>}
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Tempo:</label>
          {tempoError && <span className={styles.errorText}>{tempoError}</span>}
          <input
            type="time"
            value={tempo}
            onChange={(e) => setTempo(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Tipo de Procedimento:</label>
          <select
            value={tipoProcedimento}
            onChange={(e) => setTipoProcedimento(Number(e.target.value))}
          >
            <option className={styles.option} value="1">Corporal</option>
            <option className={styles.option} value="2">Facial</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Imagem:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImagemChange}
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

export default Procedimentos;
