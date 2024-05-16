import React, { useEffect, useState } from 'react';
import styles from './cadastroMensagem.module.css';
import axios from 'axios';
import { LiaToggleOffSolid, LiaToggleOnSolid } from 'react-icons/lia'
import { Link } from 'react-router-dom';
import Table from '../../Components/Table';
import Config from '../../Config.json';
import Modal from 'react-modal';

const CadastroMensagem: React.FC = () => {
  const [nome, setNome] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [data, setData] = useState([]);
  const [row, setRow] = useState<number>();
  const [habilitado, setHabilitado] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [alterar, setAlterar] = useState<boolean>(false);
  const [tipoMensagemTemporaria, setTipoMensagemTemporaria] = useState<number>(1);
  const [nomeError, setNomeError] = useState<string | null>(null);
  const [descricaoError, setDescricaoError] = useState<string | null>(null);
  const [deletingIndex, setDeletingIndex] = useState<number>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function consultarTipoMensagem(id: number) {
    switch (id) {
      case 1:
        return "Cupom";
      case 2:
        return "Informação";
      case 3:
        return "Tratamentos";
      case 4:
        return "Sobre mim";
      case 5:
        return "Sobre Vitória Garavazzo Estética Avançada";
      default:
        break;
    }
  }

  const handleClickCadastro = () => {

    setNomeError(nome ? null : "Nome é obrigatório!");
    setDescricaoError(descricao ? null : "Descrição é obrigatória!");

    const filter = {
      nome,
      descricao,
      habilitado,
      tipoMensagemTemporaria: tipoMensagemTemporaria
    }

    const apiUrl = `${Config.baseUrl}/api/MensagemTemporaria`;

    if (nome && descricao) {
      axios.post(apiUrl, filter)
        .then(() => {
          setRefresh(!refresh)
          limpar();
        })
        .catch((error) => {
          console.error('Erro ao cadastrar mensagem:', error);
        });
    }
  };

  const handleClickAlterar = () => {

    setNomeError(nome ? null : "Nome é obrigatório!");
    setDescricaoError(descricao ? null : "Descrição é obrigatória!");

    const filter = {
      nome,
      descricao,
      tipoMensagemTemporaria,
      habilitado: habilitado,
    }

    const apiUrl = `${Config.baseUrl}/api/MensagemTemporaria/${row}`;

    if (nome && descricao) {
      axios.put(apiUrl, filter)
        .then((_response) => {
          setRefresh(!refresh);
          setAlterar(false);
          limpar();
        })
        .catch((error) => {
          console.error('Erro ao alterar mensagem:', error);
        });
    }
  };

  function limpar() {
    setNome('');
    setDescricao('');
    setHabilitado(true);
  }

  const handleDelete = () => {
    if (deletingIndex !== undefined) {
      const apiUrl = `${Config.baseUrl}/api/MensagemTemporaria/${deletingIndex}`;

      axios.delete(apiUrl)
        .then((_response) => {
          setRefresh(!refresh);
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error('Erro ao deletar mensagem:', error);
        });
    }
  }

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
        setTipoMensagemTemporaria(response.data.tipoMensagemTemporaria);
        setDescricao(response.data.descricao);
        setHabilitado(JSON.parse(response.data.habilitado));
      })
      .catch((error) => {
        console.error('Erro ao buscar mensagem:', error);
      });
  };

  useEffect(() => {
    const run = () => {
      const apiUrl = `${Config.baseUrl}/api/MensagemTemporaria`;

      axios.get(apiUrl)
        .then((response) => {
          console.log('Mensagens exibidas com sucesso!');
          const modifiedData = response.data.map((item: any) => {
            return {
              Nome: item.nome,
              id: item.id,
              Descrição: item.descricao,
              "Tipo de Mensagem": consultarTipoMensagem(item.tipoMensagemTemporaria),
              Habilitado: item.habilitado.toString(),
            };
          });

          setData(modifiedData);
        })
        .catch((error) => {
          console.error('Erro ao buscar mensagens:', error);
        });
    };

    run();
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
          <h2>Tem certeza de que deseja excluir esta mensagem?</h2>
          <div className={styles.contentButtonsModal}>
            <button onClick={handleDelete}>Confirmar</button>
            <button style={{ marginLeft: '1rem' }} onClick={() => setIsModalOpen(false)}>Cancelar</button>
          </div>
        </Modal>
        {data.length === 0 ? <span className={styles.titleVisualizar}>Sem mensagens para serem exibidas</span> :
          <div>
            <span className={styles.titleVisualizar}>{data.length === 1 ? 'Mensagem' : 'Mensagens'}</span>
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
        <h2>Cadastro de Mensagem</h2>
        <div className={styles.formGroup}>
          <label>Nome:</label>
          {nomeError && <span className={styles.errorText}>{nomeError}</span>}
          <input
            className={styles.input}
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
            <option className={styles.option} value="5">Sobre Vitória Garavazzo Estética Avançada</option>
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