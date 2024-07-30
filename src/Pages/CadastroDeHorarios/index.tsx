import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import MultiDateSelector from '../../Components/MultiDataSelector';
import styles from './cadastroHorarios.module.css'
import axios from 'axios';
import Config from '../../Config.json';
import Modal from 'react-modal';
import Table from '../../Components/Table';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const CadastroHorarios: React.FC = () => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [selectedPeriod1Times, setSelectedPeriod1Times] = useState<{ date: Date; startTime: string; endTime: string }[]>([]);
  const [selectedPeriod2Times, setSelectedPeriod2Times] = useState<{ date: Date; startTime: string; endTime: string }[]>([]);
  const horariosDisponiveis = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [filterDataInicial, setFilterDataInicial] = useState<string | null>(null);
  const [filterDataFinal, setFilterDataFinal] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [deletingIndex, setDeletingIndex] = useState<number>();
  const [refresh, setRefresh] = useState<boolean>(false);

  const handleSave = () => {
    if (selectedDates.length > 0) {
      const horariosParaEnviar = selectedDates.map((date, index) => ({
        horarioInicioPrimeiroPeriodo: selectedPeriod1Times[index]?.startTime || '',
        horarioFimPrimeiroPeriodo: selectedPeriod1Times[index]?.endTime || '',
        horarioInicioSegundoPeriodo: selectedPeriod2Times[index]?.startTime || '',
        horarioFimSegundoPeriodo: selectedPeriod2Times[index]?.endTime || '',
        data: date.toISOString()
      }));

      const apiUrl = `${Config.baseUrl}/api/Horarios`;

      axios.post(apiUrl, horariosParaEnviar[0])
        .then(() => {
          setRefresh(!refresh);
          setSelectedDates([]);
          setSelectedPeriod1Times([]);
          setSelectedPeriod2Times([]);
        })
        .catch((error) => {
          console.error('Erro ao cadastrar horário:', error);
        });
    } else {
      alert('Selecione pelo menos uma data e horário');
    }
  };

  const handleSelectedDatesChange = (dates: Date[]) => {
    setSelectedDates(dates);
    setSelectedPeriod1Times([]);
    setSelectedPeriod2Times([]);
  };

  const handleSelectedPeriod1TimesChange = (index: number, startTime: string, endTime: string) => {
    const newTimes = [...selectedPeriod1Times];
    newTimes[index] = { date: selectedDates[index], startTime, endTime };
    setSelectedPeriod1Times(newTimes);
  };

  const handleSelectedPeriod2TimesChange = (index: number, startTime: string, endTime: string) => {
    const newTimes = [...selectedPeriod2Times];
    newTimes[index] = { date: selectedDates[index], startTime, endTime };
    setSelectedPeriod2Times(newTimes);
  };

  const run = () => {
    const apiUrl = `${Config.baseUrl}/api/horarios`;

    axios.get(apiUrl)
      .then((response) => {
        const modifiedData = response.data.map((item: any) => {
          const dataHoraAgendada = new Date(item.data);

          const formatoDataHora: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          };

          return {
            id: item.id,
            "Horario Início 1º Período": item.horarioInicioPrimeiroPeriodo,
            "Horario Fim 1º Período": item.horarioFimPrimeiroPeriodo,
            "Horario Início 2º Período": item.horarioInicioSegundoPeriodo,
            "Horario Fim 2º Período": item.horarioFimPrimeiroPeriodo,
            "Data": dataHoraAgendada.toLocaleString('pt-BR', formatoDataHora),
          };
        });

        setData(modifiedData);
      })
      .catch((error) => {
        console.error('Erro ao buscar horários:', error);
      });
  };

  const handleFilter = () => {
    const apiUrl = `${Config.baseUrl}/api/horarios/filtrar`;

    const params = {
      dataInicial: filterDataInicial,
      dataFinal: filterDataFinal,
    };

    axios.get(apiUrl, { params })
      .then((response) => {
        const modifiedData = response.data.map((item: any) => {
          const dataHoraAgendada = new Date(item.data);

          const formatoDataHora: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          };

          return {
            id: item.id,
            "Horario Início 1º Período": item.horarioInicioPrimeiroPeriodo,
            "Horario Fim 1º Período": item.horarioFimPrimeiroPeriodo,
            "Horario Início 2º Período": item.horarioInicioSegundoPeriodo,
            "Horario Fim 2º Período": item.horarioFimPrimeiroPeriodo,
            "Data": dataHoraAgendada.toLocaleString('pt-BR', formatoDataHora),
          };
        });

        setData(modifiedData);
        setIsFilterModalOpen(false);
        setErrorMessage('');

      })
      .catch((error) => {
        setErrorMessage('Não há informações para exibir com o filtro informado!');
        console.error('Erro ao buscar horários filtrados:', error);
      });
  };

  const handleDelete = () => {
    if (deletingIndex !== undefined && data.length > 0) {
      const horarioId = deletingIndex;

      if (horarioId) {
        const apiUrl = `${Config.baseUrl}/api/Horarios/${horarioId}`;

        axios.delete(apiUrl)
          .then((_response) => {
            setRefresh(!refresh);
            setIsModalOpen(false);
          })
          .catch((error) => {
            console.error('Erro ao deletar horário:', error);
          });
      }
    }
  };

  function limparFiltros() {
    setFilterDataInicial(null);
    setFilterDataFinal(null);
  }

  useEffect(run, [refresh]);

  return (
    <div className={styles.cadastroContainer}>
      <div className={styles.visualizarBox}>
        <Modal
          className={styles.modal}
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Confirmação de Exclusão"
        >
          <h2>Tem certeza de que deseja excluir este horário?</h2>
          <div className={styles.contentButtonsModal}>
            <button onClick={handleDelete}>Confirmar</button>
            <button style={{ marginLeft: '1rem' }} onClick={() => setIsModalOpen(false)}>Cancelar</button>
          </div>
        </Modal>
        <Modal
          className={styles.modal}
          isOpen={isFilterModalOpen}
          onRequestClose={() => setIsFilterModalOpen(false)}
          contentLabel="Filtrar Horários"
        >
          <h2>Filtrar Horários</h2>
          <div className={styles.formGroup}>
            <label>Data Inicial:</label>
            <input
              type="date"
              value={filterDataInicial || ''}
              onChange={(e) => setFilterDataInicial(e.target.value)}
              min="1970-01-01"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Data Final:</label>
            <input
              type="date"
              value={filterDataFinal || ''}
              onChange={(e) => setFilterDataFinal(e.target.value)}
              min="1970-01-01"
            />
          </div>
          {errorMessage && <span className={styles.errorTextFilter}>{errorMessage}</span>}
          <button className={styles.cadastroButton} onClick={handleFilter}>Aplicar</button>
          <button className={styles.voltarButton} onClick={limparFiltros}>Limpar</button>
          <button className={styles.voltarButton} onClick={() => setIsFilterModalOpen(false)}>Cancelar</button>
        </Modal>

        {data.length === 0 ? <span className={styles.titleVisualizar}>Sem horários para serem exibidos</span> :
          <div>
            <div className={styles.header}>
              <span className={styles.titleVisualizar}>{data.length === 1 ? 'Horário' : 'Horários'}</span>
              <button className={styles.filterButton} onClick={() => setIsFilterModalOpen(true)}>Filtro</button>
            </div>
            <div className={styles.contentTable}>
              <Table
                data={data}
                onDelete={(index: number) => {
                  setDeletingIndex(index);
                  setIsModalOpen(true);
                }}
              />
            </div>
          </div>
        }
      </div>
      <div className={styles.cadastroBox}>
        <h2 className={styles.titleCadastro}>Cadastro de Horários</h2>
        <MultiDateSelector
          selectedDates={selectedDates}
          setSelectedDates={handleSelectedDatesChange}
          selectedPeriod1Times={selectedPeriod1Times}
          setSelectedPeriod1Times={handleSelectedPeriod1TimesChange}
          selectedPeriod2Times={selectedPeriod2Times}
          setSelectedPeriod2Times={handleSelectedPeriod2TimesChange}
          horariosDisponiveis={horariosDisponiveis}
        />
        <button className={styles.cadastroButton} onClick={handleSave}>Salvar</button>
        {
          <Link to="/">
            <button className={styles.voltarButton}>
              Voltar para o menu
            </button>
          </Link>}
      </div>
    </div>
  );
};

export default CadastroHorarios;
