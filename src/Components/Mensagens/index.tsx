import React from 'react';
import styles from './mensagens.module.css';

interface MensagemProps {
  imageUrl: string;
  title: string;
  text: string;
}

const Mensagem: React.FC<MensagemProps> = ({ imageUrl, title, text }) => {
  return (
    <div className={styles.imageContainer}>
      <img src={imageUrl || "https://via.placeholder.com/300"} alt="Imagem de fundo" />
      <div className={styles.textOverlay}><h2 className={styles.title}>{title}</h2><p>{text}</p></div>
    </div>
  );
};

export default Mensagem;