import React, { useEffect, useState } from 'react';
import styles from './visualizarAgendamentos.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Table from '../../Components/Table';
import Config from '../../Config.json';
import Modal from 'react-modal';

const VisualizarAgendamento: React.FC = () => {
  const [nome, setNome] = useState<string>('');
  const [valor, setValor] = useState<string>('');
  const [tempo, setTempo] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [tipoProcedimento, setTipoProcedimento] = useState<number>(1);
  const [data, setData] = useState([]);
  const [dataAgendamento, setDataAgendamento] = useState<string | null>(null);
  const [alterar, setAlterar] = useState<boolean>(false);
  const [row, setRow] = useState<number>();
  const [nomeError, setNomeError] = useState<string | null>(null);
  const [tempoError, setTempoError] = useState<string | null>(null);
  const [dataAgendamentoError, setDataAgendamentoError] = useState<string | null>(null);
  const [descricaoError, setDescricaoError] = useState<string | null>(null);
  const [valorError, setValorError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [deletingIndex, setDeletingIndex] = useState<number>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleClickCadastro = () => {

    setNomeError(nome ? null : "Nome é obrigatório!");
    setDescricaoError(descricao ? null : "Descrição é obrigatória!");
    setValorError(valor ? null : "Valor é obrigatório!");
    setTempoError(tempo ? null : "Tempo é obrigatório!");
    setDataAgendamentoError(dataAgendamento ? null : "Data do Procedimento é obrigatório!");

    const filter = {
      dataHoraAgendada: dataAgendamento,
      nome,
      descricao,
      tempo,
      valor,
      tipoProcedimento: 1
    }

    const apiUrl = `${Config.baseUrl}/api/Agendamentos`;

    axios.post(apiUrl, filter)
      .then((_response) => {
        setRefresh(!refresh)
        limpar();
      })
      .catch((error) => {
        console.error('Erro ao cadastrar agendamento:', error);
      });
  }

  const handleClickAlterar = () => {

    setNomeError(nome ? null : "Nome é obrigatório!");
    setDescricaoError(descricao ? null : "Descrição é obrigatória!");
    setValorError(valor ? null : "Valor é obrigatório!");
    setTempoError(tempo ? null : "Tempo é obrigatório!");
    setDataAgendamentoError(dataAgendamento ? null : "Data do Procedimento é obrigatório!");

    const filter = {
      nome,
      descricao,
      valor,
      tempo,
      tipoProcedimento: tipoProcedimento || 1,
      dataHoraAgendada: dataAgendamento,
    }

    const apiUrl = `${Config.baseUrl}/api/Agendamentos/${row}`;

    axios.put(apiUrl, filter)
      .then((_response) => {
        setRefresh(!refresh);
        setAlterar(false);
        limpar();
      })
      .catch((error) => {
        console.error('Erro ao alterar agendamento:', error);
      });
  }

  function limpar() {
    setNome('');
    setDescricao('');
    setValor('');
    setTempo('');
    setDataAgendamento('');
    setTipoProcedimento(1);
  }

  const run = () => {
    const apiUrl = `${Config.baseUrl}/api/Agendamentos`;

    axios.get(apiUrl)
      .then((response) => {
        const modifiedData = response.data.map((item: any) => {
          const dataHoraAgendada = new Date(item.dataHoraAgendada);

          const formatoDataHora: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          };

          return {
            Nome: item.nome,
            id: item.id,
            Descrição: item.descricao,
            "Tipo de Procedimento": item.tipoProcedimento === 1 ? 'Corporal' : 'Facial',
            'Data e Hora Agendada': dataHoraAgendada.toLocaleString('pt-BR', formatoDataHora),
            Valor: ` R$ ${item.valor}`,
            Tempo: item.tempo,
          };
        });

        setData(modifiedData);
      })
      .catch((error) => {
        console.error('Erro ao buscar agendamentos:', error);
      });
  };


  const handleDelete = () => {
    if (deletingIndex !== undefined) {
      const apiUrl = `${Config.baseUrl}/api/Agendamentos/${deletingIndex}`;

      axios.delete(apiUrl)
        .then((_response) => {
          setRefresh(!refresh);
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error('Erro ao deletar agendamento:', error);
        });
    }
  }

  const handleEdit = (index: number) => {
    setAlterar(true);
    setRow(index);

    const apiUrl = `${Config.baseUrl}/api/Agendamentos/${index}`;

    axios.get(apiUrl)
      .then((response) => {
        setNome(response.data.nome);
        setDescricao(response.data.descricao);
        setValor(response.data.valor);
        setTipoProcedimento(response.data.tipoAgendamento);
        setTempo(response.data.tempo);
        setDataAgendamento(response.data.dataHoraAgendada);
      })
      .catch((error) => {
        console.error('Erro ao buscar agendamento:', error);
      });
  };

  function voltarCadastro() {
    setAlterar(false);
    limpar();
  }

  const formatarDataHora = (data: Date): string => {
    const ano = data.getFullYear();
    const mes = (`0${data.getMonth() + 1}`).slice(-2);
    const dia = (`0${data.getDate()}`).slice(-2);
    const horas = (`0${data.getHours()}`).slice(-2);
    const minutos = (`0${data.getMinutes()}`).slice(-2);

    return `${ano}-${mes}-${dia}T${horas}:${minutos}`;
  };

  useEffect(run as any, [refresh]);

  return (
    <div className={styles.cadastroContainer}>
      <div className={styles.visualizarBox}>
        <Modal
          className={styles.modal}
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Confirmação de Exclusão"
        >
          <h2>Tem certeza de que deseja excluir este agendamento?</h2>
          <div className={styles.contentButtonsModal}>
            <button onClick={handleDelete}>Confirmar</button>
            <button style={{ marginLeft: '1rem' }} onClick={() => setIsModalOpen(false)}>Cancelar</button>
          </div>
        </Modal>
        {data.length === 0 ? <span className={styles.titleVisualizar}>Sem agendamentos para serem exibidos</span> :
          <div>
            <span className={styles.titleVisualizar}>{data.length === 1 ? 'Agendamento' : 'Agendamentos'}</span>
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
        {alterar === true ? <h2>Alterar Agendamento</h2> : <h2>Cadastro de Agendamento</h2>}
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
          <label>Duração:</label>
          {tempoError && <span className={styles.errorText}>{tempoError}</span>}
          <input
            type="time"
            value={tempo}
            onChange={(e) => setTempo(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Data do Agendamento:</label>
          {dataAgendamentoError && <span className={styles.errorText}>{dataAgendamentoError}</span>}
          <input
            type="datetime-local"
            value={dataAgendamento ? formatarDataHora(new Date(dataAgendamento)) : ''}
            onChange={(e) => setDataAgendamento(e.target.value)}
            min="1970-01-01T00:00"
          />
        </div>
        <div className={styles.formGroup}>
          <label>Tipo de Procedimento:</label>
          <select
            value={tipoProcedimento}
            onChange={(e) => {
              if (e.target.value === "1") {
                setTipoProcedimento(1);
              } else if (e.target.value === "2") {
                setTipoProcedimento(2);
              }
            }}
          >
            <option className={styles.option} value="1">Corporal</option>
            <option className={styles.option} value="2">Facial</option>
          </select>
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

export default VisualizarAgendamento;