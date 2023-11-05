import React, { useEffect, useState } from 'react';
import styles from './cadastroMensagem.module.css';
import axios from 'axios';
import { LiaToggleOffSolid, LiaToggleOnSolid } from 'react-icons/lia'
import { Link } from 'react-router-dom';
import Table from '../../Components/Table';
import Config from '../../Config.json';

const CadastroMensagem: React.FC = () => {
  const [nome, setNome] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [data, setData] = useState([]);
  const [row, setRow] = useState<number>();
  const [habilitado, setHabilitado] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [alterar, setAlterar] = useState<boolean>(false);
  const [tipoMensagemTemporaria, setTipoMensagemTemporaria] = useState<number>(1);

  const handleClickCadastro = () => {
    const filter = {
      nome,
      descricao,
      campo: habilitado,
    }

    const apiUrl = `${Config.baseUrl}/api/MensagemTemporaria`;

    axios.post(apiUrl, filter)
      .then((response) => {
        setRefresh(!refresh)
        limpar();
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Erro ao cadastrar mensagem:', error);
      });

  };

  const handleClickAlterar = () => {
    const filter = {
      nome,
      descricao,
      tipoMensagemTemporaria,
    }

    const apiUrl = `${Config.baseUrl}/api/MensagemTemporaria/${row}`;

    axios.put(apiUrl, filter)
      .then((_response) => {
        console.log('Mensagem alterada com sucesso!');
        setRefresh(!refresh);
        setAlterar(false);
        limpar();
      })
      .catch((error) => {
        console.error('Erro ao alterar mensagem:', error);
      });
  };

  const run = () => {
    const apiUrl = `${Config.baseUrl}/api/MensagemTemporaria`;

    axios.get(apiUrl)
      .then((response) => {
        console.log('Mensagens exibidas com sucesso!');
        const modifiedData = response.data.map((item: any) => {

          console.log(response)
          return {
            Nome: item.nome,
            id: item.id,
            Descrição: item.descricao,
          };
        });

        setData(modifiedData);
      })
      .catch((error) => {
        console.error('Erro ao buscar mensagens:', error);
      });
  };

  function limpar() {
    setNome('');
    setDescricao('');
  }

  const handleDelete = (index: number) => {
    const confirmDelete = window.confirm('Tem certeza de que deseja excluir esta mensagem?');

    if (confirmDelete) {
      const apiUrl = `${Config.baseUrl}/api/MensagemTemporaria/${index}`;

      axios.delete(apiUrl)
        .then((_response) => {
          setRefresh(!refresh);
          console.log('Mensagem deletada com sucesso!');
        })
        .catch((error) => {
          console.error('Erro ao deletar mensagem:', error);
        });
    }
  };

  function voltarCadastro() {
    setAlterar(false);
    limpar();
  }

  const handleEdit = (index: number) => {
    setAlterar(true);
    setRow(index);

    const apiUrl = `${Config.baseUrl}/api/MensagemTemporaria/${index}`;

    axios.get(apiUrl)
      .then((response) => {
        setNome(response.data.nome);
        setDescricao(response.data.descricao);
      })
      .catch((error) => {
        console.error('Erro ao buscar mensagem:', error);
      });
  };

  useEffect(run as any, [refresh]);

  return (
    <div className={styles.cadastroContainer}>
      <div className={styles.visualizarBox}>
        {data.length === 0 ? <span className={styles.titleVisualizar}>Sem mensagens para serem exibidas</span> :
          <div>
            <span className={styles.titleVisualizar}>{data.length === 1 ? 'Mensagem' : 'Mensagens'}</span>
            <div className={styles.contentTable}>
              <Table data={data} onDelete={handleDelete} onEdit={handleEdit} />
            </div>
          </div>
        }
      </div>
      <div className={styles.cadastroBox}>
        <h2>Cadastro de Mensagem</h2>
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
          <label>Tipo de Mensagem:</label>
          <select
            value={tipoMensagemTemporaria}
            onChange={(e) => {
              if (e.target.value === "1") {
                setTipoMensagemTemporaria(1);
              } else if (e.target.value === "2") {
                setTipoMensagemTemporaria(2);
              }
              else if (e.target.value === "3") {
                setTipoMensagemTemporaria(3);
              }
              else if (e.target.value === "4") {
                setTipoMensagemTemporaria(4);
              }
              else if (e.target.value === "5") {
                setTipoMensagemTemporaria(5);
              }
            }}
          >
            <option className={styles.option} value="1">Cupom</option>
            <option className={styles.option} value="2">Informação</option>
            <option className={styles.option} value="3">Tratamentos</option>
            <option className={styles.option} value="4">Sobre mim</option>
            <option className={styles.option} value="5">Sobre Vitória Garavazzo Estética Avancada</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Habilitado:</label>
          {(habilitado === true ?
            <LiaToggleOnSolid className={styles.toggle} onClick={() => setHabilitado(false)} /> :
            <LiaToggleOffSolid className={styles.toggle} onClick={() => setHabilitado(true)} />)}
        </div>
        <button className={styles.cadastroButton} onClick={alterar === true ? handleClickAlterar : handleClickCadastro}>
          {alterar === true ? <span>Alterar</span> : <span>Cadastrar</span>}
        </button>
        {alterar === true ?
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

export default CadastroMensagem;