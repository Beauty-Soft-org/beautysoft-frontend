import React, { useState, useEffect } from "react";
import styles from "./body.module.css";
import Img1 from '../../img/Img1Wix.webp';
import Img2 from '../../img/img2Wix.webp';
import Img2_1 from '../../img/img2_1Wix.webp';

function Body() {
  const [conteudoIndex, setConteudoIndex] = useState(0);
  const conteudos = [
    { p1: "01", p2: "10% de Desconto com o cupom: vg123" },
    { p1: "02", p2: "Descontos em compras acima de R$200" },
    { p1: "03", p2: "A primeira consulta é por nossa conta" },
  ];

  const textContent3 = "Como profissional experiente em cuidados com a pele, trabalho para encontrar o melhor cuidado "
    + "personalizado para você. Quer saber mais sobre os tratamentos que ofereço? Entre em contato e marque uma consulta.";

  useEffect(() => {
    const interval = setInterval(() => {
      // Atualizar o índice dos conteúdos a cada 5 segundos
      setConteudoIndex((conteudoIndex + 1) % conteudos.length);
    }, 5000);

    return () => {
      clearInterval(interval); // Limpar o intervalo quando o componente é desmontado
    };
  }, [conteudoIndex]);

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
    </div>
  );
}

export default Body;
