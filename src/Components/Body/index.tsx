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
import Mapa from "../Mapa";
import Footer from "../Footer";
import { Link } from "react-router-dom";

function Body() {
  const [conteudoIndex, setConteudoIndex] = useState<number>(0);
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [dataProcedimentos, setDataProcedimentos] = useState<any>();
  const [dataMensagem, setDataMensagem] = useState<any>();
  const [dataInformacaoMensagem, setDataInformacaoMensagem] = useState<any>();
  const [dataTratamentosMensagem, setDataTratamentosMensagem] = useState<any>();
  const [dataSobreMensagem, setDataSobreMensagem] = useState<any>();

  async function run() {
    const apiUrl = `${Config.baseUrl}/api/Procedimento`;
    const UrlMensagem = `${Config.baseUrl}/api/MensagemTemporaria`;

    axios.get(apiUrl)
      .then((response) => {
        setDataProcedimentos(response.data)
      })
      .catch((error) => {
        console.error('Erro ao cadastrar procedimento:', error);
      });

    axios.get(UrlMensagem)
      .then((response) => {
        const filteredData = response.data.filter((item: any) => item.tipoMensagemTemporaria === 1 && item.habilitado === true);
        setDataMensagem(filteredData);

        const filteredInformacaoData = response.data.filter((item: any) => item.tipoMensagemTemporaria === 2 && item.habilitado === true);
        setDataInformacaoMensagem(filteredInformacaoData?.[0]?.descricao);

        const filteredTratamentosData = response.data.filter((item: any) => item.tipoMensagemTemporaria === 3 && item.habilitado === true);
        setDataTratamentosMensagem(filteredTratamentosData?.[0]?.descricao);

        const filteredSobreData = response.data.filter((item: any) => item.tipoMensagemTemporaria === 5 && item.habilitado === true);
        setDataSobreMensagem(filteredSobreData?.[0]?.descricao);
      })
      .catch((error) => {
        console.error('Erro ao cadastrar procedimento:', error);
      });
  };

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
      if (dataMensagem && dataMensagem.length > 0) {
        setConteudoIndex((conteudoIndex + 1) % dataMensagem.length);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [conteudoIndex, dataMensagem]);

  useEffect(() => {
    if (dataMensagem && dataMensagem.length > 0) {
      setConteudoIndex(0);
    }
  }, [dataMensagem]);

  useEffect(() => {
    run();
  }, []);

  return (
    <div className={styles.body}>
      <img src={Img1} className={styles.imgBody} />
      <div className={styles.contentImg1}>
        <p className={styles.contentP1Text}>
          {dataMensagem && dataMensagem[conteudoIndex] ? (conteudoIndex + 1).toString().padStart(2, '0') : ""}
        </p>
        <p className={styles.contentP2Text}>
          {"/"}
        </p>
        <p className={styles.contentP3Text}>
          {dataMensagem && dataMensagem[conteudoIndex] ? dataMensagem[conteudoIndex].descricao : ""}
        </p>
        <div className={styles.contentButton}>
          <Link style={{ textDecoration: 'none' }} to='/servicos'><p className={styles.textButton}>Agendar</p></Link>
        </div>
      </div>
      <div className={styles.contentImg2}>
        <img src={Img2_1} className={styles.img2_1Body} />
        <div className={styles.img2Body} style={{ backgroundImage: `url(${Img2})`, backgroundRepeat: 'no-repeat' }}>
          <h1 className={styles.titleImg2}>Vitória Garavazzo</h1>
          <span className={styles.lineImg2}></span>
          <p className={styles.textImg2}>{dataInformacaoMensagem}</p>
        </div>
      </div>
      <div className={styles.content3}>
        <span className={styles.titleContent3}>Meus tratamentos</span>
        <br />
        <span className={styles.textContent3}>{dataTratamentosMensagem}</span>
      </div>
      {dataProcedimentos?.length > 0 &&
        <div className={styles.imagensText}>
          <button className={styles.buttonPagination} onClick={prevImage} disabled={currentImage === 0}>
            <BsChevronCompactLeft fontSize={50} />
          </button>
          {dataProcedimentos?.slice(currentImage, currentImage + 5).map((imagem: any) => (
            <Link to='/servicos'>
              <Mensagem
                key={imagem.id}
                imageUrl={imagem.imagem}
                title={imagem.nome}
                text={imagem.descricao}
              />
            </Link>
          ))}
          <button className={styles.buttonPagination} onClick={nextImage} disabled={currentImage >= dataProcedimentos?.length - 5}>
            <BsChevronCompactRight fontSize={50} />
          </button>
        </div>
      }
      <div className={styles.sobre} style={{ backgroundImage: `url(${sobreBrackground})`, backgroundPosition: 'right center', backgroundRepeat: 'no-repeat' }}>
        <div className={styles.imgSobre} style={{ backgroundImage: `url(${sobreImg})`, backgroundRepeat: 'no-repeat' }} />
        <h1 className={styles.titleSobre}>Sobre</h1>
        <p className={styles.textSobre}>{dataSobreMensagem}</p>
      </div>
      <div>
        <Mapa />
      </div>
      <Footer />
    </div>
  );
}

export default Body;
