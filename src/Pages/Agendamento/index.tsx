<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
=======
import React, { useState } from 'react';
>>>>>>> 640ee22f845a448bd6551a21e161878272fe9d55
import styles from './agendamento.module.css';
import axios from 'axios';
import Config from '../../Config.json';
import Menu from '../../Components/Menu';
import Footer from '../../Components/Footer';
<<<<<<< HEAD
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import Modal from 'react-modal';

const Agendamento: React.FC = () => {
=======
import { Link, useNavigate } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import { useLocation } from 'react-router-dom';
import Modal from 'react-modal';

const Agendamento: React.FC = () => {

>>>>>>> 640ee22f845a448bd6551a21e161878272fe9d55
  const diaAtual = new Date();

  const [date, setDate] = useState<any>(diaAtual);
  const [horarioState, setHorario] = useState<string | undefined>();
<<<<<<< HEAD
  const [enableDetails, setEnableDetails] = useState<boolean>(true);
  const horarios: any[] = [
    '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
    '10:00', '10:30', '11:00', '11:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ];
=======
  const [enableDetails, setEnableDetails] = useState<boolean>();
  const horarios: any[] = ['07:00', '08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
>>>>>>> 640ee22f845a448bd6551a21e161878272fe9d55
  const location = useLocation();
  const navigate = useNavigate();
  const { informacoes } = location.state || {};
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [alertMessage, setAlert] = useState<string>();
<<<<<<< HEAD
  const [agendamentos, setAgendamentos] = useState<any[]>([]);

  useEffect(() => {
    buscarAgendamentos();
  }, []);

  function buscarAgendamentos() {
    const apiUrl = `${Config.baseUrl}/api/Agendamentos`;

    axios.get(apiUrl)
      .then((response) => {
        setAgendamentos(response.data);

        console.log('response.data', response.data);

      })
      .catch(() => {
        console.error('Erro ao buscar agendamentos!');
      });
  }

  function filtrarHorariosDisponiveis(horarios: string[], agendamentos: any[], selectedDate: Date) {
    const dataSelecionada = selectedDate.toISOString().slice(0, 10);

    return horarios.filter((horario) => {
      const horarioAtual = new Date(`${dataSelecionada}T${horario}:00`);

      return !agendamentos.some((agendamento) => {
        const dataAgendada = new Date(agendamento.dataHoraAgendada);

        if (dataAgendada.toISOString().slice(0, 10) === dataSelecionada) {
          const duracaoString = agendamento.tempo; // exemplo: "12:03"
          const [horas, minutos] = duracaoString.split(':').map(Number);

          const tempoFinalAgendamento = new Date(dataAgendada);
          tempoFinalAgendamento.setHours(dataAgendada.getHours() + horas);
          tempoFinalAgendamento.setMinutes(dataAgendada.getMinutes() + minutos);

          return horarioAtual >= dataAgendada && horarioAtual < tempoFinalAgendamento;
        }
        return false;
      });
    });
  }
=======
>>>>>>> 640ee22f845a448bd6551a21e161878272fe9d55

  function formatarHoraMinuto(tempoEmHoras: string) {
    const partes = tempoEmHoras.split(':');

    if (partes.length !== 2 || isNaN(parseInt(partes[0])) || isNaN(parseInt(partes[1]))) {
      return tempoEmHoras;
    }

    const horas = parseInt(partes[0], 10);
    const minutos = parseInt(partes[1], 10);
    const horaFormatada = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;

    return horaFormatada;
  }

  function cadastroAgendamento() {
    const apiUrl = `${Config.baseUrl}/api/Agendamentos`;

    if (date && horarioState && informacoes) {
      const dataHoraAgendada = new Date(date);
      dataHoraAgendada.setUTCHours(parseInt(horarioState.split(':')[0], 10));
      dataHoraAgendada.setUTCMinutes(parseInt(horarioState.split(':')[1], 10));

      const email = localStorage.getItem('email');

<<<<<<< HEAD
      console.log('email', email);

      const params = {
        dataHoraAgendada: dataHoraAgendada.toISOString(),
        nome: informacoes?.nome,
        descricao: informacoes?.descricao,
        email,
        tempo: informacoes?.tempo,
        valor: informacoes?.valor.toString(),
        tipoProcedimento: informacoes?.tipoProcedimento,
      };

      axios.post(apiUrl, params)
        .then(() => {
          setIsModalOpen(true);
          setAlert('Agendamento realizado com sucesso!');
        })
        .catch(() => {
          setIsModalOpen(true);
          setAlert('Erro ao realizar agendamento!');
        });
    } else {
      setIsModalOpen(true);
=======
      console.log('email', email)

      const params = {
        dataHoraAgendada: dataHoraAgendada.toISOString(),
        nome: informacoes.nome,
        descricao: informacoes.descricao,
        email,
        tempo: informacoes.tempo,
        valor: informacoes.valor.toString(),
        tipoProcedimento: informacoes.tipoProcedimento,
      }

      axios.post(apiUrl, params)
        .then(() => {
          setIsModalOpen(true)
          setAlert('Agendamento realizado com sucesso!');
        })
        .catch(() => {
          setIsModalOpen(true)
          setAlert('Erro ao realizar agendamento!');
        });
    } else {
      setIsModalOpen(true)
>>>>>>> 640ee22f845a448bd6551a21e161878272fe9d55
      setAlert('Selecione uma data e horário para realizar o agendamento!');
    }
  }

  function onConfirmModal() {
    if (alertMessage === 'Agendamento realizado com sucesso!') {
      navigate('/');
    } else {
<<<<<<< HEAD
      setIsModalOpen(false);
    }
  }

  const horariosDisponiveis = filtrarHorariosDisponiveis(horarios, agendamentos, date);

  console.log('horariosDisponiveis', horariosDisponiveis);

=======
      setIsModalOpen(false)
    }
  }
>>>>>>> 640ee22f845a448bd6551a21e161878272fe9d55
  return (
    <div>
      <Menu />
      <div className={styles.agendamentoContainer}>
        <Modal
          className={styles.modal}
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
        >
          <h2>{alertMessage}</h2>
          <div className={styles.contentButtonsModal}>
            <button onClick={() => onConfirmModal()}>OK</button>
          </div>
        </Modal>
        <Link to='/servicos' className={styles.link}>Voltar</Link>
        <div className={styles.contentTitle}>
<<<<<<< HEAD
          <h1 className={styles.title}>{informacoes?.nome}</h1>
=======
          <h1 className={styles.title}>{informacoes.nome}</h1>
>>>>>>> 640ee22f845a448bd6551a21e161878272fe9d55
          <p className={styles.subTitle}>Confira a disponibilidade e agende a data e o horário que forem melhores para você.</p>
        </div>
      </div>
      <div className={styles.agendamentoForm}>
        <div className={styles.contentTitleForm}>
          <p className={styles.titleForm}>Selecione uma data e horário</p>
        </div>
        <div className={styles.contentCalendar}>
<<<<<<< HEAD
          <Calendar className={styles.calendar} value={date} minDate={new Date()} onChange={(e) => setDate(e.value)} inline locale='pt-br' panelStyle={{ border: 'none' }} />
=======
          <Calendar className={styles.calendar} value={date} onChange={(e) => setDate(e.value)} inline locale='pt-br' panelStyle={{ border: 'none' }} />
>>>>>>> 640ee22f845a448bd6551a21e161878272fe9d55
          <div className={styles.containerHorarios}>
            <p className={styles.titleCalendar}>{date?.toLocaleDateString('pt-br', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
            {date &&
              <div className={styles.contentHorarios}>
                <div>
<<<<<<< HEAD
                  {horariosDisponiveis.map((horario, index) => (
                    index % 2 === 0 && (
                      <div onClick={() => setHorario(horario)} className={horario === horarioState ? styles.columnSelected : styles.column} key={index}>{horario}</div>
=======
                  {horarios.map((horario, index) => (
                    index % 2 === 0 && (
                      <div onClick={() => setHorario(horario)} className={horario === horarioState ? styles.column : styles.columnSelected} key={index}>{horario}</div>
>>>>>>> 640ee22f845a448bd6551a21e161878272fe9d55
                    )
                  ))}
                </div>
                <div>
<<<<<<< HEAD
                  {horariosDisponiveis.map((horario, index) => (
                    index % 2 !== 0 && (
                      <div onClick={() => setHorario(horario)} className={horario === horarioState ? styles.columnSelected : styles.column} key={index}>{horario}</div>
=======
                  {horarios.map((horario, index) => (
                    index % 2 !== 0 && (
                      <div onClick={() => setHorario(horario)} className={horario === horarioState ? styles.column : styles.columnSelected} key={index}>{horario}</div>
>>>>>>> 640ee22f845a448bd6551a21e161878272fe9d55
                    )
                  ))}
                </div>
              </div>
            }
          </div>
          <div className={styles.containerDetails}>
            <div className={styles.contentDetails}>
              <button onClick={() => setEnableDetails(!enableDetails)} className={styles.buttonDetails}>
                Detalhes do serviço{' '}
                {enableDetails ? (
                  <FaChevronDown className={styles.iconDetails} />
                ) : (
                  <FaChevronUp className={styles.iconDetails} />
                )}
              </button>
              {enableDetails && (
                <>
                  <p className={styles.infoDetails}>
                    {horarioState && date?.toLocaleDateString('pt-br', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} {horarioState && `às ${horarioState}`}
                  </p>
                  <br />
<<<<<<< HEAD
                  <p className={styles.infoDetails}>Duração: {formatarHoraMinuto(informacoes?.tempo)}</p>
=======
                  <p className={styles.infoDetails}>Duração: {formatarHoraMinuto(informacoes.tempo)}</p>
>>>>>>> 640ee22f845a448bd6551a21e161878272fe9d55
                  <p className={styles.infoDetails}>Valor: R$ {informacoes?.valor?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  <br />
                </>
              )}
            </div>
            <button onClick={() => cadastroAgendamento()} className={styles.buttonConfirm}>Agendar</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Agendamento;
