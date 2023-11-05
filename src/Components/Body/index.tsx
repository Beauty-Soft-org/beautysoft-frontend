import React, { useState, useEffect } from "react";
import styles from "./body.module.css";
import Img1 from '../../img/Img1Wix.webp';
import Img2 from '../../img/img2Wix.webp';
import Img2_1 from '../../img/img2_1Wix.webp';
import sobreBrackground from '../../img/sobre-background.png';
import sobreImg from '../../img/imgSobre.png';
import Mensagem from "../Mensagens";
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import Config from '../../Config.json';
import axios from "axios";

function Body() {
  const [conteudoIndex, setConteudoIndex] = useState<number>(0);
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [dataProcedimentos, setDataProcedimentos] = useState<any>();

  async function run() {
    const apiUrl = `${Config.baseUrl}/api/Procedimento`;

    axios.get(apiUrl)
      .then((response) => {
        console.log('Procedimento cadastrado com sucesso!');
        console.log('response', response);
        setDataProcedimentos(response.data)
      })
      .catch((error) => {
        console.error('Erro ao cadastrar procedimento:', error);
      });
  };

  const conteudos = [
    { p1: "01", p2: "10% de Desconto com o cupom: vg123" },
    { p1: "02", p2: "Descontos em compras acima de R$200" },
    { p1: "03", p2: "A primeira consulta é por nossa conta" },
  ];

  const messageSobre = "Alta tecnologia Vitoria Garavazzo Estetica Avancada por um valor fixo Na Vitoria Garavazzo Estetica Avancada, nós planejamos seu protocolo de forma personalizada! Ao se tornar membro do Vitoria Garavazzo Estetica Avancada, você pode realizar outros tratamentos, além das suas sessões mensais, por valores especiais de acordo com o seu plano."

  const textContent3 = "Como profissional experiente em cuidados com a pele, trabalho para encontrar o melhor cuidado "
    + "personalizado para você. Quer saber mais sobre os tratamentos que ofereço? Entre em contato e marque uma consulta.";

  const nextImage = () => {
    if (currentImage < dataProcedimentos?.length - 1) {
      setCurrentImage(currentImage + 1);
    }
  };

  const prevImage = () => {
    if (currentImage > 0) {
      setCurrentImage(currentImage - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Atualizar o índice dos conteúdos a cada 5 segundos
      setConteudoIndex((conteudoIndex + 1) % conteudos?.length);
    }, 5000);

    return () => {
      clearInterval(interval); // Limpar o intervalo quando o componente é desmontado
    };
  }, [conteudoIndex]);

  useEffect(() => { run() as any }, []);


  return (
    <div className={styles.body}>
      <img src={Img1} className={styles.imgBody} />
      <div className={styles.contentImg1}>
        <p className={styles.contentP1Text}>
          {conteudos[conteudoIndex].p1}
        </p>
        <p className={styles.contentP2Text}>
          {"/"}
        </p>
        <p className={styles.contentP3Text}>
          {conteudos[conteudoIndex].p2}
        </p>
        <div className={styles.contentButton}>
          <p className={styles.textButton}>Comprar</p>
        </div>
      </div>
      <div className={styles.contentImg2}>
        <img src={Img2_1} className={styles.img2_1Body} />
        <img src={Img2} className={styles.img2Body} />
      </div>
      <div className={styles.content3}>
        <span className={styles.titleContent3}>Meus tratamentos</span>
        <br />
        <span className={styles.textContent3}>{textContent3}</span>
      </div>
      {dataProcedimentos?.length > 0 &&
        <div className={styles.imagensText}>
          <button className={styles.buttonPagination} onClick={prevImage} disabled={currentImage === 0}>
            <BsChevronCompactLeft fontSize={50} />
          </button>
          {dataProcedimentos?.slice(currentImage, currentImage + 5).map((imagem: any) => (
            <Mensagem
              key={imagem.id}
              imageUrl={imagem.url}
              title={imagem.nome}
              text={imagem.descricao}
            />
          ))}
          <button className={styles.buttonPagination} onClick={nextImage} disabled={currentImage >= dataProcedimentos?.length - 5}>
            <BsChevronCompactRight fontSize={50} />
          </button>
        </div>
      }
      <div className={styles.sobre} style={{ backgroundImage: `url(${sobreBrackground})`, backgroundPosition: 'right center', backgroundRepeat: 'no-repeat' }}>
        <div className={styles.imgSobre} style={{ backgroundImage: `url(${sobreImg})`, backgroundRepeat: 'no-repeat' }} />
        <h1 className={styles.titleSobre}>Sobre</h1>
        <p className={styles.textSobre}>{messageSobre}</p>
      </div>
    </div>
  );
}

export default Body;
