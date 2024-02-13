import React, { useEffect, useState } from 'react';
import styles from './agendamento.module.css';
import axios from 'axios';
import Config from '../../Config.json';
import Menu from '../../Components/Menu';
import Footer from '../../Components/Footer';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import { useLocation } from 'react-router-dom';

const Agendamento: React.FC = () => {

  const diaAtual = new Date();

  const [date, setDate] = useState<any>(diaAtual);
  const [horarioState, setHorario] = useState<string | undefined>();
  const [enableDetails, setEnableDetails] = useState<boolean>();
  const horarios: any[] = ['07:00', '08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  const location = useLocation();
  const navigate = useNavigate();
  const { informacoes } = location.state || {};

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

      const params = {
        dataHoraAgendada: dataHoraAgendada.toISOString(),
        nome: informacoes.nome,
        descricao: informacoes.descricao,
        tempo: informacoes.tempo,
        valor: informacoes.valor.toString(),
        tipoProcedimento: informacoes.tipoProcedimento,
      }

      axios.post(apiUrl, params)
        .then(() => {
          alert('Agendamento realizado com sucesso!');
          navigate('/');
        })
        .catch(() => {
          alert('Erro ao realizar agendamento!');
        });
    } else {
      alert('Selecione uma data e horário para realizar o agendamento!');
    }
  }

  return (
    <div className={styles.teste}>
      <Menu />
      <div className={styles.agendamentoContainer}>
        <Link to='/servicos' className={styles.link}>Voltar</Link>
        <div className={styles.contentTitle}>
          <h1 className={styles.title}>{informacoes.nome}</h1>
          <p className={styles.subTitle}>Confira a disponibilidade e agende a data e o horário que forem melhores para você.</p>
        </div>
      </div>
      <div className={styles.agendamentoForm}>
        <div className={styles.contentTitleForm}>
          <p className={styles.titleForm}>Selecione uma data e horário</p>
        </div>
        <div className={styles.contentCalendar}>
          <Calendar className={styles.calendar} value={date} onChange={(e) => setDate(e.value)} inline locale='pt-br' panelStyle={{ border: 'none' }} />
          <div>
            <p className={styles.titleCalendar}>{date?.toLocaleDateString('pt-br', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
            {date &&
              <div className={styles.contentHorarios}>
                <div>
                  {horarios.map((horario, index) => (
                    index % 2 === 0 && (
                      <div onClick={() => setHorario(horario)} className={horario === horarioState ? styles.column : styles.columnSelected} key={index}>{horario}</div>
                    )
                  ))}
                </div>
                <div>
                  {horarios.map((horario, index) => (
                    index % 2 !== 0 && (
                      <div onClick={() => setHorario(horario)} className={horario === horarioState ? styles.column : styles.columnSelected} key={index}>{horario}</div>
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
                  <p className={styles.infoDetails}>Duração: {formatarHoraMinuto(informacoes.tempo)}</p>
                  <p className={styles.infoDetails}>Valor: R$ {informacoes?.valor?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  <br />
                </>
              )}
            </div>
            <button onClick={() => (horarioState ? cadastroAgendamento() : alert('Selecione um horário para realizar o agendamento!'))} className={styles.buttonConfirm}>Agendar</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Agendamento;
