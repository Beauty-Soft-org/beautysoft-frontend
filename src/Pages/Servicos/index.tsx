import React, { useEffect, useState } from 'react';
import styles from './servicos.module.css';
import axios from 'axios';
import Config from '../../Config.json';
import Menu from '../../Components/Menu';
import Footer from '../../Components/Footer';
import { Link } from 'react-router-dom';

interface Servico {
  nome: string;
  tempo: number | string;
  valor: number;
}

interface ServicoGroup {
  title: string;
  servicos: Servico[];
}

const Servicos: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState('Corporal');
  const [infosCorporal, setInfosCorporal] = useState<Servico[]>([]);
  const [infosFacial, setInfosFacial] = useState<Servico[]>([]);


  const handleClick = (buttonName: any) => {
    setSelectedButton(buttonName);
  };

  async function run() {
    const UrlMensagem = `${Config.baseUrl}/api/Procedimento`;

    axios.get(UrlMensagem)
      .then((response) => {
        const infosCorporal = response.data.filter((item: any) => item.tipoProcedimento === 1);
        const infosFacial = response.data.filter((item: any) => item.tipoProcedimento === 2);
        setInfosCorporal(infosCorporal);
        setInfosFacial(infosFacial);
      })
      .catch((error) => {
        console.error('Erro ao cadastrar procedimento:', error);
      });
  };

  function groupArray(arr: Servico[]): ServicoGroup[] {
    const groupedInfos: ServicoGroup[] = [];

    // Divide a array em grupos de até 4
    for (let i = 0; i < arr.length; i += 4) {
      groupedInfos.push({
        title: `Group ${i / 4 + 1}`,
        servicos: arr.slice(i, i + 4),
      });
    }

    return groupedInfos;
  }

  const groupedInfosCorporal: ServicoGroup[] = infosCorporal ? groupArray(infosCorporal) : [];
  const groupedInfosFacial: ServicoGroup[] = infosFacial ? groupArray(infosFacial) : [];

  const renderServicos = (groupedInfos: ServicoGroup[]) => (
    groupedInfos.map((group, index) => (
      <div key={index} className={styles.contentServicos}>
        {group.servicos.map((info, infoIndex) => (
          <div key={infoIndex} className={styles.box}>
            <h1 className={styles.titleBox}>{info?.nome}</h1>
            <p className={styles.textBox}>Duração: {info?.tempo}</p>
            <p className={styles.textBox}>Valor: R$ {info?.valor?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <Link to='/agendamentos' className={styles.button} state={{ informacoes: info }}>Agendar agora</Link>
          </div>
        ))}
      </div>
    ))
  );

  useEffect(() => {
    run();
  }, []);

  return (
    <div>
      <Menu />
      <h1 className={styles.title}>Nossos Serviços</h1>
      <div className={styles.contentOption}>
        <button
          style={{ marginLeft: '1.2rem' }}
          className={`${styles.button} ${selectedButton === 'Corporal' ? styles.corporal : null}`}
          onClick={() => handleClick('Corporal')}
        >
          Corporal
        </button>
        <button
          style={{ paddingRight: '1.7rem' }}
          className={`${styles.button} ${selectedButton === 'Facial' ? styles.facial : null}`}
          onClick={() => handleClick('Facial')}
        >
          Facial
        </button>
      </div>

      {selectedButton === 'Corporal' ? renderServicos(groupedInfosCorporal) : renderServicos(groupedInfosFacial)}

      <br />
      <Footer />
    </div>
  );
};

export default Servicos;
