import React, { useEffect, useState } from 'react';
import styles from './visualizarAgendamentos.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Table from '../../Components/Table';
import Config from '../../Config.json';
import Modal from 'react-modal';
<<<<<<< HEAD
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
=======
>>>>>>> 640ee22f845a448bd6551a21e161878272fe9d55

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
<<<<<<< HEAD
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [filterNome, setFilterNome] = useState<string>('');
  const [filterDataAgendamento, setFilterDataAgendamento] = useState<string | null>(null);
  const [filterDataInicial, setFilterDataInicial] = useState<string | null>(null);
  const [filterDataFinal, setFilterDataFinal] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleClickCadastro = () => {
=======

  const handleClickCadastro = () => {

>>>>>>> 640ee22f845a448bd6551a21e161878272fe9d55
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
<<<<<<< HEAD
=======

>>>>>>> 640ee22f845a448bd6551a21e161878272fe9d55
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

<<<<<<< HEAD
  function limparFiltros() {
    setFilterNome('');
    setFilterDataInicial(null);
    setFilterDataFinal(null);
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
            'E-mail do cliente': item.email,
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

  const handleFilter = () => {
    const apiUrl = `${Config.baseUrl}/api/Agendamentos/filtrar`;

    const params = {
      nome: filterNome || null,
      dataInicial: filterDataInicial || null,
      dataFinal: filterDataFinal || null,
    };

    axios.get(apiUrl, { params })
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
            'E-mail do cliente': item.email,
            Descrição: item.descricao,
            "Tipo de Procedimento": item.tipoProcedimento === 1 ? 'Corporal' : 'Facial',
            'Data e Hora Agendada': dataHoraAgendada.toLocaleString('pt-BR', formatoDataHora),
            Valor: ` R$ ${item.valor}`,
            Tempo: item.tempo,
          };
        });

        setData(modifiedData);
        setIsFilterModalOpen(false);
        setErrorMessage('');

      })
      .catch((error) => {
        setErrorMessage('Não há informações para exibir com o filtro informado!');
        console.error('Erro ao buscar agendamentos filtrados:', error);
      });
  };

=======
>>>>>>> 640ee22f845a448bd6551a21e161878272fe9d55
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

<<<<<<< HEAD
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Os meses começam do zero
    const year = today.getFullYear();
    return `${year}-${month}-${day}`; // Formato YYYY-MM-DD
  };

  useEffect(run as any, [refresh]);
=======
  useEffect(() => {
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

    run();
  }, [refresh]);
>>>>>>> 640ee22f845a448bd6551a21e161878272fe9d55

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
<<<<<<< HEAD
        <Modal
          className={styles.modal}
          isOpen={isFilterModalOpen}
          onRequestClose={() => setIsFilterModalOpen(false)}
          contentLabel="Filtrar Agendamentos"
        >
          <h2>Filtrar Agendamentos</h2>
          <div className={styles.formGroup}>
            <label>Nome:</label>
            <input
              type="text"
              value={filterNome}
              onChange={(e) => setFilterNome(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Data Inicial:</label>
            <input
              type="date"
              value={filterDataInicial || getCurrentDate()}
              onChange={(e) => setFilterDataInicial(e.target.value)}
              min="2020-01-01"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Data Final:</label>
            <input
              type="date"
              value={filterDataFinal || ''}
              onChange={(e) => setFilterDataFinal(e.target.value)}
              min="2020-01-01"
            />
          </div>
          {errorMessage && <span className={styles.errorTextFilter}>{errorMessage}</span>}
          <button className={styles.cadastroButton} onClick={handleFilter}>Aplicar</button>
          <button className={styles.voltarButton} onClick={limparFiltros}>Limpar</button>
          <button className={styles.voltarButton} onClick={() => setIsFilterModalOpen(false)}>Cancelar</button>
        </Modal>
        {data.length === 0 ? <span className={styles.titleVisualizar}>Sem agendamentos para serem exibidos</span> :
          <div>
            <div className={styles.header}>
              <span className={styles.titleVisualizar}>{data.length === 1 ? 'Agendamento' : 'Agendamentos'}</span>
              <button className={styles.filterButton} onClick={() => setIsFilterModalOpen(true)}>Filtro</button>
            </div>
=======
        {data.length === 0 ? <span className={styles.titleVisualizar}>Sem agendamentos para serem exibidos</span> :
          <div>
            <span className={styles.titleVisualizar}>{data.length === 1 ? 'Agendamento' : 'Agendamentos'}</span>
>>>>>>> 640ee22f845a448bd6551a21e161878272fe9d55
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

<<<<<<< HEAD
export default VisualizarAgendamento;
=======
export default VisualizarAgendamento;
>>>>>>> 640ee22f845a448bd6551a21e161878272fe9d55
