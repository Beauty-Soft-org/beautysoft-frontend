import React, { useState, useEffect } from "react";
import Config from '../../Config.json';
import axios from "axios";
import Footer from "../Footer";
import Menu from "../Menu";
import styles from "./sobre.module.css";
import sobreBrackground from '../../img/sobre-background.png';

function Sobre() {
  const [dataSobreMensagem, setDataSobreMensagem] = useState<any>();

  async function run() {
    const UrlMensagem = `${Config.baseUrl}/api/MensagemTemporaria`;

    axios.get(UrlMensagem)
      .then((response) => {
        const filteredSobreData = response.data.filter((item: any) => item.tipoMensagemTemporaria === 4 && item.habilitado === true);
        setDataSobreMensagem(filteredSobreData?.[0]?.descricao);
      })
      .catch((error) => {
        console.error('Erro ao cadastrar procedimento:', error);
      });
  };

  useEffect(() => {
    run();
  }, []);

  return (
    <div>
      <Menu />
      <div className={styles.sobre} style={{ backgroundImage: `url(${sobreBrackground})`, backgroundPosition: 'right center', backgroundRepeat: 'no-repeat' }}>
        <h1 className={styles.titleSobre}>Sobre</h1>
        <p className={styles.textSobre}>{dataSobreMensagem}</p>
      </div>
      <div className={styles.frame}>
        <iframe
          className={styles.frame1}
          width="560"
          height="315"
          src="https://www.youtube.com/embed/1B7dm5hE4mQ"
          title="YouTube Video Player"
          allowFullScreen
        />
        <iframe
          style={{ marginLeft: '10rem' }}
          className={styles.frame2}
          width="560"
          height="315"
          src="https://www.youtube.com/embed/S-j8nShmNoQ"
          title="YouTube Video Player"
          allowFullScreen
        />
        <iframe
          className={styles.frame3}
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/1B7dm5hE4mQ"
          title="YouTube Video Player"
          allowFullScreen
        />
        <iframe
          className={styles.frame4}
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/S-j8nShmNoQ"
          title="YouTube Video Player"
          allowFullScreen
        />
      </div>
      <Footer />
    </div>
  );
}

export default Sobre;
